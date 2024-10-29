import React, { useEffect, useState } from 'react';
import api from '../../axiosConfig';

const UserLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    action: '',
    sort: { timestamp: -1 },
    limit: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUserLogs();
  }, [filters]);

  const fetchUserLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/logs/myLogs', filters);
      setLogs(response.data.data.logs);
      const total = response.data.data.total;
      setTotalPages(Math.ceil(total / filters.limit));
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError("An error occurred while fetching your logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  return (
    <div className="p-8 pt-24 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-center md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
        My Activity Log
        </h1>
        
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Filter by Action</label>
          <select
            name="action"
            value={filters.action}
            onChange={handleFilterChange}
            className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-blue-200 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
          >
      <option value="USER_LOGIN">USER_LOGIN</option>
      <option value="CREATE_USER">CREATE_USER</option>
      <option value="USER_VERIFY_OTP">USER_VERIFY_OTP</option>
      <option value="USER_REGISTER">USER_REGISTER</option>
      <option value="CREATE_RESTAURANT">CREATE_RESTAURANT</option>
      <option value="CREATE_ITEM">CREATE_ITEM</option>
      <option value="UPDATE_ITEM">UPDATE_ITEM</option>
      <option value="UPDATE_ITEM_CHANGE_AVAILABILITY">UPDATE_ITEM_CHANGE_AVAILABILITY</option>
      <option value="DELETE_ITEM">DELETE_ITEM</option>
      <option value="ADD_ITEMS_TO_RESTAURANT">ADD_ITEMS_TO_RESTAURANT</option>
      <option value="CONFIRM_DELIVERY">CONFIRM_DELIVERY</option>
      <option value="ORDER_PLACED">ORDER_PLACED</option>
      <option value="UPDATE_RESTAURANT">UPDATE_RESTAURANT</option>
      <option value="CREATE_RESTAURANT_WITH_ITEMS">CREATE_RESTAURANT_WITH_ITEMS</option>
      <option value="ACCEPT_RESTAURANT">ACCEPT_RESTAURANT</option>
      <option value="CREATE_ROLE">CREATE_ROLE</option>
      <option value="ASSIGN_PERMISSIONS">ASSIGN_PERMISSIONS</option>
      <option value="ASSIGN_ROLES">ASSIGN_ROLES</option>
      <option value="SEARCH">SEARCH</option>
      <option value="SWITCH_ROLE">SWITCH_ROLE</option>
      <option value="UPDATE_USER">UPDATE_USER</option>
      <option value="SWITCH_ROLE_TO_DELIVERY">SWITCH_ROLE_TO_DELIVERY</option>
      <option value="PAYMENT_SUCCESS">PAYMENT_SUCCESS</option>
      <option value="PAYMENT_FAILED">PAYMENT_FAILED</option>
      </select>
      </div>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-lg">Loading your activity logs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg">No activity logs found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left">Action</th>
                  <th className="px-6 py-3 text-left">Details</th>
                  <th className="px-6 py-3 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr 
                    key={log._id} 
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4">{log.action}</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {log.details &&
                          Object.entries(log.details).map(([key, value]) => (
                            <p key={key}>
                              <span className="font-medium">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                              </span>{' '}
                              {String(value)}
                            </p>
                          ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {filters.page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogsPage;