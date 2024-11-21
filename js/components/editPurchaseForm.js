import { updatePurchase } from "../api/purchases.js";
import { renderPurchasesDashboard } from "./purchasesDashboard.js";

export function renderEditPurchaseForm(supplierId, purchase) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editPurchaseForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Edit Purchase</h2>
                
                <div class="mb-4">
                    <label for="purchaseDate" class="block text-gray-700 text-sm font-bold mb-2">Purchase Date</label>
                    <input type="datetime-local" id="purchaseDate" value="${new Date(
                        purchase.purchaseDate
                    )
                        .toISOString()
                        .slice(
                            0,
                            16
                        )}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="total" class="block text-gray-700 text-sm font-bold mb-2">Total Amount</label>
                    <input type="number" step="0.01" id="total" value="${
                        purchase.total
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observation" class="block text-gray-700 text-sm font-bold mb-2">Observation</label>
                    <textarea id="observation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        purchase.observation || ""
                    }</textarea>
                </div>
                <div class="mb-4">
                    <label for="paymentConditionId" class="block text-gray-700 text-sm font-bold mb-2">Payment Condition ID</label>
                    <input type="number" id="paymentConditionId" value="${
                        purchase.paymentConditionId
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>

                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save
                    </button>
                    <button id="cancel" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;

    document
        .getElementById("editPurchaseForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const updatedPurchase = {
                purchaseDate: document.getElementById("purchaseDate").value,
                total: parseFloat(document.getElementById("total").value),
                observation: document.getElementById("observation").value,
                paymentConditionId: parseInt(
                    document.getElementById("paymentConditionId").value
                ),
            };

            try {
                await updatePurchase(supplierId, purchase.id, updatedPurchase);
                alert("Purchase updated successfully");
                renderPurchasesDashboard(supplierId); // Redirigir al dashboard de compras
            } catch (error) {
                alert(`Failed to update purchase: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderPurchasesDashboard(supplierId);
    });
}
