const API_BASE_URL = "http://localhost:8080/api/v1";

// Crear una nueva venta
export async function createSale(clientId, saleData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/clients/${clientId}/sales`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(saleData),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create sale");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating sale:", error);
        throw error;
    }
}

// Obtener todas las ventas de un cliente
export async function fetchSales(clientId) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/clients/${clientId}/sales`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            console.error("Error fetching sales:", response.status);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Error during fetchSales:", error);
        return [];
    }
}

// Obtener los detalles de una venta específica
export async function fetchSale(clientId, saleId) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/clients/${clientId}/sales/${saleId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch sale");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching sale:", error);
        throw error;
    }
}

// Borrar una venta
export async function deleteSale(clientId, saleId) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/clients/${clientId}/sales/${saleId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete sale");
        }

        // Verificar si hay contenido en la respuesta
        const responseData = await response.text();
        return responseData ? JSON.parse(responseData) : {};
    } catch (error) {
        console.error("Error deleting sale:", error);
        throw error;
    }
}

// Actualizar una venta
export async function updateSale(clientId, saleId, saleData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/clients/${clientId}/sales/${saleId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(saleData),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update sale");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating sale:", error);
        throw error;
    }
}
