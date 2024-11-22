import { updateEmployee } from "../api/employee.js";
import { renderAdminDashboard } from "./adminDashboard.js";

export function renderEditEmployeeForm(employee) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="editEmployeeForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Editar Empleado</h2>
                
                <div class="mb-4">
                    <label for="dni" class="block text-gray-700 text-sm font-bold mb-2">DNI</label>
                    <input type="text" id="dni" value="${
                        employee.dni
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input type="text" id="name" value="${
                        employee.name
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="birthDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                    <input type="date" id="birthDate" value="${
                        employee.birthDate
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                    <input type="email" id="email" value="${
                        employee.email
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                    <input type="tel" id="phone" value="${
                        employee.phone
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <h3 class="text-xl font-semibold mb-4">Dirección</h3>
                <div class="mb-4">
                    <label for="street" class="block text-gray-700 text-sm font-bold mb-2">Calle</label>
                    <input type="text" id="street" value="${
                        employee.address.street
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="number" class="block text-gray-700 text-sm font-bold mb-2">Número</label>
                    <input type="text" id="number" value="${
                        employee.address.number
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="floor" class="block text-gray-700 text-sm font-bold mb-2">Piso</label>
                    <input type="text" id="floor" value="${
                        employee.address.floor
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="apartment" class="block text-gray-700 text-sm font-bold mb-2">Departamento</label>
                    <input type="text" id="apartment" value="${
                        employee.address.apartment
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="postalCode" class="block text-gray-700 text-sm font-bold mb-2">Código Postal</label>
                    <input type="text" id="postalCode" value="${
                        employee.address.postalCode
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="country" class="block text-gray-700 text-sm font-bold mb-2">País</label>
                    <input type="text" id="country" value="Argentina" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" readonly>
                </div>
                <div class="mb-4">
                    <label for="state" class="block text-gray-700 text-sm font-bold mb-2">Provincia</label>
                    <select id="state" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                        <option value="">Seleccione una provincia</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="city" class="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                    <select id="city" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                        <option value="">Seleccione una ciudad</option>
                    </select>
                    <input type="hidden" id="cityId" value="${
                        employee.address.cityId
                    }">
                </div>
                <div class="mb-4">
                    <label for="observations" class="block text-gray-700 text-sm font-bold mb-2">Observaciones</label>
                    <textarea id="observations" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${
                        employee.address.observations || ""
                    }</textarea>
                </div>
                <div class="mb-4">
                    <label for="startDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Inicio</label>
                    <input type="date" id="startDate" value="${
                        employee.startDate
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="endDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Fin</label>
                    <input type="date" id="endDate" value="${
                        employee.endDate || ""
                    }" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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

    // Cargar los datos de lugares.json
    fetch("/data/lugares.json")
        .then((response) => response.json())
        .then((lugares) => {
            // Llenar el selector de provincias
            const stateSelect = document.getElementById("state");
            lugares.countries[0].states.forEach((state) => {
                const option = document.createElement("option");
                option.value = state.state_id;
                option.textContent = state.state_name;
                stateSelect.appendChild(option);
            });

            // Seleccionar la provincia y cargar las ciudades correspondientes
            const selectedState = lugares.countries[0].states.find((state) =>
                state.cities.some(
                    (city) => city.city_id === employee.address.cityId
                )
            );
            if (selectedState) {
                stateSelect.value = selectedState.state_id;
                const citySelect = document.getElementById("city");
                citySelect.innerHTML =
                    '<option value="">Seleccione una ciudad</option>';
                selectedState.cities.forEach((city) => {
                    const option = document.createElement("option");
                    option.value = city.city_id;
                    option.textContent = city.city_name;
                    citySelect.appendChild(option);
                });
                citySelect.value = employee.address.cityId;
            }

            // Manejar el cambio de provincia para cargar las ciudades correspondientes
            stateSelect.addEventListener("change", (e) => {
                const stateId = e.target.value;
                const state = lugares.countries[0].states.find(
                    (state) => state.state_id == stateId
                );
                const citySelect = document.getElementById("city");
                citySelect.innerHTML =
                    '<option value="">Seleccione una ciudad</option>';
                state.cities.forEach((city) => {
                    const option = document.createElement("option");
                    option.value = city.city_id;
                    option.textContent = city.city_name;
                    citySelect.appendChild(option);
                });
            });

            // Manejar el cambio de ciudad para establecer el cityId
            document.getElementById("city").addEventListener("change", (e) => {
                const cityId = e.target.value;
                document.getElementById("cityId").value = cityId;
            });
        });

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
                alert("Empleado actualizado exitosamente");
                renderAdminDashboard();
            } catch (error) {
                alert(`Error al actualizar el empleado: ${error.message}`);
            }
        });

    document
        .getElementById("cancel")
        .addEventListener("click", renderAdminDashboard);
}
