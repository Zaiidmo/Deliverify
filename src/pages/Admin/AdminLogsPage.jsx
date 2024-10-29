import React, { useEffect, useState } from 'react';
import api from '../../../axiosConfig';
import Pagination from '../../components/Pagination';

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    user: '',
    action: '',
    sort: { timestamp: -1 },
    limit: 10,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/logs/users', filters);
      setLogs(response.data.data);
      setTotalPages(response.data.pagination.totalPages || 1); // Capture total pages from the response
    } catch (error) {
      console.error("Erreur lors de la récupération des logs :", error);
      setError("Une erreur s'est produite lors de la récupération des logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters(prevFilters => ({ ...prevFilters, [e.target.name]: e.target.value, page: 1 })); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    setFilters(prevFilters => ({ ...prevFilters, page })); // Update the page in filters
  };

  return (
    <div className="p-8 pt-24 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
       <h1 className="text-3xl text-center md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
          Users Logs
        </h1>
        <div className="max-w-md mx-auto mb-6 flex flex-col sm:flex-row gap-4">
  
  
  <div className="flex-1">
    <label className="block text-lg font-medium mb-2">Filter by Action (Select)</label>
    <select
      name="action"
      value={filters.action}
      onChange={handleFilterChange}
      className="p-3 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-200 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      <option value="">Select an action</option>
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
</div>


      {loading ? (
        <div className="flex justify-center py-6">
          <p className="text-lg font-medium">Chargement des logs...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center py-6">
          <p className="text-lg font-medium text-red-600">{error}</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="flex justify-center py-6">
          <p className="text-lg font-medium">Aucun log disponible.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Utilisateur</th>
                <th className="px-6 py-3 text-left font-semibold">Action</th>
                <th className="px-6 py-3 text-left font-semibold">Détails</th>
                <th className="px-6 py-3 text-left font-semibold">Horodatage</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <td className="px-6 py-4">{log.user?.fullname || log.user?.username || "N/A"}</td>
                  <td className="px-6 py-4">{log.action}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {log.details &&
                        Object.entries(log.details).map(([key, value]) => (
                          <p key={key}>
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                          </p>
                        ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination 
        currentPage={filters.page} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    
    </div>
  );
};

export default AdminLogsPage;
