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

// Exporta las otras funciones también si están definidas en este archivo
export async function fetchEmployeeById(employeeId) {
    /* ... */
}
export async function updateEmployee(employeeId, employeeData) {
    /* ... */
}
