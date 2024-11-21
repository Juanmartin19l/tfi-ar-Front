import { fetchPurchases } from "../api/purchases.js";
import { renderCreatePurchaseForm } from "./createPurchaseForm.js";
import { renderNavbar } from "./navbar.js";

export async function renderPurchasesDashboard(supplierId) {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener compras del proveedor
    const purchases = await fetchPurchases(supplierId);

    // Renderizar contenido principal
    app.innerHTML += `
        <div class="mt-16 w-full max-w-4xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Purchases Dashboard</h2>
                <p class="mb-4">Manage purchases for supplier #${supplierId}.</p>
                
                <button id="addPurchaseButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add Purchase
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Purchase Date</th>
                                <th class="px-4 py-2 text-left">Total</th>
                                <th class="px-4 py-2 text-left">Observation</th>
                                <th class="px-4 py-2 text-left">Payment Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${purchases
                                .map(
                                    (purchase) => `
                                <tr class="hover:bg-gray-50">
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
                                        purchase.paymentConditionId
                                    }</td>
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

    // Evento para abrir el formulario de creación de compras
    document
        .getElementById("addPurchaseButton")
        .addEventListener("click", () => {
            renderCreatePurchaseForm(supplierId);
        });
}
