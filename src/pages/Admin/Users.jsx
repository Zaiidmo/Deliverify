import React, { useEffect, useState } from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";
import { getAllUsers, banUser } from "../../services/UserService"; // Ensure banUser is defined
import toast, { Toaster } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";

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

  const notify = ({ message, type = "info", duration }) => {
    toast[type](message, {
      duration: duration || 4000,
      position: "bottom-right",
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
        // console.log(response);
        
        if (response) {
          // Assuming the response is an array of user objects
          const formattedData = response.data.map((user) => ({
            id: user._id, 
            username: user.username || "N/A",
            email: user.email || "N/A",
            phoneNumber: user.phoneNumber || "N/A",
            CIN: user.CIN || "N/A",
            role: user.roles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                      <span key={role.id} className="bg-yellow-500 text-black px-2 py-1 rounded">
                          {role.name}
                      </span>
                  ))}
              </div>
          ) : "N/A",
            isBanned: user.isBanned ? "Yes" : "No",
          }));
          console.log("roles", formattedData);

          setTableData(formattedData);
          notify({
            message: "All Users retrieved successfully.",
            type: "success",
          });
        }
      } catch (error) {
        notify({
          message: "Something went wrong",
          type: "error",
        });
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBanUser = async (userId) => {
    setLoading(true);
    console.log("User to ban:", userId);
    
    const token = localStorage.getItem("accessToken");
  
    try {
      const response = await banUser(userId, token);
      console.log("Response from banUser:", response);
      if (response && response.message === "User banned") {
        notify({
          message: "User Banned.",
          type: "success",
        });
        setTableData((prevData) =>
          prevData.map((user) =>
            user.id === userId
              ? { ...user, isBanned: "Yes" }
              : user
          )
        );
      } else {
        notify({
          message: "Failed to ban the user.",
          type: "error",
        });
      }
    } catch (err) {
      notify({
        message: "Something went wrong... please try again later.",
        type: "error",
        duration: 3000,
      });
      console.error("Error banning user:", err); // Log error details
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Toaster />
      <div className="max-w-screen-xl mx-auto pt-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8">
          Users Management
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <PropagateLoader color="#622BBC" size={15} />
          </div>
        ) : (
          tableData.length > 0 && (
            <StatisticsTable
              head={tableHeader}
              data={tableData}
              showActions={true}
              onBanUser={handleBanUser} 
            />
          )
        )}
      </div>
    </>
  );
};
