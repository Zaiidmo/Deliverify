import { apiClient } from "../helper/apiClient";

export const getAllRoles = async (token) => {
  try {
    const response = await apiClient.get("/roles/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("error fetching data", err);
  }
};

export const getAllPermissions = async (token) => {
  try {
    const response = await apiClient.get("/roles/permissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("error fetching data", err);
  }
};

export const createRole = async (roleData, token) => {
  try {
    const response = await apiClient.post("/roles/create", roleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("error creating role", err);
  }
}

export const assignPermissionsToRole = async (roleId, permissionIds, token) => {
  try {
    console.log("assigning permissions", roleId, permissionIds);
    
    const response = await apiClient.post(`/roles/assign-permissions`, {roleId, permissionIds}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error("error assigning permissions", err);
    throw err;
  }
}
