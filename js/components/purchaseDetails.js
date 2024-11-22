import {
    fetchPurchase,
    createOrUpdateRating,
    deleteRating,
} from "../api/purchases.js";
import { renderPurchasesDashboard } from "./purchasesDashboard.js";

export async function renderPurchaseDetails(supplierId, purchaseId) {
    const app = document.getElementById("app");
    const purchase = await fetchPurchase(supplierId, purchaseId);

    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Detalles de la Compra</h2>
                <p><strong>Fecha de Compra:</strong> ${new Date(
                    purchase.purchaseDate
                ).toLocaleString()}</p>
                <p><strong>Total:</strong> ${purchase.total.toFixed(2)}</p>
                <p><strong>Observación:</strong> ${
                    purchase.observation || "N/A"
                }</p>
                <p><strong>Método de Pago:</strong> ${
                    purchase.paymentCondition.paymentMethod
                }</p>
                <p><strong>Banco:</strong> ${purchase.paymentCondition.bank}</p>
                <p><strong>Número de Cuenta:</strong> ${
                    purchase.paymentCondition.accountNumber
                }</p>
                <p><strong>Días de Plazo de Pago:</strong> ${
                    purchase.paymentCondition.paymentTermDays
                }</p>
                <p><strong>Moneda:</strong> ${
                    purchase.paymentCondition.currency
                }</p>
                <p><strong>Observación de la Condición de Pago:</strong> ${
                    purchase.paymentCondition.observation
                }</p>

                <h3 class="text-xl font-semibold mb-4">Calificación</h3>
                ${
                    purchase.purchaseRating
                        ? `
                    <p><strong>Calificación:</strong> ${purchase.purchaseRating.rating}</p>
                    <p><strong>Observación:</strong> ${purchase.purchaseRating.observation}</p>
                    <button id="editRatingButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Editar Calificación</button>
                    <button id="deleteRatingButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4">Eliminar Calificación</button>
                `
                        : `
                    <button id="addRatingButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Agregar Calificación</button>
                `
                }

                <button id="backToPurchasesButton" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">Volver a Compras</button>
            </div>
        </div>
    `;

    if (purchase.purchaseRating) {
        document
            .getElementById("editRatingButton")
            .addEventListener("click", () => {
                renderEditRatingForm(
                    supplierId,
                    purchaseId,
                    purchase.purchaseRating
                );
            });

        document
            .getElementById("deleteRatingButton")
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    "¿Estás seguro de que deseas eliminar esta calificación?"
                );
                if (confirmDelete) {
                    await deleteRating(supplierId, purchaseId);
                    renderPurchaseDetails(supplierId, purchaseId);
                }
            });
    } else {
        document
            .getElementById("addRatingButton")
            .addEventListener("click", () => {
                renderAddRatingForm(supplierId, purchaseId);
            });
    }

    document
        .getElementById("backToPurchasesButton")
        .addEventListener("click", () => {
            renderPurchasesDashboard(supplierId);
        });
}

function renderAddRatingForm(supplierId, purchaseId) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="addRatingForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Agregar Calificación</h2>
                
                <div class="mb-4">
                    <label for="rating" class="block text-gray-700 text-sm font-bold mb-2">Calificación</label>
                    <input type="number" id="rating" min="1" max="5" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observation" class="block text-gray-700 text-sm font-bold mb-2">Observación</label>
                    <textarea id="observation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>

                <div class="flex items-center justify-between mt-6">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Agregar
                    </button>
                    <button id="cancel" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    `;

    document
        .getElementById("addRatingForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const ratingData = {
                rating: parseInt(document.getElementById("rating").value),
                observation: document.getElementById("observation").value,
            };

            try {
                await createOrUpdateRating(supplierId, purchaseId, ratingData);
                alert("Calificación agregada exitosamente");
                renderPurchaseDetails(supplierId, purchaseId);
            } catch (error) {
                alert(`Error al agregar la calificación: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderPurchaseDetails(supplierId, purchaseId);
    });
}

function renderEditRatingForm(supplierId, purchaseId, rating) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editRatingForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Editar Calificación</h2>
                
                <div class="mb-4">
                    <label for="rating" class="block text-gray-700 text-sm font-bold mb-2">Calificación</label>
                    <input type="number" id="rating" min="1" max="5" value="${rating.rating}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observation" class="block text-gray-700 text-sm font-bold mb-2">Observación</label>
                    <textarea id="observation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${rating.observation}</textarea>
                </div>

                <div class="flex items-center justify-between mt-6">
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

    document
        .getElementById("editRatingForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const updatedRating = {
                rating: parseInt(document.getElementById("rating").value),
                observation: document.getElementById("observation").value,
            };

            try {
                await createOrUpdateRating(
                    supplierId,
                    purchaseId,
                    updatedRating
                );
                alert("Calificación actualizada exitosamente");
                renderPurchaseDetails(supplierId, purchaseId);
            } catch (error) {
                alert(`Error al actualizar la calificación: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderPurchaseDetails(supplierId, purchaseId);
    });
}
