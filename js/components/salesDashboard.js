import {
    fetchSales,
    createSale,
    updateSale,
    deleteSale,
} from "../api/sales.js";
import { renderCreateSaleForm } from "./createSaleForm.js";
import { renderEditSaleForm } from "./editSaleForm.js";
import { renderNavbar } from "./navbar.js";
import { renderClientsDashboard } from "./clientsDashboard.js"; // Importar la función para renderizar el dashboard de clientes

export async function renderSalesDashboard(clientId) {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener las ventas del cliente
    const sales = await fetchSales(clientId);

    // Renderizar el contenido principal del dashboard de ventas
    app.innerHTML += `
        <div class="mt-16 w-full max-w-4xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Sales Dashboard</h2>
                <p class="mb-4">Manage sales for client #${clientId}.</p>
                
                <h3 class="text-xl font-semibold mb-4">Sales List</h3>
                <button id="addSaleButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add Sale
                </button>
                <button id="backToClientsButton" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Back to Clients
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Sale Date</th>
                                <th class="px-4 py-2 text-left">Observation</th>
                                <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sales
                                .map(
                                    (sale) => `
                                <tr class="hover:bg-gray-50">
                                    <td class="border px-4 py-2">${new Date(
                                        sale.saleDate
                                    ).toLocaleString()}</td>
                                    <td class="border px-4 py-2">${
                                        sale.observation || "N/A"
                                    }</td>
                                    <td class="border px-4 py-2">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${
                                            sale.id
                                        }" id="edit-${sale.id}">
                                            Edit
                                        </button>
                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" data-id="${
                                            sale.id
                                        }" id="delete-${sale.id}">
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
    sales.forEach((sale) => {
        document
            .getElementById(`edit-${sale.id}`)
            .addEventListener("click", () => {
                renderEditSaleForm(clientId, sale);
            });

        document
            .getElementById(`delete-${sale.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `Are you sure you want to delete this sale?`
                );
                if (confirmDelete) {
                    await deleteSale(clientId, sale.id);
                    renderSalesDashboard(clientId); // Recargar la lista de ventas
                }
            });
    });

    // Evento para abrir el formulario de creación de venta
    document.getElementById("addSaleButton").addEventListener("click", () => {
        renderCreateSaleForm(clientId);
    });

    // Evento para volver al dashboard de clientes
    document
        .getElementById("backToClientsButton")
        .addEventListener("click", () => {
            renderClientsDashboard();
        });
}
