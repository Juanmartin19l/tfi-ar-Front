import {
    fetchSuppliers,
    createSupplier,
    deleteSupplier,
} from "../api/suppliers.js"; // Importar funciones necesarias
//import { renderCreateSupplierForm } from "./createSupplierForm.js";
//import { renderEditSupplierForm } from "./editSupplierForm.js";
import { renderNavbar } from "./navbar.js"; // Importar el navbar

export async function renderSuppliersDashboard() {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener la lista de proveedores
    const suppliers = await fetchSuppliers();

    // Renderizar el contenido principal del dashboard
    app.innerHTML += `
        <div class="mt-16 w-full max-w-4xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Suppliers Dashboard</h2>
                <p class="mb-4">Manage suppliers for the business.</p>
                
                <h3 class="text-xl font-semibold mb-4">Supplier List</h3>
                <button id="addSupplierButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Add Supplier
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Name</th>
                                <th class="px-4 py-2 text-left">Email</th>
                                <th class="px-4 py-2 text-left">Phone</th>
                                <th class="px-4 py-2 text-left">Actions</th>
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
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${supplier.id}" id="edit-${supplier.id}">
                                            Edit
                                        </button>
                                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" data-id="${supplier.id}" id="delete-${supplier.id}">
                                            Delete
                                        </button>
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

    // Asignar eventos a los botones de edición y eliminación
    suppliers.forEach((supplier) => {
        // document
        //     .getElementById(`edit-${supplier.id}`)
        //     .addEventListener("click", () => {
        //         renderEditSupplierForm(supplier);
        //     });

        document
            .getElementById(`delete-${supplier.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `Are you sure you want to delete ${supplier.name}?`
                );
                if (confirmDelete) {
                    await deleteSupplier(supplier.id);
                    renderSuppliersDashboard(); // Recargar la lista de proveedores
                }
            });
    });

    // Evento para abrir el formulario de creación de proveedor
    document.getElementById("addSupplierButton");
    //        .addEventListener("click", renderCreateSupplierForm);
}
