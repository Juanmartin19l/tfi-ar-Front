import { updateClient } from "../api/client.js";
import { renderClientsDashboard } from "./clientsDashboard.js";

export function renderEditClientForm(client) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editClientForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Edit Client</h2>
                
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" value="${
                        client.name
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" value="${
                        client.email
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input type="tel" id="phone" value="${
                        client.phone
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="contactName" class="block text-gray-700 text-sm font-bold mb-2">Contact Name</label>
                    <input type="text" id="contactName" value="${
                        client.contactName
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="street" class="block text-gray-700 text-sm font-bold mb-2">Street</label>
                    <input type="text" id="street" value="${
                        client.address.street
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="number" class="block text-gray-700 text-sm font-bold mb-2">Number</label>
                    <input type="text" id="number" value="${
                        client.address.number
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="floor" class="block text-gray-700 text-sm font-bold mb-2">Floor</label>
                    <input type="text" id="floor" value="${
                        client.address.floor
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="apartment" class="block text-gray-700 text-sm font-bold mb-2">Apartment</label>
                    <input type="text" id="apartment" value="${
                        client.address.apartment
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="postalCode" class="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                    <input type="text" id="postalCode" value="${
                        client.address.postalCode
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="cityId" class="block text-gray-700 text-sm font-bold mb-2">City ID</label>
                    <input type="number" id="cityId" value="${
                        client.address.cityId
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observations" class="block text-gray-700 text-sm font-bold mb-2">Observations</label>
                    <textarea id="observations" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        client.address.observations || ""
                    }</textarea>
                </div>
                <div class="mb-4">
                    <label for="industry" class="block text-gray-700 text-sm font-bold mb-2">Industry</label>
                    <input type="text" id="industry" value="${
                        client.industry
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="estimatedTransactionsNumber" class="block text-gray-700 text-sm font-bold mb-2">Estimated Transactions Number</label>
                    <input type="number" id="estimatedTransactionsNumber" value="${
                        client.estimatedTransactionsNumber
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="technologiesUsed" class="block text-gray-700 text-sm font-bold mb-2">Technologies Used</label>
                    <input type="text" id="technologiesUsed" value="${
                        client.technologiesUsed
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="remarks" class="block text-gray-700 text-sm font-bold mb-2">Remarks</label>
                    <textarea id="remarks" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        client.remarks || ""
                    }</textarea>
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
        .getElementById("editClientForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const updatedClient = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                contactName: document.getElementById("contactName").value,
                address: {
                    street: document.getElementById("street").value,
                    number: document.getElementById("number").value,
                    floor: document.getElementById("floor").value,
                    apartment: document.getElementById("apartment").value,
                    postalCode: document.getElementById("postalCode").value,
                    cityId: parseInt(document.getElementById("cityId").value),
                    observations: document.getElementById("observations").value,
                },
                industry: document.getElementById("industry").value,
                estimatedTransactionsNumber: document.getElementById(
                    "estimatedTransactionsNumber"
                ).value,
                technologiesUsed:
                    document.getElementById("technologiesUsed").value,
                remarks: document.getElementById("remarks").value,
            };

            try {
                await updateClient(client.id, updatedClient);
                alert("Client updated successfully");
                renderClientsDashboard(); // Regresa al dashboard
            } catch (error) {
                alert(`Failed to update client: ${error.message}`);
            }
        });

    document
        .getElementById("cancel")
        .addEventListener("click", renderClientsDashboard);
}
