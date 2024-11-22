import { fetchEmployeeById } from "../api/employee.js";
import { renderAdminDashboard } from "./adminDashboard.js"; // Para regresar al dashboard

export async function renderEmployeeDetails(employeeId) {
    const app = document.getElementById("app");

    // Obtener datos del empleado
    const employee = await fetchEmployeeById(employeeId);
    if (!employee) {
        alert("No se pudieron cargar los detalles del empleado.");
        return;
    }

    // Renderizar detalles del empleado
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto mt-8">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Detalles del Empleado</h2>
                <p><strong>Nombre:</strong> ${employee.name}</p>
                <p><strong>Correo Electrónico:</strong> ${employee.email}</p>
                <p><strong>DNI:</strong> ${employee.dni}</p>
                <p><strong>Teléfono:</strong> ${employee.phone}</p>
                <p><strong>Fecha de Nacimiento:</strong> ${
                    employee.birthDate
                }</p>
                <h3 class="text-xl font-semibold mt-4">Dirección</h3>
                <p><strong>Calle:</strong> ${employee.address.street}</p>
                <p><strong>Número:</strong> ${employee.address.number}</p>
                <p><strong>Piso:</strong> ${employee.address.floor || "N/A"}</p>
                <p><strong>Departamento:</strong> ${
                    employee.address.apartment || "N/A"
                }</p>
                <p><strong>Código Postal:</strong> ${
                    employee.address.postalCode
                }</p>
                <p><strong>Ciudad:</strong> ${employee.address.city}</p>
                <p><strong>Estado:</strong> ${employee.address.state}</p>
                <p><strong>País:</strong> ${employee.address.country}</p>
                <p><strong>Observaciones:</strong> ${
                    employee.address.observations || "N/A"
                }</p>
                <h3 class="text-xl font-semibold mt-4">Empleo</h3>
                <p><strong>Fecha de Inicio:</strong> ${employee.startDate}</p>
                <p><strong>Fecha de Fin:</strong> ${
                    employee.endDate || "N/A"
                }</p>
                <button id="backToDashboard" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Volver al Dashboard
                </button>
            </div>
        </div>
    `;

    // Regresar al dashboard
    document
        .getElementById("backToDashboard")
        .addEventListener("click", renderAdminDashboard);
}
