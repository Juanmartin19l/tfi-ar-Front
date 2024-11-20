import { fetchEmployees } from "../api/employee.js";
import { renderEditEmployeeForm } from "./editEmployeeForm.js";
import { deleteEmployee } from "../api/employee.js"; // Importar la función de eliminación

export async function renderAdminDashboard() {
    const app = document.getElementById("app");
    const employees = await fetchEmployees();

    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Admin Dashboard</h2>
                <p class="mb-4">Manage employees, sales, suppliers, and more.</p>
                
                <h3 class="text-xl font-semibold mb-4">Employee List</h3>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Name</th>
                                <th class="px-4 py-2 text-left">Email</th>
                                <th class="px-4 py-2 text-left">DNI</th>
                                <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${employees
                                .map(
                                    (employee) => `
                                <tr class="hover:bg-gray-50">
                                    <td class="border px-4 py-2">${employee.name}</td>
                                    <td class="border px-4 py-2">${employee.email}</td>
                                    <td class="border px-4 py-2">${employee.dni}</td>
                                    <td class="border px-4 py-2">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${employee.id}" id="edit-${employee.id}">
                                            Edit
                                        </button>
                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" data-id="${employee.id}" id="delete-${employee.id}">
                                            Delete
                                        </button>
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

    // Asignar eventos al botón de edición
    employees.forEach((employee) => {
        document
            .getElementById(`edit-${employee.id}`)
            .addEventListener("click", () => {
                renderEditEmployeeForm(employee);
            });

        // Asignar evento al botón de eliminación
        document
            .getElementById(`delete-${employee.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `Are you sure you want to delete ${employee.name}?`
                );
                if (confirmDelete) {
                    await deleteEmployee(employee.id);
                    renderAdminDashboard(); // Recargar la lista de empleados
                }
            });
    });
}
