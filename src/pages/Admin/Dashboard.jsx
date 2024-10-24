import { StatisticsCard } from "../../components/Dashboard/StatisticsCard";
import { Banknote, User } from "lucide-react";
import React from "react";

export const Dashboard = () => {
  return (
      <>
        <div className="max-w-screen-xl mx-auto w-full h-screen flex justify-center items-center">
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
        </div>
      </>
  );
};
