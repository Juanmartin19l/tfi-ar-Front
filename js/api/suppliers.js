const API_BASE_URL = "http://localhost:8080/api/v1";

// Obtener todos los proveedores
export async function fetchSuppliers() {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return [];

    try {
        const response = await fetch(`${API_BASE_URL}/suppliers`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching suppliers:", response.status);
            return [];
        }
    } catch (error) {
        console.error("Error during fetchSuppliers:", error);
        return [];
    }
}

// Crear un nuevo proveedor
export async function createSupplier(supplierData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/suppliers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(supplierData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create supplier");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating supplier:", error);
        throw error;
    }
}

// Eliminar un proveedor
export async function deleteSupplier(id) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete supplier");
        }

        alert("Supplier deleted successfully");
    } catch (error) {
        console.error("Error deleting supplier:", error);
        alert(`Failed to delete supplier: ${error.message}`);
    }
}

// Actualizar un proveedor
export async function updateSupplier(id, supplierData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(supplierData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update supplier");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error;
    }
}
