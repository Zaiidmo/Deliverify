import { apiClient } from "../helper/apiClient";

export const fetchAllRestaurants = async (token) => {
    try {
        const response = await apiClient.get('/restaurants/all', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (err){ 
        console.error('error fetching data', err)
    }
}