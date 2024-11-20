const API_BASE_URL = "http://localhost:8080/api/v1";

// Obtener todos los clientes
export async function fetchClients() {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return [];

    try {
        const response = await fetch(`${API_BASE_URL}/clients`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching clients:", response.status);
            return [];
        }
    } catch (error) {
        console.error("Error during fetchClients:", error);
        return [];
    }
}

// Crear un nuevo cliente
export async function createClient(clientData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/clients`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(clientData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create client");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating client:", error);
        throw error;
    }
}

// Eliminar un cliente
export async function deleteClient(id) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete client");
        }

        alert("Client deleted successfully");
    } catch (error) {
        console.error("Error deleting client:", error);
        alert(`Failed to delete client: ${error.message}`);
    }
}
// Actualizar un cliente
export async function updateClient(id, clientData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(clientData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update client");
        }

        return await response.json(); // Retornar los datos actualizados si es necesario
    } catch (error) {
        console.error("Error updating client:", error);
        throw error;
    }
}
