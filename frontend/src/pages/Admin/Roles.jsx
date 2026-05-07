import React, { useEffect, useState } from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";
import toast, { Toaster } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import {
  getAllRoles,
  getAllPermissions,
  deleteRole,
} from "../../services/RoleService"; // Assume these are defined
import { CreateRoleForm } from "../../components/Dashboard/CreateRoleModal";
import { AssignPermissionsModal } from "../../components/Dashboard/PermissionsModal";

export const Roles = () => {
  const rolesTableHeader = [
    { label: "Role", fields: ["name"] },
    { label: "Permissions", fields: ["permissions"] },
  ];

  const [rolesTableData, setRolesTableData] = useState([]);
  const [permissionsTableData, setPermissionsTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleCreation, setRoleCreation] = useState(0);

  const handleRoleCreationSuccess = () => {
    setRoleCreation((prev) => prev + 1);
  };

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
      id: message,
    });
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      notify({
        message: "Fetching Roles and Permissions Data ...",
        type: "loading",
        duration: 1000,
        id: "fetching-data",
      });
      const token = localStorage.getItem("accessToken");

      try {
        const rolesResponse = await getAllRoles(token);
        const permissionsResponse = await getAllPermissions(token);

        if (rolesResponse) {
          const formattedRolesData = rolesResponse.roles.map((role) => ({
            id: role._id,
            name: role.name || "N/A",
            permissions: role.permissions ? (
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((perm) => (
                  <span
                    key={perm.id}
                    className="dark:bg-yellow-500 text-white bg-violet-500 dark:text-black px-1 py-0.5 rounded"
                  >
                    {perm.name}
                  </span>
                ))}
              </div>
            ) : (
              "N/A"
            ),
          }));

          setRolesTableData(formattedRolesData);
          notify({
            message: "Roles retrieved successfully.",
            type: "success",
            id: "roles-success",
          });
        }

        if (permissionsResponse) {
          const formattedPermissionsData = permissionsResponse.permissions.map(
            (perm) => ({
              id: perm._id,
              name: perm.name,
            })
          );
          setPermissionsTableData(formattedPermissionsData);
          notify({
            message: "Permissions retrieved successfully.",
            type: "success",
            id: "permissions-success",
          });
        }
      } catch (error) {
        notify({
          message: "Something went wrong",
          type: "error",
          id: "fetch-errors",
        });
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roleCreation]);

  const handleDeleteRole = async (roleId) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      const response = await deleteRole(roleId, token);
      console.log(response);

      if (response.status === 200) {
        notify({
          message: "Role deleted successfully.",
          type: "success",
          id: `delete-success-${roleId}`,
        });
        setRolesTableData((prevData) =>
          prevData.filter((role) => role.id !== roleId)
        );
      } else if (response.status === 404) {
        notify({
          message: "Role not found.",
          type: "error",
          id: `delete-not-found-${roleId}`,
        });
      } else {
        notify({
          message: "Failed to delete the role.",
          type: "error",
          id: `delete-failure-${roleId}`,
        });
      }
    } catch (err) {
      notify({
        message: "Something went wrong... please try again later.",
        type: "error",
        duration: 3000,
          id: `delete-erros-${roleId}`
      });
      console.error("Error deleting role", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
          Roles & Permissions
        </h1>
        <div>
          <div className="mx-4 md:w-full flex justify-between items-center mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="dark:bg-yellow-500 bg-violet-500 hover:bg-violet-700  dark:hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
            >
              +
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur">
              <div className="bg-white rounded-lg p-8 w-11/12 max-w-md shadow-lg">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-12 right-2"
                >
                  X
                </button>
                {roleCreation === 0 ? (
                  <CreateRoleForm
                    onRoleCreationSuccess={handleRoleCreationSuccess}
                    onClose={() => setIsModalOpen(false)}
                  />
                ) : (
                  <AssignPermissionsModal
                    onSuccess={handleRoleCreationSuccess}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <PropagateLoader color="#622BBC" size={15} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
            {/* Roles Table */}
            {rolesTableData.length > 0 && (
              <StatisticsTable
                head={rolesTableHeader}
                data={rolesTableData}
                showActions={true}
                roleDelete={handleDeleteRole}
              />
            )}
            {/* Permissions Table */}
            {permissionsTableData.length > 0 && (
              <div className="w-full bg-gray-400/40 dark:bg-gray-900 dark:text-white backdrop-blur-xl p-4 rounded-lg">
                <h3 className="p-2 pl-0 capitalize text-left font-bold border-b-2 mb-2 border-gray-600">
                  Permissions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {permissionsTableData.map((perm) => (
                    <span
                      key={perm.id}
                      className="dark:bg-yellow-500 bg-violet-500 text-white dark:text-black text-xs px-1 h-fit py-0.5 rounded overflow-y-auto"
                    >
                      {perm.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
