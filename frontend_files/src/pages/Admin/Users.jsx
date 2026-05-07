import React, { useEffect, useState } from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";
import { getAllUsers, banUser } from "../../services/UserService";
import { updateUserRole } from "../../services/RoleService";
import { Toaster, toast } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { AssignRolesModal } from "../../components/Dashboard/EditUserRoleModal";

export const Users = () => {
  const tableHeader = [
    { label: "Username", fields: ["username"] },
    { label: "Contact", fields: ["email", "phoneNumber"] },
    { label: "CIN", fields: ["CIN"] },
    { label: "Roles", fields: ["role"] },
    { label: "isBanned", fields: ["isBanned"] },
  ];

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const notify = ({ message, type = "info", options }) => {
    toast[type](message, {
      duration: options?.duration || 4000,
      position: "bottom-right",
      ...options,
      id: message,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      notify({
        message: "Getting Users Data ...",
        type: "loading",
        duration: 1000,
      });
      const token = localStorage.getItem("accessToken");

      try {
        const response = await getAllUsers(token);
        if (response) {
          const formattedData = response.data.map((user) => ({
            id: user._id,
            username: user.username || "N/A",
            email: user.email || "N/A",
            phoneNumber: user.phoneNumber || "N/A",
            CIN: user.CIN || "N/A",
            role:
              user.roles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <span
                      key={role.id}
                      className="bg-yellow-500 text-black px-2 py-1 rounded"
                    >
                      {role.name}
                    </span>
                  ))}
                </div>
              ) : (
                "N/A"
              ),
            isBanned: user.isBanned ? "Yes" : "No",
          }));

          setTableData(formattedData);
          notify({
            message: "All Users retrieved successfully.",
            type: "success",
          });
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Error fetching users data. Please try again.";
        notify({ message: errorMessage, type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showRoleModal]);

  const handleBanUser = async (userId) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      const response = await banUser(userId, token);
      if (response && response.message === "User banned") {
        notify({ message: "User Banned.", type: "success" });
        setTableData((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, isBanned: "Yes" } : user
          )
        );
      } else {
        notify({ message: "Failed to ban the user.", type: "error" });
      }
    } catch (err) {
      notify({
        message: "Error banning user. Please try again.",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUserRole = (user) => {
    setSelectedUser(user);
    setShowRoleModal(true);
  };

  const handleUpdateRoles = async (userId, roleIds) => {
    const token = localStorage.getItem("accessToken");
    // const userId = selectedUser?._id;

    try {
      const response = await updateUserRole(userId, roleIds, token);
      if (response.message === "Roles assigned") {
        notify({ message: "Roles updated successfully.", type: "success" });
        setShowRoleModal(false);
        setTableData((prevData) =>
          prevData.map((user) =>
            user.id === userId ? { ...user, roles: roleIds } : user
          )
        );
      } else {
        notify({ message: "Failed to update roles.", type: "error" });
      }
    } catch (err) {
      notify({
        message: "Error updating roles. Please try again.",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
          Users Management
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <PropagateLoader color="#622BBC" size={15} />
          </div>
        ) : tableData.length > 0 ? (
          <StatisticsTable
            head={tableHeader}
            data={tableData}
            showActions={true}
            onBanUser={handleBanUser}
            onUpdateRole={handleEditUserRole}
          />
        ) : (
          <div className="py-8 text-gray-500">No users found.</div>
        )}

        {showRoleModal && selectedUser && (
          <AssignRolesModal
            user={selectedUser}
            onClose={() => setShowRoleModal(false)}
            onUpdateRoles={handleUpdateRoles}
          />
        )}
      </div>
    </>
  );
};
