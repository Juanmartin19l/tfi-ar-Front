import { createEmployee } from "../api/employee.js";
import { renderEmployeeDashboard } from "./employeeDashboard.js";

export function renderCreateEmployeeForm() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="createEmployeeForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Agregar Empleado</h2>
                
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                    <input type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="dni" class="block text-gray-700 text-sm font-bold mb-2">DNI</label>
                    <input type="text" id="dni" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                    <input type="text" id="phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="birthDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                    <input type="date" id="birthDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="address" class="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                    <input type="text" id="street" placeholder="Calle" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                    <input type="text" id="number" placeholder="Número" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                    <input type="text" id="floor" placeholder="Piso" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                    <input type="text" id="apartment" placeholder="Departamento" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                    <input type="text" id="postalCode" placeholder="Código Postal" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                    <label for="country" class="block text-gray-700 text-sm font-bold mb-2">País</label>
                    <input type="text" id="country" value="Argentina" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" readonly>
                    <label for="state" class="block text-gray-700 text-sm font-bold mb-2">Provincia</label>
                    <select id="state" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                        <option value="">Seleccione una provincia</option>
                    </select>
                    <label for="city" class="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                    <select id="city" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                        <option value="">Seleccione una ciudad</option>
                    </select>
                    <input type="hidden" id="cityId">
                    <input type="text" id="observations" placeholder="Observaciones" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2">
                </div>
                <div class="mb-4">
                    <label for="startDate" class="block text-gray-700 text-sm font-bold mb-2">Fecha de Inicio</label>
                    <input type="date" id="startDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
        .getElementById("createEmployeeForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const newEmployee = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                dni: document.getElementById("dni").value,
                phone: document.getElementById("phone").value,
                birthDate: document.getElementById("birthDate").value,
                address: {
                    street: document.getElementById("street").value,
                    number: document.getElementById("number").value,
                    floor: document.getElementById("floor").value,
                    apartment: document.getElementById("apartment").value,
                    postalCode: document.getElementById("postalCode").value,
                    cityId: document.getElementById("cityId").value,
                    observations: document.getElementById("observations").value,
                },
                startDate: document.getElementById("startDate").value,
                endDate: null,
            };

            try {
                await createEmployee(newEmployee);
                alert("Empleado creado exitosamente");
                renderEmployeeDashboard(); // Recargar la lista de empleados
            } catch (error) {
                alert(`Error al crear el empleado: ${error.message}`);
            }
        });

    // Botón de cancelación
    document
        .getElementById("cancel")
        .addEventListener("click", renderEmployeeDashboard);
}
