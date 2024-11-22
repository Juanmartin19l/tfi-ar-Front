import { createClient } from "../api/client.js";
import { renderClientsDashboard } from "./clientsDashboard.js";

export function renderCreateClientForm() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="createClientForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Crear Nuevo Cliente</h2>
                
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre de la Empresa</label>
                    <input type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
                    <input type="email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                    <input type="tel" id="phone" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="contactName" class="block text-gray-700 text-sm font-bold mb-2">Nombre del Contacto</label>
                    <input type="text" id="contactName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="industry" class="block text-gray-700 text-sm font-bold mb-2">Industria</label>
                    <input type="text" id="industry" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="estimatedTransactionsNumber" class="block text-gray-700 text-sm font-bold mb-2">Número Estimado de Transacciones</label>
                    <input type="number" id="estimatedTransactionsNumber" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="technologiesUsed" class="block text-gray-700 text-sm font-bold mb-2">Tecnologías Utilizadas</label>
                    <input type="text" id="technologiesUsed" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="remarks" class="block text-gray-700 text-sm font-bold mb-2">Comentarios</label>
                    <textarea id="remarks" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <h3 class="text-xl font-semibold mb-4">Dirección</h3>

                <div class="mb-4">
                    <label for="street" class="block text-gray-700 text-sm font-bold mb-2">Calle</label>
                    <input type="text" id="street" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="number" class="block text-gray-700 text-sm font-bold mb-2">Número</label>
                    <input type="text" id="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="floor" class="block text-gray-700 text-sm font-bold mb-2">Piso</label>
                    <input type="text" id="floor" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="apartment" class="block text-gray-700 text-sm font-bold mb-2">Departamento</label>
                    <input type="text" id="apartment" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="postalCode" class="block text-gray-700 text-sm font-bold mb-2">Código Postal</label>
                    <input type="text" id="postalCode" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
                    <input type="hidden" id="cityId">
                </div>
                <div class="mb-4">
                    <label for="observations" class="block text-gray-700 text-sm font-bold mb-2">Observaciones</label>
                    <textarea id="observations" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>

                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Crear
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
        .getElementById("createClientForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const newClient = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                contactName: document.getElementById("contactName").value,
                industry: document.getElementById("industry").value,
                estimatedTransactionsNumber: document.getElementById(
                    "estimatedTransactionsNumber"
                ).value,
                technologiesUsed:
                    document.getElementById("technologiesUsed").value,
                remarks: document.getElementById("remarks").value,
                address: {
                    street: document.getElementById("street").value,
                    number: document.getElementById("number").value,
                    floor: document.getElementById("floor").value,
                    apartment: document.getElementById("apartment").value,
                    postalCode: document.getElementById("postalCode").value,
                    cityId: document.getElementById("cityId").value,
                    observations: document.getElementById("observations").value,
                },
            };

            try {
                await createClient(newClient);
                alert("Cliente creado exitosamente");
                renderClientsDashboard(); // Recargar la lista de clientes
            } catch (error) {
                alert(`Error al crear el cliente: ${error.message}`);
            }
        });

    document
        .getElementById("cancel")
        .addEventListener("click", renderClientsDashboard);
}
