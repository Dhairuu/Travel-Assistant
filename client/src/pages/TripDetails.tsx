import { useState, useEffect } from 'react';
import { CalendarIcon, UserGroupIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface Activity {
  name: string;
  timing: string;
  duration: string;
  pickupPoint: string;
  image: string;
}

interface DayPlan {
  day: number;
  date: string;
  items: Activity[];
}

interface Accommodation {
  name: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: string;
}

interface Flight {
  from: string;
  to: string;
  date: string;
  time: string;
}

interface TripData {
  destination: string;
  dateRange: string;
  duration: string;
  groupSize: string;
  totalActivities: string;
  flight: Flight;
  accommodation: Accommodation[];
  dayPlans: DayPlan[];
}

const TripDetails = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after a brief delay to simulate data processing
    const timer = setTimeout(() => {
      navigate('/');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  const tripData: TripData = {
    destination: 'TOKYO',
    dateRange: '27.01.2025 - 02.02.2025',
    duration: '8 Days',
    groupSize: '4 (2M,2F)',
    totalActivities: '14',
    flight: {
      from: 'DEL',
      to: 'NRT',
      date: '26.01.2025',
      time: '10:50 am',
    },
    accommodation: [
      {
        name: 'Shinagawa Prince Hotel',
        checkIn: '26.01.2025, 11:15 pm',
        checkOut: '28.01.2025, 11:15 am',
        nights: 2,
        status: 'Confirmed',
      },
      {
        name: 'Mercure Tokyo Hotel',
        checkIn: '28.01.2025, 6:00 pm',
        checkOut: '30.01.2025, 11:00 am',
        nights: 2,
        status: 'Pending',
      },
    ],
    dayPlans: [
      {
        day: 1,
        date: '27.01.2025',
        items: [
          {
            name: 'Senso-ji Temple & Nakamise Shopping Street',
            timing: '8:15 am Morning',
            duration: '3 hours',
            pickupPoint: 'From Hotel',
            image: 'senso-ji.jpg',
          },
          {
            name: 'Tokyo Sky Tree',
            timing: '1:00 pm Afternoon',
            duration: '3 hours',
            pickupPoint: 'From Nakamise Street',
            image: 'sky-tree.jpg',
          },
          {
            name: 'Kimono Wearing',
            timing: 'Anytime before 8:00pm',
            duration: '1-2 hours',
            pickupPoint: 'From Hotel',
            image: 'kimono.jpg',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Creating Your Trip Schedule...</h1>
        <p className="text-gray-600">Please wait while we process your trip details.</p>
      </div>
    </div>
  );
};

export default TripDetails; 