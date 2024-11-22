const API_BASE_URL = "http://localhost:8080/api/v1";

// Crear una nueva compra
export async function createPurchase(supplierId, purchaseData) {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("No se encontró el token de autenticación.");
    }
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
    if (!jwt) {
        throw new Error("No se encontró el token de autenticación.");
    }
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
            const errorData = await response.json();
            throw new Error(
                errorData.message ||
                    `Error fetching purchases: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error during fetchPurchases:", error);
        throw error;
    }
}

// Obtener los detalles de una compra específica
export async function fetchPurchase(supplierId, purchaseId) {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("No se encontró el token de autenticación.");
    }
    try {
        const response = await fetch(
            `${API_BASE_URL}/suppliers/${supplierId}/purchases/${purchaseId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch purchase");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching purchase:", error);
        throw error;
    }
}

// Obtener los detalles de un proveedor específico
export async function fetchSupplier(supplierId) {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("No se encontró el token de autenticación.");
    }
    try {
        const response = await fetch(
            `${API_BASE_URL}/suppliers/${supplierId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch supplier");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching supplier:", error);
        throw error;
    }
}

// Borrar una compra
export async function deletePurchase(supplierId, purchaseId) {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("No se encontró el token de autenticación.");
    }
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
            const errorText = await response.text();
            let errorMessage;
            try {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || "Failed to delete purchase";
            } catch (parseError) {
                errorMessage = errorText || "Failed to delete purchase";
            }
            throw new Error(errorMessage);
        }

        // No need to parse the response if it's empty
        return { success: true };
    } catch (error) {
        console.error("Error deleting purchase:", error);
        throw error;
    }
}

// Actualizar una compra
export async function updatePurchase(supplierId, purchaseId, purchaseData) {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("No se encontró el token de autenticación.");
    }
    try {
        const response = await fetch(
            `${API_BASE_URL}/suppliers/${supplierId}/purchases/${purchaseId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(purchaseData),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update purchase");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating purchase:", error);
        throw error;
    }
}

// Crear o actualizar un rating para una compra
export async function createOrUpdateRating(supplierId, purchaseId, ratingData) {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("No se encontró el token de autenticación.");
    }
    try {
        const response = await fetch(
            `${API_BASE_URL}/suppliers/${supplierId}/purchases/${purchaseId}/ratings`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(ratingData),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || "Failed to create or update rating"
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating or updating rating:", error);
        throw error;
    }
}

// Borrar un rating de una compra
export async function deleteRating(supplierId, purchaseId) {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
        throw new Error("No se encontró el token de autenticación.");
    }
    try {
        const response = await fetch(
            `${API_BASE_URL}/suppliers/${supplierId}/purchases/${purchaseId}/ratings`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete rating");
        }

        // Verificar si hay contenido en la respuesta
        const responseData = await response.text();
        return responseData ? JSON.parse(responseData) : {};
    } catch (error) {
        console.error("Error deleting rating:", error);
        throw error;
    }
}
