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
