import React from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";

export const Restaurants = () => {
  const tableHeader = [
    { label: "Restaurant", fields: ["name", "creation"]},
    { label: "Owner", fields:["owner", "email"] },
    { label: "Sales", fields: ["sales"] },
    { label: "Earnings", fields: ["earnings"] },
    { label: "Status", fields: ["status"] },
  ];
  const tableData = [];
  return (
    <>
      <div className="max-w-screen-xl mx-auto pt-24">
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
          onApprove= {() => console.log("Edit")}
          onDeny= {() => console.log("Delete")}
        />
      </div>
    </>
  );
};
