import { StatisticsCard } from "../../components/Dashboard/StatisticsCard";
import { Banknote, User } from "lucide-react";
import React from "react";
import { StatisticsTable } from "../../components/Dashboard/StatisticsTable";

export const Dashboard = () => {
  return (
      <>
        <div className="max-w-screen-xl mx-auto w-full pt-32 ">
         <grid className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-4 gap-4 mx-10">
              <StatisticsCard
                title="Total Users"
                icon={<User />}
                statistics="100"
                avg="Avg. 10 users per day"
              />
              <StatisticsCard
                title="Total Sales"
                icon={<Banknote />}
                statistics="12300"
                avg="Avg. 10$ per day"
              />
              <StatisticsCard
                title="Total Sales"
                icon={<Banknote />}
                statistics="12300"
                avg="Avg. 10$ per day"
              />
              <StatisticsCard
                title="Total Sales"
                icon={<Banknote />}
                statistics="12300"
                avg="Avg. 10$ per day"
              />
         </grid>
         <grid className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 m-10">
         <StatisticsTable 
          head = {["User", "Contact", "Orders"]}
          data = {[
            {
              name: "Oukha",
              creation : "10-11-1998",
              email: "email@user.com",
              phoneNumber: "0677889988",
              orders: "777",
              total: "5000"
              },
            {
              name: "Oukha",
              creation : "10-11-1998",
              email: "email@user.com",
              phoneNumber: "0677889988",
              orders: "777",
              total: "5000"
              },
            {
              name: "Oukha",
              creation : "10-11-1998",
              email: "email@user.com",
              phoneNumber: "0677889988",
              orders: "777",
              total: "5000"
              },
            {
              name: "Oukha",
              creation : "10-11-1998",
              email: "email@user.com",
              phoneNumber: "0677889988",
              orders: "777",
              total: "5000"
              },
              ]}
         />
         <StatisticsTable 
          head = {["Restaurant", "Owner", "Sales"]}
          data = {[
            {
              name: "The Big Restaurant",
              creation : "10-11-1998",
              email: "Restaurant.User",
              phoneNumber: "user@email.cc",
              orders: "777",
              total: "5000"
              },]}
         />
         </grid>
        </div>
      </>
  );
};
