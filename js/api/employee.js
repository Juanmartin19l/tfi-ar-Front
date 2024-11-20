const API_BASE_URL = "http://localhost:8080/api/v1";

// Obtener todos los empleados
export async function fetchEmployees() {
    const jwt = sessionStorage.getItem("jwt"); // Token JWT almacenado tras login
    if (!jwt) return [];

    try {
        const response = await fetch(`${API_BASE_URL}/employees`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching employees:", response.status);
            return [];
        }
    } catch (error) {
        console.error("Error during fetchEmployees:", error);
        return [];
    }
}

// Obtener un empleado por ID
export async function fetchEmployeeById(employeeId) {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) return null;

    try {
        const response = await fetch(
            `${API_BASE_URL}/employees/${employeeId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error fetching employee by ID:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error during fetchEmployeeById:", error);
        return null;
    }
}

// Actualizar un empleado
export async function updateEmployee(id, employeeData) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.message === "User already in use") {
                throw new Error(
                    "This user is already associated with another employee. Please choose a different user or leave it empty."
                );
            } else {
                throw new Error(
                    errorData.message || "Failed to update employee"
                );
            }
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
}
// Eliminar un empleado
export async function deleteEmployee(id) {
    const jwt = sessionStorage.getItem("jwt");
    try {
        const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete employee");
        }

        alert("Employee deleted successfully");
    } catch (error) {
        console.error("Error deleting employee:", error);
        alert(`Failed to delete employee: ${error.message}`);
    }
}
