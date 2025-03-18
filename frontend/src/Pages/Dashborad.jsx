import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  // Sample data for the chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Students Registered',
        data: [30, 45, 50, 55, 60, 70, 80],
        fill: false,
        borderColor: '#9D00FF',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Student Registrations',
      },
    },
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-purple-400 text-white p-6">
        <h2 className="text-2xl font-semibold mb-8 ml-5 font-serif">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <button className="font-serif w-full text-left py-2 px-4 bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 transition duration-300">
              Dashboard
            </button>
          </li>
          <li>
            <button className=" font-serif w-full text-left py-2 px-4 bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 transition duration-300">
            <Link
            to="/Students">
              Manage Students</Link>
            </button>
          </li>
          <li>
            <button className=" font-serif w-full text-left py-2 px-4 bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 transition duration-300">
              View Reports
            </button>
          </li>
          <li>
            <button className="font-serif w-full text-left py-2 px-4 bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 transition duration-300">
              Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 flex flex-col">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold font-serif">Admin Dashboard</h1>
        </header>

        
        {/* Management Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-50 transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Manage Students</h3>
            <p className="text-gray-600 mb-4">View and manage all student data.</p>
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"><Link
            to="/Students" className='hover:underline'>
              Go to Management</Link>
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-50 transition duration-300">
            <h3 className="text-xl font-semibold mb-2">View Reports</h3>
            <p className="text-gray-600 mb-4">Check performance and insights.</p>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300">
              View Reports
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-50 transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-gray-600 mb-4">Configure system preferences.</p>
            <button className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition duration-300">
              Go to Settings
            </button>
          </div>
        </div>
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-10 flex-grow">
          <Line data={data} options={options} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
