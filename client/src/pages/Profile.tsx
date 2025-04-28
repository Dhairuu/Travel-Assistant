import { useEffect, useState } from 'react';

interface User {
  user_id: number;
  name: string;
  email: string;
}

const Profile = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <div className="p-8">Not logged in.</div>;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className={`rounded-xl p-6 shadow ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="mb-4">
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">User ID:</span> {user.user_id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 