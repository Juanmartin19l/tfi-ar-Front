import { createSale } from "../api/sales.js";
import { renderSalesDashboard } from "./salesDashboard.js";

export function renderCreateSaleForm(clientId) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="createSaleForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Create New Sale</h2>
                
                <div class="mb-4">
                    <label for="saleDate" class="block text-gray-700 text-sm font-bold mb-2">Sale Date</label>
                    <input type="datetime-local" id="saleDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observation" class="block text-gray-700 text-sm font-bold mb-2">Observation</label>
                    <textarea id="observation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>

                <h3 class="text-xl font-semibold mb-4">Invoice Details</h3>
                <div class="mb-4">
                    <label for="issueDate" class="block text-gray-700 text-sm font-bold mb-2">Issue Date</label>
                    <input type="date" id="issueDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="dueDate" class="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                    <input type="date" id="dueDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="paymentMethod" class="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                    <input type="text" id="paymentMethod" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="invoiceObservation" class="block text-gray-700 text-sm font-bold mb-2">Invoice Observation</label>
                    <textarea id="invoiceObservation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div class="mb-4">
                    <label for="state" class="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <select id="state" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="CANCELED">CANCELED</option>
                    </select>
                </div>

                <h3 class="text-xl font-semibold mb-4">Product Details</h3>
                <div id="productDetails">
                    <div class="mb-4">
                        <label for="description-0" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                        <input type="text" id="description-0" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="quantity-0" class="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                        <input type="number" id="quantity-0" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="unitPrice-0" class="block text-gray-700 text-sm font-bold mb-2">Unit Price</label>
                        <input type="number" step="0.01" id="unitPrice-0" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                </div>
                <button id="addProductButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" type="button">
                    Add Product
                </button>

                <div class="flex items-center justify-between">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Create
                    </button>
                    <button id="cancel" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;

    document
        .getElementById("addProductButton")
        .addEventListener("click", () => {
            const productDetails = document.getElementById("productDetails");
            const productCount = productDetails.children.length / 3; // Cada producto tiene 3 campos
            const newProductHTML = `
            <div class="mb-4">
                <label for="description-${productCount}" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <input type="text" id="description-${productCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="quantity-${productCount}" class="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                <input type="number" id="quantity-${productCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="unitPrice-${productCount}" class="block text-gray-700 text-sm font-bold mb-2">Unit Price</label>
                <input type="number" step="0.01" id="unitPrice-${productCount}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
        `;
            productDetails.insertAdjacentHTML("beforeend", newProductHTML);
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
            const productCount = productDetails.children.length / 3; // Cada producto tiene 3 campos
            for (let i = 0; i < productCount; i++) {
                newSale.invoice.details.push({
                    description: document.getElementById(`description-${i}`)
                        .value,
                    quantity: parseFloat(
                        document.getElementById(`quantity-${i}`).value
                    ),
                    unitPrice: parseFloat(
                        document.getElementById(`unitPrice-${i}`).value
                    ),
                });
            }

            try {
                await createSale(clientId, newSale);
                alert("Sale created successfully");
                renderSalesDashboard(clientId); // Redirigir al dashboard de ventas
            } catch (error) {
                alert(`Failed to create sale: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderSalesDashboard(clientId);
    });
}
