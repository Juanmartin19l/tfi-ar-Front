import { updateEmployee } from "../api/employee.js";
import { renderAdminDashboard } from "./adminDashboard.js";

export function renderEditEmployeeForm(employee) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editEmployeeForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Edit Employee</h2>
                
                <div class="mb-4">
                    <label for="dni" class="block text-gray-700 text-sm font-bold mb-2">DNI</label>
                    <input type="text" id="dni" value="${
                        employee.dni
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" value="${
                        employee.name
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="birthDate" class="block text-gray-700 text-sm font-bold mb-2">Birth Date</label>
                    <input type="date" id="birthDate" value="${
                        employee.birthDate
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" value="${
                        employee.email
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                    <input type="tel" id="phone" value="${
                        employee.phone
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <h3 class="text-xl font-semibold mb-4">Address</h3>
                <div class="mb-4">
                    <label for="street" class="block text-gray-700 text-sm font-bold mb-2">Street</label>
                    <input type="text" id="street" value="${
                        employee.address.street
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="number" class="block text-gray-700 text-sm font-bold mb-2">Number</label>
                    <input type="text" id="number" value="${
                        employee.address.number
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="floor" class="block text-gray-700 text-sm font-bold mb-2">Floor</label>
                    <input type="text" id="floor" value="${
                        employee.address.floor
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="apartment" class="block text-gray-700 text-sm font-bold mb-2">Apartment</label>
                    <input type="text" id="apartment" value="${
                        employee.address.apartment
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="postalCode" class="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                    <input type="text" id="postalCode" value="${
                        employee.address.postalCode
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="cityId" class="block text-gray-700 text-sm font-bold mb-2">City ID</label>
                    <input type="number" id="cityId" value="${
                        employee.address.cityId
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="observations" class="block text-gray-700 text-sm font-bold mb-2">Observations</label>
                    <textarea id="observations" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        employee.address.observations || ""
                    }</textarea>
                </div>
                <div class="mb-4">
                    <label for="startDate" class="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                    <input type="date" id="startDate" value="${
                        employee.startDate
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="endDate" class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                    <input type="date" id="endDate" value="${
                        employee.endDate || ""
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
        .getElementById("editEmployeeForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            const updatedEmployee = {
                dni: document.getElementById("dni").value,
                name: document.getElementById("name").value,
                birthDate: document.getElementById("birthDate").value,
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
                startDate: document.getElementById("startDate").value,
                endDate: document.getElementById("endDate").value || null,
                userId: employee.userId,
            };

            try {
                await updateEmployee(employee.id, updatedEmployee);
                alert("Employee updated successfully");
                renderAdminDashboard();
            } catch (error) {
                alert(`Failed to update employee: ${error.message}`);
            }
        });

    document
        .getElementById("cancel")
        .addEventListener("click", renderAdminDashboard);
}
