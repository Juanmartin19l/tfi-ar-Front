import { fetchEmployees } from "../api/employee.js";
import { renderEditEmployeeForm } from "./editEmployeeForm.js";
import { deleteEmployee } from "../api/employee.js";
import { renderCreateEmployeeForm } from "./createEmployeeForm.js";
import { renderNavbar } from "./navbar.js";
import { renderEmployeeDetails } from "./employeeDetails.js";

export async function renderAdminDashboard() {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener empleados
    const employees = await fetchEmployees();

    // Agregar contenido del Dashboard después del navbar
    app.innerHTML += `
        <div class="w-full max-w-7xl mx-auto mt-8">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Panel de Administración</h2>
                <p class="mb-4">Bienvenido al sistema de gestión de empleados. Aquí puedes gestionar empleados, ventas, proveedores y más. Utiliza las herramientas disponibles para agregar, editar, eliminar y buscar empleados de manera eficiente.</p>
                
                <h3 class="text-xl font-semibold mb-4">Lista de Empleados</h3>
                <div class="mb-4">
                    <input type="text" id="searchInput" placeholder="Buscar empleados..." class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <button id="addEmployeeButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Agregar Empleado
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Nombre</th>
                                <th class="px-4 py-2 text-left">Correo Electrónico</th>
                                <th class="px-4 py-2 text-left">DNI</th>
                                <th class="px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="employeeTableBody">
                            ${employees
                                .map(
                                    (employee) => `
                                <tr class="hover:bg-gray-50" id="employee-row-${employee.id}">
                                    <td class="border px-4 py-2">${employee.name}</td>
                                    <td class="border px-4 py-2">${employee.email}</td>
                                    <td class="border px-4 py-2">${employee.dni}</td>
                                    <td class="border px-4 py-2">
                                        <div class="flex space-x-2">
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${employee.id}" id="edit-${employee.id}">
                                                Editar
                                            </button>
                                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" data-id="${employee.id}" id="details-${employee.id}">
                                                Detalles
                                            </button>
                                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${employee.id}" id="delete-${employee.id}">
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `
                                )
                                .join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Asignar eventos a los botones
    employees.forEach((employee) => {
        document
            .getElementById(`edit-${employee.id}`)
            .addEventListener("click", () => {
                renderEditEmployeeForm(employee);
            });

        document
            .getElementById(`details-${employee.id}`)
            .addEventListener("click", async () => {
                renderEmployeeDetails(employee.id); // Mostrar detalles del empleado
            });

        document
            .getElementById(`delete-${employee.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `¿Estás seguro de que deseas eliminar a ${employee.name}?`
                );
                if (confirmDelete) {
                    await deleteEmployee(employee.id);
                    renderAdminDashboard(); // Recargar la lista de empleados
                }
            });
    });

    // Evento para abrir el formulario de creación
    document
        .getElementById("addEmployeeButton")
        .addEventListener("click", renderCreateEmployeeForm);

    // Evento para buscar empleados
    document.getElementById("searchInput").addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        employees.forEach((employee) => {
            const employeeRow = document.getElementById(
                `employee-row-${employee.id}`
            );
            const employeeName = employee.name.toLowerCase();
            const employeeEmail = employee.email.toLowerCase();
            const employeeDni = employee.dni.toString().toLowerCase();
            if (
                employeeName.includes(searchTerm) ||
                employeeEmail.includes(searchTerm) ||
                employeeDni.includes(searchTerm)
            ) {
                employeeRow.style.display = "";
            } else {
                employeeRow.style.display = "none";
            }
        });
    });
}
