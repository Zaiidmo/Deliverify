import React from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";

export const Restaurants = () => {
  const tableHeader = [
    { label: "Restaurant", fields: ["name", "creation"] },
    { label: "Owner", fields: ["owner", "email"] },
    { label: "Sales", fields: ["sales"] },
    { label: "Earnings", fields: ["earnings"] },
    { label: "Status", fields: ["status"] },
  ];
  const tableData = [];
  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-macondo text-gray-900 dark:text-yellow-500 pb-8"> Restaurants Management</h1>
        <StatisticsTable
          head={tableHeader}
          data={[
            {
              name: "The Big Restaurant",
              creation: "10-11-1998",
              owner: "Restaurant.User",
              email: "user@email.cc",
              sales: "777",
              status: "Approved",
              earnings: "5000 $",
            },
          ]}
          showActions={true}
          onApprove={() => console.log("Edit")}
        />
      </div>
    </>
  );
};
