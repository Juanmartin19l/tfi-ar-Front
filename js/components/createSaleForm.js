import { createSale } from "../api/sales.js";
import { renderSalesDashboard } from "./salesDashboard.js";

export function renderCreateSaleForm(clientId) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="createSaleForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Crear Nueva Venta</h2>
                
                <div class="mb-4">
                    <label for="saleDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Venta</label>
                    <input type="datetime-local" id="saleDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observation" class="block text-gray-700 text-sm font-bold mb-2">Observación</label>
                    <textarea id="observation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>

                <h3 class="text-xl font-semibold mb-4">Detalles de la Factura</h3>
                <div class="mb-4">
                    <label for="issueDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Emisión</label>
                    <input type="date" id="issueDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="dueDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Vencimiento</label>
                    <input type="date" id="dueDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="paymentMethod" class="block text-gray-700 text-sm font-bold mb-2">Método de Pago</label>
                    <input type="text" id="paymentMethod" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="invoiceObservation" class="block text-gray-700 text-sm font-bold mb-2">Observación de la Factura</label>
                    <textarea id="invoiceObservation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div class="mb-4">
                    <label for="state" class="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                    <select id="state" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="">Seleccionar</option>
                        <option value="PENDING">PENDIENTE</option>
                        <option value="PAID">PAGADO</option>
                        <option value="CANCELED">CANCELADO</option>
                    </select>
                </div>

                <h3 class="text-xl font-semibold mb-4">Detalles del Producto</h3>
                <div id="productDetails">
                    <div class="product mb-4">
                        <div class="mb-4">
                            <label for="description-0" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
                            <input type="text" id="description-0" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-4">
                            <label for="quantity-0" class="block text-gray-700 text-sm font-bold mb-2">Cantidad</label>
                            <input type="number" id="quantity-0" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-4">
                            <label for="unitPrice-0" class="block text-gray-700 text-sm font-bold mb-2">Precio Unitario</label>
                            <input type="number" step="0.01" id="unitPrice-0" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <button class="removeProductButton bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mb-4" type="button">
                            Eliminar Producto
                        </button>
                    </div>
                </div>
                <button id="addProductButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" type="button">
                    Agregar Producto
                </button>

                <div class="flex items-center justify-between">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Crear
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
                });
            });
        });

    // Agregar evento de eliminación a los botones existentes
    const removeButtons = document.querySelectorAll(".removeProductButton");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.target.closest(".product").remove();
        });
    });

    document
        .getElementById("createSaleForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const newSale = {
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

                newSale.invoice.details.push({
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
                await createSale(clientId, newSale);
                alert("Venta creada exitosamente");
                renderSalesDashboard(clientId); // Redirigir al dashboard de ventas
            } catch (error) {
                alert(`Error al crear la venta: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderSalesDashboard(clientId);
    });
}
