import { fetchEmployeeById } from "../api/employee.js";
import { renderAdminDashboard } from "./adminDashboard.js"; // Para regresar al dashboard

export async function renderEmployeeDetails(employeeId) {
    const app = document.getElementById("app");

    // Obtener datos del empleado
    const employee = await fetchEmployeeById(employeeId);
    if (!employee) {
        alert("Failed to load employee details.");
        return;
    }

    // Renderizar detalles del empleado
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto mt-8">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Employee Details</h2>
                <p><strong>Name:</strong> ${employee.name}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>DNI:</strong> ${employee.dni}</p>
                <p><strong>Phone:</strong> ${employee.phone}</p>
                <p><strong>Birth Date:</strong> ${employee.birthDate}</p>
                <h3 class="text-xl font-semibold mt-4">Address</h3>
                <p><strong>Street:</strong> ${employee.address.street}</p>
                <p><strong>Number:</strong> ${employee.address.number}</p>
                <p><strong>Floor:</strong> ${
                    employee.address.floor || "N/A"
                }</p>
                <p><strong>Apartment:</strong> ${
                    employee.address.apartment || "N/A"
                }</p>
                <p><strong>Postal Code:</strong> ${
                    employee.address.postalCode
                }</p>
                <p><strong>City:</strong> ${employee.address.city.name}</p>
                <p><strong>Observations:</strong> ${
                    employee.address.observations || "N/A"
                }</p>
                <h3 class="text-xl font-semibold mt-4">Employment</h3>
                <p><strong>Start Date:</strong> ${employee.startDate}</p>
                <p><strong>End Date:</strong> ${employee.endDate || "N/A"}</p>
                <button id="backToDashboard" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Back to Dashboard
                </button>
            </div>
        </div>
    `;

    // Regresar al dashboard
    document
        .getElementById("backToDashboard")
        .addEventListener("click", renderAdminDashboard);
}
