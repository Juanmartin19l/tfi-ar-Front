import { updatePurchase } from "../api/purchases.js";
import { renderPurchasesDashboard } from "./purchasesDashboard.js";
import { fetchSupplier } from "../api/suppliers.js"; // Importar la función para obtener los detalles del proveedor

export function renderEditPurchaseForm(supplierId, purchase) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editPurchaseForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Editar Compra</h2>
                
                <div class="mb-4">
                    <label for="purchaseDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Compra</label>
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
                    <label for="total" class="block text-gray-700 text-sm font-bold mb-2">Monto Total</label>
                    <input type="number" step="0.01" id="total" value="${
                        purchase.total
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observation" class="block text-gray-700 text-sm font-bold mb-2">Observación</label>
                    <textarea id="observation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        purchase.observation || ""
                    }</textarea>
                </div>
                <div class="mb-4">
                    <label for="paymentCondition" class="block text-gray-700 text-sm font-bold mb-2">Condición de Pago</label>
                    <select id="paymentCondition" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Seleccione una condición de pago</option>
                    </select>
                </div>

                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Guardar
                    </button>
                    <button id="cancel" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    // Cargar las condiciones de pago del proveedor
    fetchSupplier(supplierId)
        .then((supplier) => {
            const paymentConditions = supplier.paymentConditions;
            const paymentConditionSelect =
                document.getElementById("paymentCondition");
            if (paymentConditions.length === 0) {
                alert("Primero se debe agregar un método de pago.");
                renderPurchasesDashboard(supplierId);
                return;
            }
            paymentConditions.forEach((condition) => {
                const option = document.createElement("option");
                option.value = condition.id;
                option.textContent = `${condition.paymentMethod} - ${condition.currency}`;
                paymentConditionSelect.appendChild(option);
            });
            // Seleccionar la condición de pago actual
            paymentConditionSelect.value = purchase.paymentConditionId;
        })
        .catch((error) => {
            alert(`Error al cargar las condiciones de pago: ${error.message}`);
            renderPurchasesDashboard(supplierId);
        });

    document
        .getElementById("editPurchaseForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const paymentConditionId =
                document.getElementById("paymentCondition").value;
            if (!paymentConditionId) {
                alert("Por favor, seleccione una condición de pago.");
                return;
            }

            const updatedPurchase = {
                purchaseDate: document.getElementById("purchaseDate").value,
                total: parseFloat(document.getElementById("total").value),
                observation: document.getElementById("observation").value,
                paymentConditionId: parseInt(paymentConditionId),
            };

            try {
                await updatePurchase(supplierId, purchase.id, updatedPurchase);
                alert("Compra actualizada exitosamente");
                renderPurchasesDashboard(supplierId); // Redirigir al dashboard de compras
            } catch (error) {
                alert(`Error al actualizar la compra: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderPurchasesDashboard(supplierId);
    });
}
