import { useState, useEffect } from 'react';
import { ClockIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Import the transport image
const TRANSPORT_IMAGE = '/Images/Transport_Image.jpg';

// Utility for readable date
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

interface HomeProps {
  isDarkMode: boolean;
}

interface Activity {
  name: string;
  description: string;
  date: string;
  duration: string;
  pickupPoint: string;
  priority: string;
  completed: boolean;
  image: string;
}

interface Hotel {
  name: string;
  address: string;
  city: string;
  checkIn: string;
  checkOut: string;
  bookingReference: string;
  nights: number;
  status: string;
  image: string;
}

interface Transport {
  type: string;
  details: {
    serviceProvider?: string;
    vehicleType?: string;
    bookingID?: string;
    company?: string;
    number?: string;
    name?: string;
    pnr?: string;
    airline?: string;
    reference?: string;
    seat?: string;
  };
  departure: {
    city: string;
    date: string;
    time?: string;
  };
  arrival: {
    city: string;
    date: string;
  };
}

interface TripData {
  destination: string;
  dateRange: string;
  duration: string;
  groupSize: string;
  totalActivities: number;
  transport: Transport[];
  accommodation: Hotel[];
  activities: Activity[];
}

const Home = ({ isDarkMode }: HomeProps) => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userName = localStorage.getItem('userName') || 'Traveler';

  useEffect(() => {
    const fetchTripData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/trips/latest', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch trip data');
        }
        const data = await res.json();
        setTripData({
          destination: data.trip.destination,
          dateRange: `${formatDate(data.trip.start_date)} - ${formatDate(data.trip.end_date)}`,
          duration: `${Math.ceil((new Date(data.trip.end_date).getTime() - new Date(data.trip.start_date).getTime()) / (1000 * 60 * 60 * 24))} days`,
          groupSize: data.trip.group_size,
          totalActivities: data.activities.length,
          transport: data.transports.map((t: any) => ({
            type: t.transport_type,
            details: {
              serviceProvider: t.service_provider,
              vehicleType: t.vehicle_type,
              bookingID: t.booking_ref,
              company: t.service_provider,
              number: t.transport_name,
              name: t.transport_name,
              pnr: t.booking_ref,
              airline: t.service_provider,
              reference: t.booking_ref,
              seat: t.seat,
            },
            departure: {
              city: t.departure_city,
              date: t.departure_date,
              time: t.boarding_time,
            },
            arrival: {
              city: t.arrival_city,
              date: t.arrival_date,
            },
          })),
          accommodation: data.hotels.map((h: any) => ({
            name: h.hotel_name,
            address: h.address,
            city: h.city,
            checkIn: h.checkin_date,
            checkOut: h.checkout_date,
            bookingReference: h.booking_ref,
            nights: h.nights || 0,
            status: h.status || 'Confirmed',
            image: h.image || '/Images/Trip_Image.jpg',
          })),
          activities: data.activities.map((a: any) => ({
            name: a.activity_name,
            description: a.activity_description,
            date: a.activity_datetime,
            duration: a.duration || '',
            pickupPoint: a.pickup_location,
            priority: a.priority || '',
            completed: a.is_completed,
            image: a.image || '/Images/Activity_Image.jpg',
          })),
        });
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setTripData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTripData();
  }, []);

  if (loading) {
    return <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>Loading...</div>;
  }

  if (error || !tripData) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <header className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-semibold">Welcome!</h1>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Let's plan your next adventure</p>
          </div>
        </header>
        <div className="max-w-7xl mx-auto p-4">
          <div className={`rounded-xl overflow-hidden shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 text-center`}>
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-24 h-24 mx-auto">
                <MapPinIcon className={`w-full h-full ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              </div>
              <h2 className="text-2xl font-bold">Create Your Travel Schedule</h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Plan your trip with our easy-to-use travel scheduler. Add transportation details, 
                hotel bookings, and activities all in one place.
              </p>
              <a 
                href="/create" 
                className="inline-block bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Planning
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic transport section
  const firstTransport = tripData.transport[0];
  const transportType = firstTransport?.type || '';
  const transportLabel = transportType ? `${transportType.charAt(0).toUpperCase() + transportType.slice(1)} Details` : 'Transport Details';

  return (
    <div className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold">Hello {userName}!</h1>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ready for the trip?</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Trip Overview Card */}
        <div className={`rounded-xl overflow-hidden shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="relative h-48">
            <img
              src="/Images/Trip_Image.jpg"
              alt="Trip"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h2 className="text-4xl font-bold text-white">{tripData.destination}</h2>
              <p className="text-white/90">{tripData.dateRange}</p>
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2 text-white/90">
                  <ClockIcon className="h-5 w-5" />
                  <span>{tripData.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>{tripData.groupSize}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPinIcon className="h-5 w-5" />
                  <span>{tripData.totalActivities} Activities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Transport Details */}
        {firstTransport && (
          <div className={`p-4 rounded-xl flex items-center gap-6 ${isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            {/* Transport Image */}
            <img
              src={TRANSPORT_IMAGE}
              alt="Transport"
              className="h-28 w-40 object-cover rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              onError={e => (e.currentTarget.src = TRANSPORT_IMAGE)}
              style={{ flexShrink: 0 }}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{transportLabel}</h3>
                <span className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>See all</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>From</p>
                    <p className="text-xl font-semibold">{firstTransport.departure.city}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{firstTransport.details.company}</p>
                  </div>
                  <div className="w-32 h-px bg-blue-200 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full" />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>To</p>
                    <p className="text-xl font-semibold">{firstTransport.arrival.city}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{firstTransport.details.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{formatDate(firstTransport.departure.date)}</p>
                  {firstTransport.departure.time && <p className="text-xl font-semibold">{firstTransport.departure.time}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accommodation */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Accommodation</h3>
            <span className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>See all</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tripData.accommodation.map((hotel: Hotel, index: number) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              >
                <div className="relative h-40">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      {hotel.nights} Nights
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold">{hotel.name}</h4>
                  <div className="mt-2 space-y-1">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Check in: {hotel.checkIn}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Check out: {hotel.checkOut}
                    </p>
                  </div>
                  <div className="mt-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs
                        ${hotel.status === 'Confirmed'
                          ? isDarkMode
                            ? 'bg-green-900/20 text-green-400'
                            : 'bg-green-100 text-green-600'
                          : isDarkMode
                            ? 'bg-orange-900/20 text-orange-400'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                    >
                      {hotel.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Activities</h3>
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                Day Plan
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {tripData.totalActivities} Activities
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>See all</span>
            </div>
          </div>

          {/* Calendar Strip */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {Array.from({ length: 8 }).map((_, index) => {
              const date = new Date(2025, 0, 27 + index);
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index + 1)}
                  className={`flex-shrink-0 w-16 p-2 rounded-lg text-center ${
                    selectedDay === index + 1
                      ? isDarkMode
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-500 text-white'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <p className="text-xs">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="text-lg font-semibold">{date.getDate()}</p>
                  <p className="text-xs">
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Activity Cards */}
          <div className="space-y-4">
            {tripData.activities.map((activity: Activity, index: number) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              >
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 p-4">
                    <h4 className="font-semibold">{activity.name}</h4>
                    <div className="mt-2 space-y-1">
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Timing: {activity.date}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Duration: {activity.duration}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Pick up: {activity.pickupPoint}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 