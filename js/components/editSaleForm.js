import { updateSale } from "../api/sales.js";
import { renderSalesDashboard } from "./salesDashboard.js";

export function renderEditSaleForm(clientId, sale) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editSaleForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Editar Venta</h2>
                
                <div class="mb-4">
                    <label for="saleDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Venta</label>
                    <input type="datetime-local" id="saleDate" value="${new Date(
                        sale.saleDate
                    )
                        .toISOString()
                        .slice(
                            0,
                            16
                        )}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observation" class="block text-gray-700 text-sm font-bold mb-2">Observación</label>
                    <textarea id="observation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        sale.observation || ""
                    }</textarea>
                </div>

                <h3 class="text-xl font-semibold mb-4">Detalles de la Factura</h3>
                <div class="mb-4">
                    <label for="issueDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Emisión</label>
                    <input type="date" id="issueDate" value="${
                        sale.invoice.issueDate
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="dueDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Vencimiento</label>
                    <input type="date" id="dueDate" value="${
                        sale.invoice.dueDate
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="paymentMethod" class="block text-gray-700 text-sm font-bold mb-2">Método de Pago</label>
                    <input type="text" id="paymentMethod" value="${
                        sale.invoice.paymentMethod
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="invoiceObservation" class="block text-gray-700 text-sm font-bold mb-2">Observación de la Factura</label>
                    <textarea id="invoiceObservation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        sale.invoice.observation || ""
                    }</textarea>
                </div>
                <div class="mb-4">
                    <label for="state" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                    <select id="state" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Seleccionar</option>
                        <option value="PENDING" ${
                            sale.invoice.state === "PENDING" ? "selected" : ""
                        }>PENDIENTE</option>
                        <option value="PAID" ${
                            sale.invoice.state === "PAID" ? "selected" : ""
                        }>PAGADO</option>
                        <option value="CANCELED" ${
                            sale.invoice.state === "CANCELED" ? "selected" : ""
                        }>CANCELADO</option>
                    </select>
                </div>

                <h3 class="text-xl font-semibold mb-4">Detalles del Producto</h3>
                <div id="productDetails">
                    ${sale.invoice.details
                        .map(
                            (detail, index) => `
                        <div class="product mb-4">
                            <div class="mb-4">
                                <label for="description-${index}" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                                <input type="text" id="description-${index}" value="${detail.description}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div class="mb-4">
                                <label for="quantity-${index}" class="block text-gray-700 text-sm font-bold mb-2">Cantidad</label>
                                <input type="number" id="quantity-${index}" value="${detail.quantity}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div class="mb-4">
                                <label for="unitPrice-${index}" class="block text-gray-700 text-sm font-bold mb-2">Precio Unitario</label>
                                <input type="number" step="0.01" id="unitPrice-${index}" value="${detail.unitPrice}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <button class="removeProductButton bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mb-4" type="button">
                                Eliminar Producto
                            </button>
                        </div>
                    `
                        )
                        .join("")}
                </div>
                <button id="addProductButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" type="button">
                    Agregar Producto
                </button>

                <div class="flex items-center justify-between">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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
        .getElementById("addProductButton")
        .addEventListener("click", () => {
            const productDetails = document.getElementById("productDetails");
            const productCount = productDetails.children.length; // Cada producto tiene 4 campos
            const newProductHTML = `
            <div class="product mb-4">
                <div class="mb-4">
                    <label for="description-${productCount}" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                    <input type="text" id="description-${productCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="quantity-${productCount}" class="block text-gray-700 text-sm font-bold mb-2">Cantidad</label>
                    <input type="number" id="quantity-${productCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="unitPrice-${productCount}" class="block text-gray-700 text-sm font-bold mb-2">Precio Unitario</label>
                    <input type="number" step="0.01" id="unitPrice-${productCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <button class="removeProductButton bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mb-4" type="button">
                    Eliminar Producto
                </button>
            </div>
        `;
            productDetails.insertAdjacentHTML("beforeend", newProductHTML);

            // Agregar evento de eliminación al nuevo botón
            const removeButtons = document.querySelectorAll(
                ".removeProductButton"
            );
            removeButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.target.closest(".product").remove();
                    updateProductIndices();
                });
            });
        });

    // Agregar evento de eliminación a los botones existentes
    const removeButtons = document.querySelectorAll(".removeProductButton");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.target.closest(".product").remove();
            updateProductIndices();
        });
    });

    function updateProductIndices() {
        const products = document.querySelectorAll(".product");
        products.forEach((product, index) => {
            product.querySelector(".description").id = `description-${index}`;
            product.querySelector(".quantity").id = `quantity-${index}`;
            product.querySelector(".unitPrice").id = `unitPrice-${index}`;
        });
    }

    document
        .getElementById("editSaleForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const updatedSale = {
                saleDate: document.getElementById("saleDate").value,
                observation: document.getElementById("observation").value,
                invoice: {
                    issueDate: document.getElementById("issueDate").value,
                    dueDate: document.getElementById("dueDate").value,
                    paymentMethod:
                        document.getElementById("paymentMethod").value,
                    observation:
                        document.getElementById("invoiceObservation").value,
                    state: document.getElementById("state").value,
                    details: [],
                },
            };

            const productDetails = document.getElementById("productDetails");
            const products = productDetails.querySelectorAll(".product");
            let allFieldsFilled = true;

            products.forEach((product, index) => {
                const description = product.querySelector(
                    `#description-${index}`
                ).value;
                const quantity = product.querySelector(
                    `#quantity-${index}`
                ).value;
                const unitPrice = product.querySelector(
                    `#unitPrice-${index}`
                ).value;

                if (!description || !quantity || !unitPrice) {
                    allFieldsFilled = false;
                }

                updatedSale.invoice.details.push({
                    description,
                    quantity: parseFloat(quantity),
                    unitPrice: parseFloat(unitPrice),
                });
            });

            if (products.length === 0) {
                alert("Debe agregar al menos un producto.");
                return;
            }

            if (!allFieldsFilled) {
                alert("Por favor, complete todos los campos de los productos.");
                return;
            }

            try {
                await updateSale(clientId, sale.id, updatedSale);
                alert("Venta actualizada exitosamente");
                renderSalesDashboard(clientId); // Redirigir al dashboard de ventas
            } catch (error) {
                alert(`Error al actualizar la venta: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderSalesDashboard(clientId);
    });
}
