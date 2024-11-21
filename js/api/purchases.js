const API_BASE_URL = "http://localhost:8080/api/v1";

// Crear una nueva compra
export async function createPurchase(supplierId, purchaseData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/suppliers/${supplierId}/purchases`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(purchaseData),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create purchase");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating purchase:", error);
        throw error;
    }
}

// Obtener todas las compras de un proveedor
export async function fetchPurchases(supplierId) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/suppliers/${supplierId}/purchases`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            console.error("Error fetching purchases:", response.status);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error("Error during fetchPurchases:", error);
        return [];
    }
}

// Borrar una compra
export async function deletePurchase(supplierId, purchaseId) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/suppliers/${supplierId}/purchases/${purchaseId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete purchase");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting purchase:", error);
        throw error;
    }
}
