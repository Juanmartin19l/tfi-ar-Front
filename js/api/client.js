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

// Obtener los detalles de un cliente específico
export async function fetchClient(clientId) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch client");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching client:", error);
        throw error;
    }
}

// Crear una nueva interacción para un cliente
export async function createInteraction(clientId, interactionData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/clients/${clientId}/interactions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(interactionData),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || "Failed to create interaction"
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating interaction:", error);
        throw error;
    }
}

// Borrar una interacción de un cliente
export async function deleteInteraction(clientId, interactionId) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(
            `${API_BASE_URL}/clients/${clientId}/interactions/${interactionId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message || "Failed to delete interaction"
            );
        }

        // Verificar si hay contenido en la respuesta
        const responseData = await response.text();
        return responseData ? JSON.parse(responseData) : {};
    } catch (error) {
        console.error("Error deleting interaction:", error);
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
