import {
    fetchPurchases,
    deletePurchase,
    fetchSupplier,
} from "../api/purchases.js";
import { renderCreatePurchaseForm } from "./createPurchaseForm.js";
import { renderEditPurchaseForm } from "./editPurchaseForm.js"; // Importar la función para renderizar el formulario de edición
import { renderPurchaseDetails } from "./purchaseDetails.js"; // Importar la función para renderizar los detalles de la compra
import { renderNavbar } from "./navbar.js";
import { renderSuppliersDashboard } from "./suppliersDashboard.js"; // Importar la función para renderizar el dashboard de proveedores

export async function renderPurchasesDashboard(supplierId) {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener detalles del proveedor
    const supplier = await fetchSupplier(supplierId);

    // Obtener compras del proveedor
    const purchases = await fetchPurchases(supplierId);

    // Renderizar contenido principal
    app.innerHTML += `
        <div class="mt-16 w-full max-w-4xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Purchases Dashboard</h2>
                <p class="mb-4">Manage purchases for supplier ${
                    supplier.name
                }.</p>
                
                <button id="addPurchaseButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add Purchase
                </button>
                <button id="backToSuppliersButton" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Back to Suppliers
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Purchase Date</th>
                                <th class="px-4 py-2 text-left">Total</th>
                                <th class="px-4 py-2 text-left">Observation</th>
                                <th class="px-4 py-2 text-left">Payment Method</th>
                                <th class="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${purchases
                                .map(
                                    (purchase) => `
                                <tr class="hover:bg-gray-50" id="purchase-row-${
                                    purchase.id
                                }">
                                    <td class="border px-4 py-2">${new Date(
                                        purchase.purchaseDate
                                    ).toLocaleString()}</td>
                                    <td class="border px-4 py-2">${purchase.total.toFixed(
                                        2
                                    )}</td>
                                    <td class="border px-4 py-2">${
                                        purchase.observation || "N/A"
                                    }</td>
                                    <td class="border px-4 py-2">${
                                        purchase.paymentCondition.paymentMethod
                                    }</td>
                                    <td class="border px-4 py-2">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${
                                            purchase.id
                                        }" id="edit-${purchase.id}">
                                            Edit
                                        </button>
                                        <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2" data-id="${
                                            purchase.id
                                        }" id="show-${purchase.id}">
                                            Show
                                        </button>
                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${
                                            purchase.id
                                        }" id="delete-${purchase.id}">
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

    // Asignar eventos a los botones de editar, mostrar y borrar
    purchases.forEach((purchase) => {
        document
            .getElementById(`edit-${purchase.id}`)
            .addEventListener("click", () => {
                renderEditPurchaseForm(supplierId, purchase);
            });

        document
            .getElementById(`show-${purchase.id}`)
            .addEventListener("click", () => {
                renderPurchaseDetails(supplierId, purchase.id);
            });

        document
            .getElementById(`delete-${purchase.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `Are you sure you want to delete this purchase?`
                );
                if (confirmDelete) {
                    await deletePurchase(supplierId, purchase.id);
                    document
                        .getElementById(`purchase-row-${purchase.id}`)
                        .remove(); // Eliminar la fila de la tabla
                }
            });
    });

    // Evento para abrir el formulario de creación de compras
    document
        .getElementById("addPurchaseButton")
        .addEventListener("click", () => {
            renderCreatePurchaseForm(supplierId);
        });

    // Evento para volver al dashboard de proveedores
    document
        .getElementById("backToSuppliersButton")
        .addEventListener("click", () => {
            renderSuppliersDashboard();
        });
}
