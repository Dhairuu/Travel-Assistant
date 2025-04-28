import { Request, Response } from 'express';
import Trip from '../models/Trip';
import Hotel from '../models/Hotel';
import Transport from '../models/Transport';
import Activity from '../models/Activity';
import User from '../models/User';
import { AuthRequest } from '../utils/authMiddleware';

export const testSaveFormattedTrip = async (req: Request, res: Response) => {
  const { trip, hotels, transports, activities } = req.body;
  const loggedInUserId = (req as AuthRequest).user?.user_id;

  if (!trip) return res.status(400).json({ message: 'Trip data is required.' });
  if (!loggedInUserId) return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  console.log(trip);
  console.log(hotels);
  console.log(transports);
  console.log(activities);
  // Check if user exists
  const user = await User.findByPk(loggedInUserId);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  try {
    // Always use the logged-in user's ID
    const newTrip = await Trip.create({ ...trip, user_id: loggedInUserId });

    if (hotels && Array.isArray(hotels)) {
      for (const hotel of hotels) {
        await Hotel.create({ ...hotel, trip_id: newTrip.trip_id });
      }
    }
    if (transports && Array.isArray(transports)) {
      for (const transport of transports) {
        await Transport.create({ ...transport, trip_id: newTrip.trip_id });
      }
    }
    if (activities && Array.isArray(activities)) {
      for (const activity of activities) {
        await Activity.create({ ...activity, trip_id: newTrip.trip_id });
      }
    }

    res.status(201).json({ message: 'Trip and related data created successfully.', trip_id: newTrip.trip_id });
  } catch (error) {
    console.log("Failed to create trip.", error);
    res.status(500).json({ message: 'Failed to create trip.', error });
  }
};

export const getLatestTripData = async (req: Request, res: Response) => {
  const loggedInUserId = (req as AuthRequest).user?.user_id;
  if (!loggedInUserId) return res.status(401).json({ message: 'Unauthorized. Please log in.' });

  try {
    // Find the latest trip for the user (by created_at desc)
    const latestTrip = await Trip.findOne({
      where: { user_id: loggedInUserId },
      order: [['created_at', 'DESC']],
    });
    if (!latestTrip) return res.status(404).json({ message: 'No trips found for this user.' });

    // Fetch related data
    const [hotels, transports, activities] = await Promise.all([
      Hotel.findAll({ where: { trip_id: latestTrip.trip_id } }),
      Transport.findAll({ where: { trip_id: latestTrip.trip_id } }),
      Activity.findAll({ where: { trip_id: latestTrip.trip_id } }),
    ]);

    res.json({
      trip: latestTrip,
      hotels,
      transports,
      activities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trip data.', error });
  }
};

export const toggleActivityCompleted = async (req: Request, res: Response) => {
  const loggedInUserId = (req as AuthRequest).user?.user_id;
  const { activity_id } = req.params;
  if (!loggedInUserId) return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  if (!activity_id) return res.status(400).json({ message: 'Activity ID is required.' });

  try {
    // Find the activity and its trip
    const activity = await Activity.findByPk(activity_id);
    if (!activity) return res.status(404).json({ message: 'Activity not found.' });
    const trip = await Trip.findByPk(activity.trip_id);
    if (!trip || trip.user_id !== loggedInUserId) return res.status(403).json({ message: 'Forbidden.' });

    // Toggle is_completed
    activity.is_completed = !activity.is_completed;
    await activity.save();

    // Check if all activities for this trip are completed and in the past
    const allActivities = await Activity.findAll({ where: { trip_id: trip.trip_id } });
    const now = new Date();
    const allDone = allActivities.every(a => a.is_completed && new Date(a.activity_datetime) <= now);
    if (allDone && !trip.is_completed) {
      trip.is_completed = true;
      await trip.save();
    }

    res.json({ message: 'Activity completion toggled.', activity, tripCompleted: trip.is_completed });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle activity completion.', error });
  }
};

export const updateTripAndRelated = async (req: Request, res: Response) => {
  const { trip, hotels, transports, activities } = req.body;
  const { trip_id } = req.params;
  const loggedInUserId = (req as AuthRequest).user?.user_id;

  if (!trip_id) return res.status(400).json({ message: 'Trip ID is required.' });
  if (!loggedInUserId) return res.status(401).json({ message: 'Unauthorized. Please log in.' });

  try {
    // Find the trip and check ownership
    const existingTrip = await Trip.findByPk(trip_id);
    if (!existingTrip || existingTrip.user_id !== loggedInUserId) {
      return res.status(403).json({ message: 'Forbidden or trip not found.' });
    }

    // Update trip
    await existingTrip.update(trip);

    // Update hotels
    if (hotels && Array.isArray(hotels)) {
      await Hotel.destroy({ where: { trip_id } });
      for (const hotel of hotels) {
        await Hotel.create({ ...hotel, trip_id });
      }
    }

    // Update transports
    if (transports && Array.isArray(transports)) {
      await Transport.destroy({ where: { trip_id } });
      for (const transport of transports) {
        await Transport.create({ ...transport, trip_id });
      }
    }

    // Update activities
    if (activities && Array.isArray(activities)) {
      await Activity.destroy({ where: { trip_id } });
      for (const activity of activities) {
        await Activity.create({ ...activity, trip_id });
      }
    }

    res.json({ message: 'Trip and related data updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update trip.', error });
  }
};

export const partialUpdateTrip = async (req: Request, res: Response) => {
  const { trip_id } = req.params;
  const { trip } = req.body;
  const loggedInUserId = (req as AuthRequest).user?.user_id;

  if (!trip_id) return res.status(400).json({ message: 'Trip ID is required.' });
  if (!loggedInUserId) return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  if (!trip || typeof trip !== 'object') return res.status(400).json({ message: 'No trip fields to update.' });

  try {
    const existingTrip = await Trip.findByPk(trip_id);
    if (!existingTrip || existingTrip.user_id !== loggedInUserId) {
      return res.status(403).json({ message: 'Forbidden or trip not found.' });
    }
    await existingTrip.update(trip);
    res.json({ message: 'Trip updated successfully.', trip: existingTrip });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update trip.', error });
  }
};

export const partialUpdateHotel = async (req: Request, res: Response) => {
  const { hotel_id } = req.params;
  const { hotel } = req.body;
  const loggedInUserId = (req as AuthRequest).user?.user_id;

  if (!hotel_id) return res.status(400).json({ message: 'Hotel ID is required.' });
  if (!loggedInUserId) return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  if (!hotel || typeof hotel !== 'object') return res.status(400).json({ message: 'No hotel fields to update.' });

  try {
    const existingHotel = await Hotel.findByPk(hotel_id);
    if (!existingHotel) return res.status(404).json({ message: 'Hotel not found.' });
    const trip = await Trip.findByPk(existingHotel.trip_id);
    if (!trip || trip.user_id !== loggedInUserId) return res.status(403).json({ message: 'Forbidden.' });
    await existingHotel.update(hotel);
    res.json({ message: 'Hotel updated successfully.', hotel: existingHotel });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update hotel.', error });
  }
};

export const partialUpdateTransport = async (req: Request, res: Response) => {
  const { transport_id } = req.params;
  const { transport } = req.body;
  const loggedInUserId = (req as AuthRequest).user?.user_id;

  if (!transport_id) return res.status(400).json({ message: 'Transport ID is required.' });
  if (!loggedInUserId) return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  if (!transport || typeof transport !== 'object') return res.status(400).json({ message: 'No transport fields to update.' });

  try {
    const existingTransport = await Transport.findByPk(transport_id);
    if (!existingTransport) return res.status(404).json({ message: 'Transport not found.' });
    const trip = await Trip.findByPk(existingTransport.trip_id);
    if (!trip || trip.user_id !== loggedInUserId) return res.status(403).json({ message: 'Forbidden.' });
    await existingTransport.update(transport);
    res.json({ message: 'Transport updated successfully.', transport: existingTransport });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update transport.', error });
  }
};

export const partialUpdateActivity = async (req: Request, res: Response) => {
  const { activity_id } = req.params;
  const { activity } = req.body;
  const loggedInUserId = (req as AuthRequest).user?.user_id;

  if (!activity_id) return res.status(400).json({ message: 'Activity ID is required.' });
  if (!loggedInUserId) return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  if (!activity || typeof activity !== 'object') return res.status(400).json({ message: 'No activity fields to update.' });

  try {
    const existingActivity = await Activity.findByPk(activity_id);
    if (!existingActivity) return res.status(404).json({ message: 'Activity not found.' });
    const trip = await Trip.findByPk(existingActivity.trip_id);
    if (!trip || trip.user_id !== loggedInUserId) return res.status(403).json({ message: 'Forbidden.' });
    await existingActivity.update(activity);
    res.json({ message: 'Activity updated successfully.', activity: existingActivity });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update activity.', error });
  }
}; 