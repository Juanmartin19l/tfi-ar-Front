import { updateSale } from "../api/sales.js";
import { renderSalesDashboard } from "./salesDashboard.js";

export function renderEditSaleForm(clientId, sale) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editSaleForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Edit Sale</h2>
                
                <div class="mb-4">
                    <label for="saleDate" class="block text-gray-700 text-sm font-bold mb-2">Sale Date</label>
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
                    <label for="observation" class="block text-gray-700 text-sm font-bold mb-2">Observation</label>
                    <textarea id="observation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        sale.observation || ""
                    }</textarea>
                </div>

                <h3 class="text-xl font-semibold mb-4">Invoice Details</h3>
                <div class="mb-4">
                    <label for="issueDate" class="block text-gray-700 text-sm font-bold mb-2">Issue Date</label>
                    <input type="date" id="issueDate" value="${
                        sale.invoice.issueDate
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="dueDate" class="block text-gray-700 text-sm font-bold mb-2">Due Date</label>
                    <input type="date" id="dueDate" value="${
                        sale.invoice.dueDate
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="paymentMethod" class="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                    <input type="text" id="paymentMethod" value="${
                        sale.invoice.paymentMethod
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="invoiceObservation" class="block text-gray-700 text-sm font-bold mb-2">Invoice Observation</label>
                    <textarea id="invoiceObservation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        sale.invoice.observation || ""
                    }</textarea>
                </div>
                <div class="mb-4">
                    <label for="state" class="block text-gray-700 text-sm font-bold mb-2">State</label>
                    <select id="state" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="PENDING" ${
                            sale.invoice.state === "PENDING" ? "selected" : ""
                        }>PENDING</option>
                        <option value="PAID" ${
                            sale.invoice.state === "PAID" ? "selected" : ""
                        }>PAID</option>
                        <option value="CANCELED" ${
                            sale.invoice.state === "CANCELED" ? "selected" : ""
                        }>CANCELED</option>
                    </select>
                </div>

                <h3 class="text-xl font-semibold mb-4">Product Details</h3>
                <div id="productDetails">
                    ${sale.invoice.details
                        .map(
                            (detail, index) => `
                        <div class="mb-4">
                            <label for="description-${index}" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <input type="text" id="description-${index}" value="${detail.description}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-4">
                            <label for="quantity-${index}" class="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                            <input type="number" id="quantity-${index}" value="${detail.quantity}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="mb-4">
                            <label for="unitPrice-${index}" class="block text-gray-700 text-sm font-bold mb-2">Unit Price</label>
                            <input type="number" step="0.01" id="unitPrice-${index}" value="${detail.unitPrice}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                    `
                        )
                        .join("")}
                </div>
                <button id="addProductButton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" type="button">
                    Add Product
                </button>

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
            const productCount = productDetails.children.length / 3; // Cada producto tiene 3 campos
            for (let i = 0; i < productCount; i++) {
                updatedSale.invoice.details.push({
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
                await updateSale(clientId, sale.id, updatedSale);
                alert("Sale updated successfully");
                renderSalesDashboard(clientId); // Redirigir al dashboard de ventas
            } catch (error) {
                alert(`Failed to update sale: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderSalesDashboard(clientId);
    });
}
