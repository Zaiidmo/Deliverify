import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { getAllRoles, updateUserRole } from "../../services/RoleService";

export const AssignRolesModal = ({ onClose, onSuccess }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  // Fetch roles on component mount
  useEffect(() => {
    const getRoles = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const fetchedRoles = await getAllRoles(token);

        if (fetchedRoles && fetchedRoles.roles) {
          // Map to format the data correctly
          const formattedRolesData = fetchedRoles.roles.map((role) => ({
            id: role._id,
            name: role.name,
          }));
          setRoles(formattedRolesData);
        } else {
          throw new Error("Unexpected data format from getAllRoles");
        }
      } catch (err) {
        setError("Failed to load roles");
        console.error(err);
      }
    };
    getRoles();
  }, []);

  const handleCheckboxChange = (roleId) => {
    setSelectedRoles((prevSelected) =>
      prevSelected.includes(roleId)
        ? prevSelected.filter((id) => id !== roleId)
        : [...prevSelected, roleId]
    );
  };

  const handleAssignRoles = async () => {
    if (!selectedRoles.length) {
      notify({
        message: "Please select at least one role",
        type: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");

      const token = localStorage.getItem("accessToken");
      await updateUserRole(userId, selectedRoles, token);
      localStorage.removeItem("userId");
      notify({
        message: "Roles assigned successfully!",
        type: "success",
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to assign roles");
      notify({ message: "Failed to assign roles", type: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur">
        <div className="bg-white rounded-lg p-8 w-11/12 max-w-md shadow-lg">
            <div className="text-black text-left w-full flex flex-col dark:text-white max-w-screen-sm lg:max-w-screen-md bg-[rgba(255,255,255,0.13)] absolute -translate-x-2/4 -translate-y-2/4 backdrop-blur-[10px] shadow-[0_0_40px_rgba(8,7,16,0.6)] px-[35px] py-[50px] rounded-[10px] border-2 border-solid border-[rgba(255,255,255,0.1)] left-2/4 dark:bg-[rgba(0,0,0,0.5)]">
              <button onClick={onClose} className="absolute top-2 right-2">
                <X size={20} className="text-gray-600 hover:text-red-600" />
              </button>
              <h3 className="text-2xl font-semibold text-center mb-4">Assign Roles</h3>
              {error && <p className="text-red-500">{error}</p>}
              <div className="roles-list flex flex-wrap gap-2 overflow-y-auto max-h-60 ">
                {roles.length > 0 ? (
                  roles.map((role) => (
                    <label key={role.id} className="flex items-center mb-2 mr-2 bg-violet-500 text-white p-2 dark:bg-yellow-500 dark:text-black rounded-lg">
                      <input
                        type="checkbox"
                        value={role.id}
                        onChange={() => handleCheckboxChange(role.id)}
                        checked={selectedRoles.includes(role.id)}
                        className="mr-2 w-5"
                      />
                      {role.name}
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500">No roles available</p>
                )}
              </div>
              <button
                onClick={handleAssignRoles}
                className="w-full mt-4 bg-violet-500 dark:bg-yellow-500 text-white py-2 rounded-lg hover:bg-violet-600 dark:hover:bg-yellow-600 dark:text-black"
                disabled={loading}
              >
                {loading ? "Assigning..." : "Assign Roles"}
              </button>{" "}
            </div>
        </div>
    </div>
  );
};
