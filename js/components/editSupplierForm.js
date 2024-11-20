import { updateSupplier } from "../api/suppliers.js";
import { renderSuppliersDashboard } from "./suppliersDashboard.js";

export function renderEditSupplierForm(supplier) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editSupplierForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Edit Supplier</h2>
                
                <div class="mb-4">
                    <label for="cuit" class="block text-gray-700 text-sm font-bold mb-2">CUIT</label>
                    <input type="text" id="cuit" value="${
                        supplier.cuit
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" value="${
                        supplier.name
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" value="${
                        supplier.email
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input type="tel" id="phone" value="${
                        supplier.phone
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                
                <h3 class="text-xl font-semibold mb-4">Address</h3>
                <div class="mb-4">
                    <label for="street" class="block text-gray-700 text-sm font-bold mb-2">Street</label>
                    <input type="text" id="street" value="${
                        supplier.address.street
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="number" class="block text-gray-700 text-sm font-bold mb-2">Number</label>
                    <input type="text" id="number" value="${
                        supplier.address.number
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="floor" class="block text-gray-700 text-sm font-bold mb-2">Floor</label>
                    <input type="text" id="floor" value="${
                        supplier.address.floor
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="apartment" class="block text-gray-700 text-sm font-bold mb-2">Apartment</label>
                    <input type="text" id="apartment" value="${
                        supplier.address.apartment
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="postalCode" class="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                    <input type="text" id="postalCode" value="${
                        supplier.address.postalCode
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="cityId" class="block text-gray-700 text-sm font-bold mb-2">City ID</label>
                    <input type="number" id="cityId" value="${
                        supplier.address.cityId
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observations" class="block text-gray-700 text-sm font-bold mb-2">Observations</label>
                    <textarea id="observations" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        supplier.address.observations || ""
                    }</textarea>
                </div>
                
                <h3 class="text-xl font-semibold mb-4">Payment Conditions</h3>
                <div id="paymentConditionsContainer" class="mb-4">
                    ${supplier.paymentConditions
                        .map(
                            (condition) => `
                        <div class="payment-condition mb-4">
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                                <input type="text" value="${
                                    condition.paymentMethod
                                }" class="paymentMethod shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Payment Term (Days)</label>
                                <input type="number" value="${
                                    condition.paymentTermDays
                                }" class="paymentTermDays shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Currency</label>
                                <input type="text" value="${
                                    condition.currency
                                }" class="currency shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Bank</label>
                                <input type="text" value="${
                                    condition.bank
                                }" class="bank shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
                                <input type="text" value="${
                                    condition.accountNumber
                                }" class="accountNumber shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2">Observation</label>
                                <textarea class="observation shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                                    condition.observation || ""
                                }</textarea>
                            </div>
                        </div>
                    `
                        )
                        .join("")}
                </div>
                <button id="addPaymentCondition" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add Payment Condition
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

    const paymentConditionsContainer = document.getElementById(
        "paymentConditionsContainer"
    );
    document
        .getElementById("addPaymentCondition")
        .addEventListener("click", (e) => {
            e.preventDefault();
            const conditionTemplate = `
            <div class="payment-condition mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                    <input type="text" class="paymentMethod shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Payment Term (Days)</label>
                    <input type="number" class="paymentTermDays shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Currency</label>
                    <input type="text" class="currency shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Bank</label>
                    <input type="text" class="bank shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Account Number</label>
                    <input type="text" class="accountNumber shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Observation</label>
                    <textarea class="observation shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
            </div>
        `;
            paymentConditionsContainer.insertAdjacentHTML(
                "beforeend",
                conditionTemplate
            );
        });

    document
        .getElementById("editSupplierForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const paymentConditions = Array.from(
                document.querySelectorAll(".payment-condition")
            ).map((condition) => ({
                paymentMethod: condition.querySelector(".paymentMethod").value,
                paymentTermDays:
                    condition.querySelector(".paymentTermDays").value,
                currency: condition.querySelector(".currency").value,
                bank: condition.querySelector(".bank").value,
                accountNumber: condition.querySelector(".accountNumber").value,
                observation: condition.querySelector(".observation").value,
            }));

            const updatedSupplier = {
                cuit: document.getElementById("cuit").value,
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                address: {
                    street: document.getElementById("street").value,
                    number: document.getElementById("number").value,
                    floor: document.getElementById("floor").value,
                    apartment: document.getElementById("apartment").value,
                    postalCode: document.getElementById("postalCode").value,
                    cityId: parseInt(document.getElementById("cityId").value),
                    observations: document.getElementById("observations").value,
                },
                paymentConditions,
            };

            try {
                await updateSupplier(supplier.id, updatedSupplier);
                alert("Supplier updated successfully");
                renderSuppliersDashboard();
            } catch (error) {
                alert(`Failed to update supplier: ${error.message}`);
            }
        });

    document
        .getElementById("cancel")
        .addEventListener("click", renderSuppliersDashboard);
}
