import { createSupplier } from "../api/suppliers.js";
import { renderSuppliersDashboard } from "./suppliersDashboard.js";

export function renderCreateSupplierForm() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="createSupplierForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Crear Nuevo Proveedor</h2>
                
                <div class="mb-4">
                    <label for="cuit" class="block text-gray-700 text-sm font-bold mb-2">CUIT</label>
                    <input type="text" id="cuit" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
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
                
                <h3 class="text-xl font-semibold mb-4">Condiciones de Pago</h3>
                <div id="paymentConditionsContainer" class="mb-4">
                    <!-- Condiciones de pago se añadirán dinámicamente -->
                </div>
                <button id="addPaymentCondition" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Agregar Condición de Pago
                </button>

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
                    <label class="block text-gray-700 text-sm font-bold mb-2">Método de Pago</label>
                    <input type="text" class="paymentMethod shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Plazo de Pago (Días)</label>
                    <input type="number" class="paymentTermDays shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Moneda</label>
                    <input type="text" class="currency shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Banco</label>
                    <input type="text" class="bank shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Número de Cuenta</label>
                    <input type="text" class="accountNumber shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Observación</label>
                    <textarea class="observation shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <button class="removePaymentCondition bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mb-4" type="button">
                    Eliminar Condición de Pago
                </button>
            </div>
        `;
            paymentConditionsContainer.insertAdjacentHTML(
                "beforeend",
                conditionTemplate
            );

            // Agregar evento de eliminación al nuevo botón
            const removeButtons = document.querySelectorAll(
                ".removePaymentCondition"
            );
            removeButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    e.target.closest(".payment-condition").remove();
                });
            });
        });

    // Agregar evento de eliminación a los botones existentes
    const removeButtons = document.querySelectorAll(".removePaymentCondition");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.target.closest(".payment-condition").remove();
        });
    });

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
        .getElementById("createSupplierForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const paymentConditions = Array.from(
                paymentConditionsContainer.querySelectorAll(
                    ".payment-condition"
                )
            ).map((condition) => ({
                paymentMethod: condition.querySelector(".paymentMethod").value,
                paymentTermDays:
                    condition.querySelector(".paymentTermDays").value,
                currency: condition.querySelector(".currency").value,
                bank: condition.querySelector(".bank").value,
                accountNumber: condition.querySelector(".accountNumber").value,
                observation: condition.querySelector(".observation").value,
            }));

            // Verificar que todos los campos de condiciones de pago estén llenos, excepto observación
            const allPaymentConditionsFilled = paymentConditions.every(
                (condition) => {
                    return (
                        condition.paymentMethod &&
                        condition.paymentTermDays &&
                        condition.currency &&
                        condition.bank &&
                        condition.accountNumber
                    );
                }
            );

            if (!allPaymentConditionsFilled) {
                alert(
                    "Por favor, complete todos los campos de las condiciones de pago, excepto observación."
                );
                return;
            }

            const newSupplier = {
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
                await createSupplier(newSupplier);
                alert("Proveedor creado exitosamente");
                renderSuppliersDashboard(); // Volver al dashboard de proveedores
            } catch (error) {
                alert(`Error al crear el proveedor: ${error.message}`);
            }
        });

    document
        .getElementById("cancel")
        .addEventListener("click", renderSuppliersDashboard);
}
