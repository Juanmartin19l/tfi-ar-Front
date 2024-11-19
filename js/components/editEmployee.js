import { fetchEmployeeById, updateEmployee } from "../api/employee.js";

export async function renderEditEmployeeForm(employeeId) {
    const app = document.getElementById("app");
    const employee = await fetchEmployeeById(employeeId);

    app.innerHTML = `
        <div class="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
            <h2 class="text-xl font-bold mb-4">Edit Employee</h2>
            <form id="editEmployeeForm">
                <!-- Información personal -->
                <h3 class="text-lg font-semibold mb-2">Personal Information</h3>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value="${employee.name}" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="dni">DNI</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dni" type="text" value="${employee.dni}" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value="${employee.email}" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="phone">Phone</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" value="${employee.phone}" required>
                </div>

                <!-- Dirección -->
                <h3 class="text-lg font-semibold mb-2">Address</h3>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="street">Street</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="street" type="text" value="${employee.address.street}" required>
                </div>
                <div class="flex gap-4 mb-4">
                    <div class="flex-1">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="number">Number</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="number" type="text" value="${employee.address.number}" required>
                    </div>
                    <div class="flex-1">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="floor">Floor</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="floor" type="text" value="${employee.address.floor}">
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="city">City</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="city" type="text" value="${employee.address.city}" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="state">State</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="state" type="text" value="${employee.address.state}" required>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="country">Country</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="country" type="text" value="${employee.address.country}" required>
                </div>

                <!-- Botones -->
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save
                    </button>
                    <button id="cancelButton" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;

    // Guardar cambios
    const editEmployeeForm = document.getElementById("editEmployeeForm");
    editEmployeeForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedEmployee = {
            id: employeeId,
            dni: document.getElementById("dni").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address: {
                street: document.getElementById("street").value,
                number: document.getElementById("number").value,
                floor: document.getElementById("floor").value,
                city: document.getElementById("city").value,
                state: document.getElementById("state").value,
                country: document.getElementById("country").value,
            },
        };

        const success = await updateEmployee(employeeId, updatedEmployee);
        if (success) {
            alert("Employee updated successfully!");
            location.reload();
        } else {
            alert("Failed to update employee.");
        }
    });

    // Cancelar y volver
    const cancelButton = document.getElementById("cancelButton");
    cancelButton.addEventListener("click", (e) => {
        e.preventDefault();
        location.reload();
    });
}
