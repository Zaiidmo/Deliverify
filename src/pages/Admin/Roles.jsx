import React, { useEffect, useState } from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";
import toast, { Toaster } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { CreateUserForm } from "../../components/Dashboard/CreateUserModal";
import { getAllRoles } from "../../services/RoleService";

export const Roles = () => {
  const tableHeader = [
    { label: "Role", fields: ["name"] },
    { label: "Permissions", fields: ["permissions"] },
  ];

  const [rolesTableData, setrolesTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleCreation, setroleCreation] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUserCreationSuccess = () => {
    setroleCreation(1);
  };

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
    });
  };

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      notify({
        message: "Getting Roles Data ...",
        type: "loading",
        duration: 1000,
      });
      const token = localStorage.getItem("accessToken");

      try {
        const response = await getAllRoles(token);
        // console.log(response);

        if (response) {
          const formattedData = response.roles.map((role) => ({
            id: role._id,
            name: role.name || "N/A",
            permissions:
              role.permissions ? (
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm.id}
                      className="bg-yellow-500 text-black px-1 py-0.5 rounded"
                    >
                      {perm.name}
                    </span>
                  ))}
                </div>
              ) : (
                "N/A"
              ),
          }));

          setrolesTableData(formattedData);
          notify({
            message: "All Roles retrieved successfully.",
            type: "success",
          });
        }
      } catch (error) {
        notify({
          message: "Something went wrong",
          type: "error",
        });
        console.error("Error fetching roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      <div className="max-w-screen-xl mx-auto pt-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
          Roles & Permissions
        </h1>
        <div>
          <div>
            <div className="mx-4 md:w-full flex justify-between items-center mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
              >
                +
              </button>
            </div>
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
                {/* Your form component goes here */}
                {roleCreation === 0 ? (
                  <CreateUserForm
                    onUserCreationSuccess={handleUserCreationSuccess}
                    onClose={() => setIsModalOpen(false)}
                  />
                ) : (
                  <p>Restaurant Creation Form</p>
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
          <div className="grid grid-cols-2">
            {rolesTableData.length > 0 && (
              <StatisticsTable head={tableHeader} data={rolesTableData} />
            )}
          </div>
        )}
      </div>
    </>
  );
};
