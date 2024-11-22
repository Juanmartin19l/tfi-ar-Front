import { fetchClients, deleteClient } from "../api/client.js"; // Importar funciones necesarias
import { renderCreateClientForm } from "./createClientForm.js";
import { renderEditClientForm } from "./editClientForm.js";
import { renderClientDetails } from "./clientDetails.js"; // Importar la función para renderizar los detalles del cliente
import { renderSalesDashboard } from "./salesDashboard.js"; // Importar la función para renderizar el dashboard de ventas
import { renderNavbar } from "./navbar.js"; // Importar el navbar

export async function renderClientsDashboard() {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener la lista de clientes
    const clients = await fetchClients();

    // Renderizar el contenido principal del dashboard
    app.innerHTML += `
        <div class="mt-16 w-full max-w-6xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Panel de Clientes</h2>
                <p class="mb-4">Gestiona los clientes del negocio.</p>
                
                <h3 class="text-xl font-semibold mb-4">Lista de Clientes</h3>
                <button id="addClientButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Agregar Cliente
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Nombre</th>
                                <th class="px-4 py-2 text-left">Correo Electrónico</th>
                                <th class="px-4 py-2 text-left">Teléfono</th>
                                <th class="px-4 py-2 text-left">Acciones</th>
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
                                        <div class="flex space-x-2">
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${client.id}" id="edit-${client.id}">
                                                Editar
                                            </button>
                                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" data-id="${client.id}" id="show-${client.id}">
                                                Mostrar
                                            </button>
                                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${client.id}" id="delete-${client.id}">
                                                Eliminar
                                            </button>
                                            <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded" data-id="${client.id}" id="sales-${client.id}">
                                                Ventas
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

    // Asignar eventos a los botones de edición, mostrar, ventas y eliminación
    clients.forEach((client) => {
        document
            .getElementById(`edit-${client.id}`)
            .addEventListener("click", () => {
                renderEditClientForm(client);
            });

        document
            .getElementById(`show-${client.id}`)
            .addEventListener("click", () => {
                renderClientDetails(client.id);
            });

        document
            .getElementById(`delete-${client.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `¿Estás seguro de que deseas eliminar a ${client.name}?`
                );
                if (confirmDelete) {
                    await deleteClient(client.id);
                    renderClientsDashboard(); // Recargar la lista de clientes
                }
            });

        document
            .getElementById(`sales-${client.id}`)
            .addEventListener("click", () => {
                renderSalesDashboard(client.id);
            });
    });

    // Evento para abrir el formulario de creación de cliente
    document
        .getElementById("addClientButton")
        .addEventListener("click", renderCreateClientForm);
}
