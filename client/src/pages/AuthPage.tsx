import { useState } from 'react';

interface AuthPageProps {
  isDarkMode: boolean;
  onAuthSuccess: () => void;
}

const AuthPage = ({ isDarkMode, onAuthSuccess }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };
      console.log(body);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      console.log(res);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Authentication failed');
      }
      const data = await res.json();
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log("Hello");
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full p-3 rounded border focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-300' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'}`}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-3 rounded border focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-300' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'}`}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-3 rounded border focus:outline-none ${isDarkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-300' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-400'}`}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isLogin ? (
            <span>
              Don't have an account?{' '}
              <button className="text-blue-500 underline" onClick={() => setIsLogin(false)}>
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button className="text-blue-500 underline" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 