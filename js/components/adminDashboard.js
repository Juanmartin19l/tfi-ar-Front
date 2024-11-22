import { fetchEmployees } from "../api/employee.js";
import { fetchClients } from "../api/client.js";
import { fetchSuppliers } from "../api/suppliers.js";
import { renderEditEmployeeForm } from "./editEmployeeForm.js";
import { renderEditClientForm } from "./editClientForm.js";
import { renderEditSupplierForm } from "./editSupplierForm.js";
import { deleteEmployee } from "../api/employee.js";
import { deleteClient } from "../api/client.js";
import { deleteSupplier } from "../api/suppliers.js";
import { renderCreateEmployeeForm } from "./createEmployeeForm.js";
import { renderCreateClientForm } from "./createClientForm.js";
import { renderCreateSupplierForm } from "./createSupplierForm.js";
import { renderNavbar } from "./navbar.js";
import { renderEmployeeDetails } from "./employeeDetails.js";
import { renderClientDetails } from "./clientDetails.js";
import { renderSupplierDetails } from "./supplierDetails.js";

export async function renderAdminDashboard() {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener empleados, clientes y proveedores
    const [employees, clients, suppliers] = await Promise.all([
        fetchEmployees(),
        fetchClients(),
        fetchSuppliers(),
    ]);

    // Combinar todos los datos en una sola lista
    const combinedData = [
        ...employees.map((employee) => ({
            type: "Empleado",
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            id: employee.id,
        })),
        ...clients.map((client) => ({
            type: "Cliente",
            name: client.name,
            email: client.email,
            phone: client.phone,
            id: client.id,
        })),
        ...suppliers.map((supplier) => ({
            type: "Proveedor",
            name: supplier.name,
            email: supplier.email,
            phone: supplier.phone,
            id: supplier.id,
        })),
    ];

    // Agregar contenido del Dashboard después del navbar
    app.innerHTML += `
        <div class="w-full max-w-7xl mx-auto mt-8">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Panel de Administración</h2>
                <p class="mb-4">Bienvenido al sistema de gestión. Aquí puedes gestionar empleados, clientes y proveedores. Utiliza las herramientas disponibles para agregar, editar, eliminar y buscar de manera eficiente.</p>
                
                <h3 class="text-xl font-semibold mb-4">Lista de Entidades</h3>
                <div class="mb-4">
                    <input type="text" id="searchInput" placeholder="Buscar..." class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="flex justify-between mb-4">
                    <button id="addEmployeeButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Agregar Empleado
                    </button>
                    <button id="addClientButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Agregar Cliente
                    </button>
                    <button id="addSupplierButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Agregar Proveedor
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Tipo</th>
                                <th class="px-4 py-2 text-left">Nombre</th>
                                <th class="px-4 py-2 text-left">Correo Electrónico</th>
                                <th class="px-4 py-2 text-left">Teléfono</th>
                                <th class="px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="entityTableBody">
                            ${combinedData
                                .map(
                                    (entity) => `
                                <tr class="hover:bg-gray-50" id="entity-row-${entity.id}">
                                    <td class="border px-4 py-2">${entity.type}</td>
                                    <td class="border px-4 py-2">${entity.name}</td>
                                    <td class="border px-4 py-2">${entity.email}</td>
                                    <td class="border px-4 py-2">${entity.phone}</td>
                                    <td class="border px-4 py-2">
                                        <div class="flex space-x-2">
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${entity.id}" id="edit-${entity.id}">
                                                Editar
                                            </button>
                                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" data-id="${entity.id}" id="details-${entity.id}">
                                                Detalles
                                            </button>
                                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${entity.id}" id="delete-${entity.id}">
                                                Eliminar
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
    combinedData.forEach((entity) => {
        document
            .getElementById(`edit-${entity.id}`)
            .addEventListener("click", () => {
                if (entity.type === "Empleado") {
                    renderEditEmployeeForm(entity);
                } else if (entity.type === "Cliente") {
                    renderEditClientForm(entity);
                } else if (entity.type === "Proveedor") {
                    renderEditSupplierForm(entity);
                }
            });

        document
            .getElementById(`details-${entity.id}`)
            .addEventListener("click", async () => {
                if (entity.type === "Empleado") {
                    renderEmployeeDetails(entity.id); // Mostrar detalles del empleado
                } else if (entity.type === "Cliente") {
                    renderClientDetails(entity.id); // Mostrar detalles del cliente
                } else if (entity.type === "Proveedor") {
                    renderSupplierDetails(entity.id); // Mostrar detalles del proveedor
                }
            });

        document
            .getElementById(`delete-${entity.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `¿Estás seguro de que deseas eliminar a ${entity.name}?`
                );
                if (confirmDelete) {
                    if (entity.type === "Empleado") {
                        await deleteEmployee(entity.id);
                    } else if (entity.type === "Cliente") {
                        await deleteClient(entity.id);
                    } else if (entity.type === "Proveedor") {
                        await deleteSupplier(entity.id);
                    }
                    renderAdminDashboard(); // Recargar la lista de entidades
                }
            });
    });

    // Evento para abrir el formulario de creación de empleado
    document
        .getElementById("addEmployeeButton")
        .addEventListener("click", () => {
            renderCreateEmployeeForm();
        });

    // Evento para abrir el formulario de creación de cliente
    document.getElementById("addClientButton").addEventListener("click", () => {
        renderCreateClientForm();
    });

    // Evento para abrir el formulario de creación de proveedor
    document
        .getElementById("addSupplierButton")
        .addEventListener("click", () => {
            renderCreateSupplierForm();
        });

    // Evento para buscar entidades
    document.getElementById("searchInput").addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        combinedData.forEach((entity) => {
            const entityRow = document.getElementById(
                `entity-row-${entity.id}`
            );
            const entityName = entity.name.toLowerCase();
            const entityEmail = entity.email.toLowerCase();
            const entityPhone = entity.phone.toLowerCase();
            if (
                entityName.includes(searchTerm) ||
                entityEmail.includes(searchTerm) ||
                entityPhone.includes(searchTerm)
            ) {
                entityRow.style.display = "";
            } else {
                entityRow.style.display = "none";
            }
        });
    });
}
