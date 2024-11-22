import { fetchSuppliers, deleteSupplier } from "../api/suppliers.js";
import { renderCreateSupplierForm } from "./createSupplierForm.js";
import { renderEditSupplierForm } from "./editSupplierForm.js";
import { renderNavbar } from "./navbar.js";
import { renderPurchasesDashboard } from "./purchasesDashboard.js"; // Importar el dashboard de compras
import { renderSupplierDetails } from "./supplierDetails.js"; // Importar la función para renderizar los detalles del proveedor

export async function renderSuppliersDashboard() {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener la lista de proveedores
    const suppliers = await fetchSuppliers();

    // Renderizar el contenido principal
    app.innerHTML += `
        <div class="mt-16 w-full max-w-6xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Panel de Proveedores</h2>
                <p class="mb-4">Gestiona los proveedores del negocio.</p>
                
                <h3 class="text-xl font-semibold mb-4">Lista de Proveedores</h3>
                <button id="addSupplierButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Agregar Proveedor
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Nombre</th>
                                <th class="px-4 py-2 text-left">Correo Electrónico</th>
                                <th class="px-4 py-2 text-left">Teléfono</th>
                                <th class="px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${suppliers
                                .map(
                                    (supplier) => `
                                <tr class="hover:bg-gray-50">
                                    <td class="border px-4 py-2">${supplier.name}</td>
                                    <td class="border px-4 py-2">${supplier.email}</td>
                                    <td class="border px-4 py-2">${supplier.phone}</td>
                                    <td class="border px-4 py-2">
                                        <div class="flex space-x-2">
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${supplier.id}" id="edit-${supplier.id}">
                                                Editar
                                            </button>
                                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" data-id="${supplier.id}" id="details-${supplier.id}">
                                                Mostrar
                                            </button>
                                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${supplier.id}" id="delete-${supplier.id}">
                                                Eliminar
                                            </button>
                                            <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded" data-id="${supplier.id}" id="view-purchases-${supplier.id}">
                                                Compras
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `
                                )
                                .join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Asignar eventos a los botones
    suppliers.forEach((supplier) => {
        // Botón para ver las compras del proveedor
        document
            .getElementById(`view-purchases-${supplier.id}`)
            .addEventListener("click", () => {
                renderPurchasesDashboard(supplier.id); // Redirigir al dashboard de compras
            });

        // Botón para editar proveedor
        document
            .getElementById(`edit-${supplier.id}`)
            .addEventListener("click", () => {
                renderEditSupplierForm(supplier);
            });

        // Botón para mostrar detalles del proveedor
        document
            .getElementById(`details-${supplier.id}`)
            .addEventListener("click", () => {
                renderSupplierDetails(supplier.id);
            });

        // Botón para eliminar proveedor
        document
            .getElementById(`delete-${supplier.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `¿Estás seguro de que deseas eliminar a ${supplier.name}?`
                );
                if (confirmDelete) {
                    await deleteSupplier(supplier.id);
                    renderSuppliersDashboard(); // Recargar la lista
                }
            });
    });

    // Evento para abrir el formulario de creación
    document
        .getElementById("addSupplierButton")
        .addEventListener("click", renderCreateSupplierForm);
}
