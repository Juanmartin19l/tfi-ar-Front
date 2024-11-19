import { fetchEmployees } from "../api/employee.js";
import { renderEditEmployeeForm } from "./editEmployee.js";

export async function renderAdminDashboard() {
    const app = document.getElementById("app");
    const employees = await fetchEmployees(); // Llamada a la API

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
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded edit-button" data-id="${employee.id}">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            `
                                )
                                .join("")}
                        </tbody>
                    </table>
                </div>

                <button id="logoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                    Logout
                </button>
            </div>
        </div>
    `;

    // Agregar eventos a los botones de edición
    const editButtons = document.querySelectorAll(".edit-button");
    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const employeeId = button.getAttribute("data-id");
            renderEditEmployeeForm(employeeId); // Cargar el formulario de edición
        });
    });

    // Logout functionality
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem("jwt");
        window.location.reload();
    });
}
