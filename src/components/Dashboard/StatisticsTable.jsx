import {
  Ban,
  CheckCheck,
  CircleX,
  Pencil,
  X,
  Trash2,
  LockKeyholeOpen,
} from "lucide-react";
import React, { useState } from "react";

export const StatisticsTable = ({
  head,
  data,
  onEdit,
  onDelete,
  onApprove,
  onDeny,
  onBanUser,
  roleDelete,
  onUpdateRole,
  showActions = false, // Default to false if not specified
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

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
            {showActions && <th className="p-2 pl-0 capitalize">Actions</th>}{" "}
            {/* Add actions column conditionally */}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="hover:bg-gray-300 rounded-full dark:hover:bg-gray-800"
            >
              {head.map((col, j) => (
                <td key={j} className="p-2 ">
                  {/* If column requires multiple fields */}
                  {Array.isArray(col.fields) ? (
                    col.fields.map((field, index) => (
                      <div key={index} className="text-xs">
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
                <td className="p-2 pl-0 flex items-center justify-center gap-2 w-full h-full">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1 hover:bg-blue-200 dark:hover:bg-blue-600 rounded"
                    >
                      <Pencil
                        size={16}
                        className="text-blue-500 dark:text-blue-300"
                      />
                    </button>
                  )}
                  {onDelete && item.isApprouved === "Yes" && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 hover:bg-red-200 dark:hover:bg-red-600 rounded"
                    >
                      <Trash2
                        size={16}
                        className="text-red-500 dark:text-red-300"
                      />
                    </button>
                  )}
                  {onUpdateRole && (
                    <>
                      <div className="relative inline-block">
                        <button
                          onClick={() => onUpdateRole(item.id)}
                          className="p-1 hover:bg-violet-200 dark:hover:bg-yellow-200 rounded"
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                        >
                          <LockKeyholeOpen
                            size={16}
                            className="text-violet-500 dark:text-yellow-500"
                          />
                        </button>
                        {/* {showTooltip && (
                          <span className="absolute z-10 py-1.5 px-2.5 text-xs text-white bg-gray-900 rounded-lg -top-8 left-1/2 transform -translate-x-1/2 opacity-100 transition-opacity duration-300">
                            Update Roles
                          </span>
                        )} */}
                      </div>
                    </>
                  )}
                  {roleDelete && (
                    <button
                      onClick={() => roleDelete(item.id)}
                      className="p-1 hover:bg-red-200 dark:hover:bg-red-600 rounded"
                    >
                      <Trash2
                        size={16}
                        className="text-red-500 dark:text-red-300"
                      />
                    </button>
                  )}
                  {onApprove && item.isApprouved === "No" && (
                    <button
                      onClick={() => onApprove(item.id)}
                      className="p-1 hover:bg-green-200 dark:hover:bg-green-600 rounded"
                    >
                      <CheckCheck
                        size={16}
                        className="text-green-500 dark:text-green-300"
                      />
                    </button>
                  )}
                  {onDeny && (
                    <button
                      onClick={() => onDeny(item)}
                      className="p-1 hover:bg-red-200 dark:hover:bg-red-600 rounded"
                    >
                      <CircleX
                        size={16}
                        className="text-red-500 dark:text-red-300"
                      />
                    </button>
                  )}
                  {onBanUser && item.isBanned === "No" && (
                    <button
                      onClick={() => onBanUser(item.id)}
                      className="p-1 hover:bg-red-200 dark:hover:bg-red-600 rounded"
                    >
                      <Ban
                        size={16}
                        className="text-red-500 dark:text-red-300"
                      />
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
