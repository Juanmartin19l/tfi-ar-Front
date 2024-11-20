import { fetchClients, createClient, deleteClient } from "../api/client.js"; // Importar funciones necesarias
import { renderCreateClientForm } from "./createClientForm.js";
import { renderEditClientForm } from "./editClientForm.js";
import { renderNavbar } from "./navbar.js"; // Importar el navbar

export async function renderClientsDashboard() {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener la lista de clientes
    const clients = await fetchClients();

    // Renderizar el contenido principal del dashboard
    app.innerHTML += `
        <div class="mt-16 w-full max-w-4xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Clients Dashboard</h2>
                <p class="mb-4">Manage clients for the business.</p>
                
                <h3 class="text-xl font-semibold mb-4">Client List</h3>
                <button id="addClientButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add Client
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Name</th>
                                <th class="px-4 py-2 text-left">Email</th>
                                <th class="px-4 py-2 text-left">Phone</th>
                                <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${clients
                                .map(
                                    (client) => `
                                <tr class="hover:bg-gray-50">
                                    <td class="border px-4 py-2">${client.name}</td>
                                    <td class="border px-4 py-2">${client.email}</td>
                                    <td class="border px-4 py-2">${client.phone}</td>
                                    <td class="border px-4 py-2">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${client.id}" id="edit-${client.id}">
                                            Edit
                                        </button>
                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" data-id="${client.id}" id="delete-${client.id}">
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

    // Asignar eventos a los botones de edición y eliminación
    clients.forEach((client) => {
        document
            .getElementById(`edit-${client.id}`)
            .addEventListener("click", () => {
                renderEditClientForm(client);
            });

        document
            .getElementById(`delete-${client.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `Are you sure you want to delete ${client.name}?`
                );
                if (confirmDelete) {
                    await deleteClient(client.id);
                    renderClientsDashboard(); // Recargar la lista de clientes
                }
            });
    });

    // Evento para abrir el formulario de creación de cliente
    document
        .getElementById("addClientButton")
        .addEventListener("click", renderCreateClientForm);
}
