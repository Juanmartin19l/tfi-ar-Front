import {
    fetchSales,
    createSale,
    updateSale,
    deleteSale,
} from "../api/sales.js";
import { renderCreateSaleForm } from "./createSaleForm.js";
import { renderEditSaleForm } from "./editSaleForm.js";
import { renderNavbar } from "./navbar.js";
import { renderClientsDashboard } from "./clientsDashboard.js"; // Importar la función para renderizar el dashboard de clientes
import { fetchClient } from "../api/client.js"; // Importar la función para obtener los detalles del cliente

export async function renderSalesDashboard(clientId) {
    const app = document.getElementById("app");

    // Renderizar el navbar
    app.innerHTML = renderNavbar();

    // Obtener las ventas del cliente
    const sales = await fetchSales(clientId);

    // Obtener los detalles del cliente
    const client = await fetchClient(clientId);

    // Renderizar el contenido principal del dashboard de ventas
    app.innerHTML += `
        <div class="mt-16 w-full max-w-7xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Panel de Ventas</h2>
                <p class="mb-4">Gestionar ventas para el cliente ${
                    client.name
                }.</p>
                
                <h3 class="text-xl font-semibold mb-4">Lista de Ventas</h3>
                <button id="addSaleButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Agregar Venta
                </button>
                <button id="backToClientsButton" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">
                    Volver a Clientes
                </button>
                <div class="overflow-x-auto">
                    <table class="table-auto w-full bg-gray-100 rounded-lg shadow-md">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="px-4 py-2 text-left">Fecha de Venta</th>
                                <th class="px-4 py-2 text-left">Observación</th>
                                <th class="px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sales
                                .map(
                                    (sale) => `
                                <tr class="hover:bg-gray-50">
                                    <td class="border px-4 py-2">${new Date(
                                        sale.saleDate
                                    ).toLocaleString()}</td>
                                    <td class="border px-4 py-2">${
                                        sale.observation || "N/A"
                                    }</td>
                                    <td class="border px-4 py-2">
                                        <div class="flex space-x-2">
                                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" data-id="${
                                                sale.id
                                            }" id="edit-${sale.id}">
                                                Editar
                                            </button>
                                            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded" data-id="${
                                                sale.id
                                            }" id="invoice-${sale.id}">
                                                Generar Factura
                                            </button>
                                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" data-id="${
                                                sale.id
                                            }" id="delete-${sale.id}">
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

    // Asignar eventos a los botones de edición, eliminación y generación de factura
    sales.forEach((sale) => {
        document
            .getElementById(`edit-${sale.id}`)
            .addEventListener("click", () => {
                renderEditSaleForm(clientId, sale);
            });

        document
            .getElementById(`delete-${sale.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    `¿Estás seguro de que deseas eliminar esta venta?`
                );
                if (confirmDelete) {
                    await deleteSale(clientId, sale.id);
                    renderSalesDashboard(clientId); // Recargar la lista de ventas
                }
            });

        document
            .getElementById(`invoice-${sale.id}`)
            .addEventListener("click", () => {
                generateInvoicePDF(client, sale);
            });
    });

    // Evento para abrir el formulario de creación de venta
    document.getElementById("addSaleButton").addEventListener("click", () => {
        renderCreateSaleForm(clientId);
    });

    // Evento para volver al dashboard de clientes
    document
        .getElementById("backToClientsButton")
        .addEventListener("click", () => {
            renderClientsDashboard();
        });
}

// Función para generar el PDF de la factura
function generateInvoicePDF(client, sale) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Establecer colores y fuentes
    doc.setTextColor(0, 0, 0); // Negro
    doc.setFontSize(18);
    doc.text("DataExperts", 180, 22, { align: "right" });

    doc.setFontSize(12);
    doc.text(`Cliente: ${client.name}`, 14, 32);
    doc.text(
        `Fecha de Venta: ${new Date(sale.saleDate).toLocaleString()}`,
        14,
        42
    );
    doc.text(`Observación: ${sale.observation || "N/A"}`, 14, 52);

    doc.text("Detalles de la Factura:", 14, 62);
    doc.text(`Fecha de Emisión: ${sale.invoice.issueDate}`, 14, 72);
    doc.text(`Fecha de Vencimiento: ${sale.invoice.dueDate}`, 14, 82);
    doc.text(`Método de Pago: ${sale.invoice.paymentMethod}`, 14, 92);
    doc.text(
        `Observación de la Factura: ${sale.invoice.observation || "N/A"}`,
        14,
        102
    );

    doc.text("Detalles del Producto:", 14, 122);

    const tableColumn = [
        "Producto",
        "Cantidad",
        "Costo Unitario",
        "Costo Total",
    ];
    const tableRows = [];

    let total = 0;
    sale.invoice.details.forEach((detail) => {
        const productData = [
            detail.description,
            detail.quantity.toString(),
            `$${detail.unitPrice.toFixed(2)}`,
            `$${(detail.quantity * detail.unitPrice).toFixed(2)}`,
        ];
        tableRows.push(productData);
        total += detail.quantity * detail.unitPrice;
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 132,
        theme: "grid",
        headStyles: {
            fillColor: [169, 169, 169], // Gris
            textColor: [0, 0, 0], // Negro
        },
        bodyStyles: {
            fillColor: [255, 255, 255], // Blanco
            textColor: [0, 0, 0], // Negro
        },
    });

    doc.text(
        `Total: $${total.toFixed(2)}`,
        14,
        doc.autoTable.previous.finalY + 10
    );

    doc.save(`factura_${sale.id}.pdf`);
}
