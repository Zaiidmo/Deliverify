import { CheckCheck, CircleX, Pencil, X } from "lucide-react";
import React from "react";

export const StatisticsTable = ({
  head,
  data,
  onEdit,
  onDelete,
  onApprove,
  onDeny,
  showActions = false, // Default to false if not specified
}) => {
  return (
    <div className="overflow-x-auto w-full bg-gray-400/40 dark:bg-gray-900 dark:text-white backdrop-blur-xl p-4 rounded-lg">
      <table className="table text-left w-full divide-y-2 divide-gray-600">
        {/* Table Head */}
        <thead>
          <tr>
            {head.map((col, i) => (
              <th key={i} className="p-2 pl-0 capitalize">
                {col.label}
              </th>
            ))}
            {showActions && <th className="p-2 pl-0 capitalize">Actions</th>} {/* Add actions column conditionally */}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="hover:bg-gray-300 rounded-full dark:hover:bg-gray-800">
              {head.map((col, j) => (
                <td key={j} className="p-2 ">
                  {/* If column requires multiple fields */}
                  {Array.isArray(col.fields) ? (
                    col.fields.map((field, index) => (
                      <div key={index} className="text-xs opacity-75">
                        {item[field] || "N/A"}
                      </div>
                    ))
                  ) : (
                    // Single field or custom content
                    <div className="font-bold">
                      {col.fields === "avatar" ? (
                        // Handle avatar field specifically
                        <div className="flex items-center gap-3">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.avatar}
                              alt="Avatar"
                              className="rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-bold">
                              {item.name || "N/A"}
                            </div>
                            <div className="text-xs opacity-50">
                              {item.creation || "N/A"}
                            </div>
                          </div>
                        </div>
                      ) : (
                        item[col.fields] || "N/A"
                      )}
                    </div>
                  )}
                </td>
              ))}
              {/* Render Actions Column Conditionally */}
              {showActions && (
                <td className="p-2 pl-0">
                  {onEdit && (
                    <button onClick={() => onEdit(item)} className="p-1 hover:bg-blue-200 dark:hover:bg-blue-600 rounded">
                      <Pencil size={16} className="text-blue-500 dark:text-blue-300" />
                    </button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(item)} className="p-1 hover:bg-red-200 dark:hover:bg-red-600 rounded">
                      <X size={16} className="text-red-500 dark:text-red-300" />
                    </button>
                  )}
                  {onApprove && (
                    <button onClick={() => onApprove(item)} className="p-1 hover:bg-green-200 dark:hover:bg-green-600 rounded">
                      <CheckCheck size={16} className="text-green-500 dark:text-green-300" />
                    </button>
                  )}
                  {onDeny && (
                    <button onClick={() => onDeny(item)} className="p-1 hover:bg-red-200 dark:hover:bg-red-600 rounded">
                      <CircleX size={16} className="text-red-500 dark:text-red-300" />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
