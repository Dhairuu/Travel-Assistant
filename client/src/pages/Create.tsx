import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import TransportForm from '../components/TransportForm';
import HotelForm from '../components/HotelForm';
import ActivityForm from '../components/ActivityForm';

interface CreateProps {
  isDarkMode: boolean;
}

// Match the interface expected by TransportForm
interface TransportFormData {
  transportType: string;
  serviceProvider?: string;
  vehicleType?: string;
  bookingID?: string;
  busCompany?: string;
  busNumber?: string;
  busName?: string;
  PNR?: string;
  trainCompany?: string;
  trainNumber?: string;
  trainName?: string;
  airline?: string;
  flightNumber?: string;
  bookingReference?: string;
  seatNumber?: string;
  boardingTime?: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  arrivalDate: string;
}

// Match the interface expected by HotelForm
interface HotelFormData {
  hotelName: string;
  address: string;
  city: string;
  checkInDate: string;
  checkOutDate: string;
  bookingReference: string;
}

interface ActivityFormData {
  activityName: string;
  description: string;
  date: string;
  duration: string;
  pickup: string;
  priority: string;
  completed: boolean;
}

// Utility to convert empty strings/undefined to null
function emptyToNull(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(emptyToNull);
  } else if (obj && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (value === '' || value === undefined) {
        newObj[key] = null;
      } else if (typeof value === 'object') {
        newObj[key] = emptyToNull(value);
      } else {
        newObj[key] = value;
      }
    }
    return newObj;
  }
  return obj;
}

const Create = ({ isDarkMode }: CreateProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [travelType, setTravelType] = useState('solo');
  const [transportData, setTransportData] = useState<TransportFormData[]>([]);
  const [hotelData, setHotelData] = useState<HotelFormData[]>([]);
  const [activityData, setActivityData] = useState<ActivityFormData[]>([]);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleTransportSubmit = (data: TransportFormData[]) => {
    setTransportData(data);
    setStep(3);
  };

  const handleHotelSubmit = (data: HotelFormData[]) => {
    setHotelData(data);
    setStep(4);
  };

  const handleActivitySubmit = async (data: ActivityFormData[]) => {
    setActivityData(data);

    // Format the trip data for backend
    // Assume the first transport and hotel dates for trip start/end
    const firstTransport = transportData[0];
    const firstHotel = hotelData[0];
    const lastHotel = hotelData[hotelData.length - 1];
    const startDate = firstHotel?.checkInDate || firstTransport?.departureDate || '';
    const endDate = lastHotel?.checkOutDate || firstTransport?.arrivalDate || '';

    const trip = {
      destination: destination.toUpperCase(),
      start_date: startDate ? new Date(startDate).toISOString().split('T')[0] : '',
      end_date: endDate ? new Date(endDate).toISOString().split('T')[0] : '',
      group_size: travelType === 'family' ? 4 : 2,
      is_completed: false
    };

    const hotels = hotelData.map((hotel) => ({
      hotel_name: hotel.hotelName,
      city: hotel.city,
      address: hotel.address,
      checkin_date: hotel.checkInDate ? new Date(hotel.checkInDate).toISOString().split('T')[0] : '',
      checkout_date: hotel.checkOutDate ? new Date(hotel.checkOutDate).toISOString().split('T')[0] : '',
      booking_ref: hotel.bookingReference,
      created_at: new Date().toISOString()
    }));

    const transports = transportData.map((transport) => ({
      transport_type: transport.transportType === 'flight' ? 'plane' : transport.transportType,
      service_provider: transport.serviceProvider || transport.busCompany || transport.trainCompany || transport.airline || '',
      vehicle_type: transport.vehicleType || '',
      booking_ref: transport.bookingID || transport.PNR || transport.bookingReference || '',
      transport_name: transport.busName || transport.trainName || transport.flightNumber || '',
      seat: transport.seatNumber || '',
      boarding_time: transport.boardingTime || '',
      departure_city: transport.departureCity,
      arrival_city: transport.arrivalCity,
      departure_date: transport.departureDate ? new Date(transport.departureDate).toISOString() : '',
      arrival_date: transport.arrivalDate ? new Date(transport.arrivalDate).toISOString() : '',
      created_at: new Date().toISOString()
    }));

    const activities = data.map((activity) => ({
      activity_name: activity.activityName,
      activity_description: activity.description,
      activity_datetime: activity.date ? new Date(activity.date).toISOString() : '',
      pickup_location: activity.pickup,
      is_completed: activity.completed,
      created_at: new Date().toISOString()
    }));

    const formattedTripData = {
      trip,
      hotels,
      transports,
      activities
    };

    // Convert empty strings/undefined to null
    const cleanedTripData = emptyToNull(formattedTripData);

    try {
      console.log(cleanedTripData);
      const res = await fetch('http://localhost:5000/api/trips/test-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(cleanedTripData)
      });
      if (!res.ok) {
        throw new Error('Failed to save trip');
      }
      navigate('/');
    } catch (err) {
      alert('Failed to save trip. Please try again.');
    }
  };

  if (step === 4) {
    return (
      <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Activity Log</h1>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Plan your activities for the trip</p>
          <ActivityForm onSubmit={handleActivitySubmit} isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Hotel Accommodation</h1>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Please provide your hotel accommodation details</p>
          <HotelForm onSubmit={handleHotelSubmit} isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Transportation Details</h1>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Please provide your transportation information</p>
          <TransportForm onSubmit={handleTransportSubmit} isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-md mx-auto">
        <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Plan Your Journey, Your Way!</h1>
        <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Let's create your personalised travel experience</p>

        <form onSubmit={handleInitialSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Where would you like to go?</span>
              <div className="mt-1 relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={`pl-10 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                    ${isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  placeholder="Enter Destination"
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>How long will you stay?</span>
              <div className="mt-1 relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={`pl-10 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent
                    ${isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="3">3 Days</option>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days</option>
                  <option value="10">10 Days</option>
                </select>
              </div>
            </label>

            <div>
              <span className={`block mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Who are you traveling with?</span>
              <div className="grid grid-cols-2 gap-4">
                {['solo', 'couple', 'family', 'friends'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTravelType(type)}
                    className={`p-4 rounded-lg border flex items-center justify-center gap-2 transition-colors
                      ${travelType === type 
                        ? 'border-primary bg-primary/10' 
                        : isDarkMode 
                          ? 'border-gray-700 hover:border-gray-600' 
                          : 'border-gray-300 hover:border-gray-400'}
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    <UserGroupIcon className="h-5 w-5" />
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!destination || !duration || !travelType}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create; 