import React from "react";

export const StatisticsTable = ({head, data}) => {
  return (
    <div className="overflow-x-auto w-full bg-gray-400/40 dark:bg-gray-900 dark:text-white backdrop-blur-xl p-4 rounded-lg ">
      <table className="table text-left w-full divide-y-2 divide-gray-600 ">
        {/* head */}
        <thead>
          <tr>
            <th>{head[0]}</th>
            <th>{head[1]}</th>
            <th>{head[2]}</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((item, i) => (
            <tr key={i}>
            <td className="p-2 pl-0">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                      alt="Avatar Tailwind CSS Component"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-xs opacity-50">{item.created}</div>
                </div>
              </div>
            </td>
            <td>
              <div>
                <div className="font-bold">{item.email}</div>
                <div className="text-xs opacity-50">{item.phoneNumber}</div>
              </div>
            </td>
            <td>
              <div>
                <div className="font-bold">{item.orders} </div>
                <div className="text-xs opacity-50">{item.total}$</div>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
