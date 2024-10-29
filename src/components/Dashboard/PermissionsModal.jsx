import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import {
  getAllPermissions,
  assignPermissionsToRole,
} from "../../services/RoleService";

export const AssignPermissionsModal = ({ onClose }) => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  // Fetch permissions on component mount
  useEffect(() => {
    const getPermissions = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const fetchedPermissions = await getAllPermissions(token);

        if (fetchedPermissions && fetchedPermissions.permissions) {
          // Map to format the data correctly
          const formattedPermissionsData = fetchedPermissions.permissions.map(
            (perm) => ({
              id: perm._id,
              name: perm.name,
            })
          );
          setPermissions(formattedPermissionsData);
        } else {
          throw new Error("Unexpected data format from getAllPermissions");
        }
      } catch (err) {
        setError("Failed to load permissions");
        console.error(err);
      }
    };
    getPermissions();
  }, []);

  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(permissionId)
        ? prevSelected.filter((id) => id !== permissionId)
        : [...prevSelected, permissionId]
    );
  };

  const handleAssignPermissions = async () => {
    if (!selectedPermissions.length) {
      notify({
        message: "Please select at least one permission",
        type: "error",
      });
      return;
    }
    setLoading(true);
    try {
      const roleId = localStorage.getItem("roleId");
    //   console.log(roleId);

      const token = localStorage.getItem("accessToken");
      await assignPermissionsToRole(roleId, selectedPermissions, token);
      localStorage.removeItem("roleId");
      notify({
        message: "Permissions assigned successfully!",
        type: "success",
      });
      onClose();
    } catch (err) {
      setError("Failed to assign permissions");
      notify({ message: "Failed to assign permissions", type: "error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-background fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        {/* {selectedPermissions.length > 0 && (
          <button onClick={onClose} className="absolute top-2 right-2">
            <X size={20} className="text-gray-600 hover:text-red-600" />
          </button>
        )} */}
        <h3 className="text-2xl font-semibold mb-4">Assign Permissions</h3>
        {error && <p className="text-red-500">{error}</p>}
        <div className="permissions-list overflow-y-auto max-h-60">
          {permissions.length > 0 ? (
            permissions.map((permission) => (
              <label key={permission.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={permission.id}
                  onChange={() => handleCheckboxChange(permission.id)}
                  checked={selectedPermissions.includes(permission.id)}
                  className="mr-2"
                />
                {permission.name}
              </label>
            ))
          ) : (
            <p className="text-gray-500">No permissions available</p>
          )}
        </div>
        <button
          onClick={handleAssignPermissions}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Assigning..." : "Assign Permissions"}
        </button>
      </div>
    </div>
  );
};
