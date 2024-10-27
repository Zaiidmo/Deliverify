import React from "react";

export const StatisticsCard = ({title, icon, statistics, avg}) => {
    return(
  <div className="bg-gray-400/50 backdrop-blur-sm text-black dark:bg-gray-900 dark:text-white p-4 px-8 rounded-lg flex-col items-center justify-center w-full">
    <div className="flex flex-row items-center justify-between mb-4 w-full">
      <h3 className="text-sm font-medium">
        {title}
      </h3>
      <button className="h-4 w-4 text-muted-foreground"> {icon} </button>
    </div>
    <div>
      <div className="text-2xl font-bold">
        {statistics}
      </div>
      <p className="text-xs text-muted-foreground">{avg}</p>
    </div>
  </div>);
}
