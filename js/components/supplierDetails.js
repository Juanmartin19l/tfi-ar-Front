import { fetchSupplier } from "../api/suppliers.js";
import { renderSuppliersDashboard } from "./suppliersDashboard.js"; // Para regresar al dashboard de proveedores

export async function renderSupplierDetails(supplierId) {
    const app = document.getElementById("app");

    // Obtener datos del proveedor
    const supplier = await fetchSupplier(supplierId);
    if (!supplier) {
        alert("No se pudieron cargar los detalles del proveedor.");
        return;
    }

    // Renderizar detalles del proveedor
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto mt-8">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Detalles del Proveedor</h2>
                <p><strong>Nombre:</strong> ${supplier.name}</p>
                <p><strong>CUIT:</strong> ${supplier.cuit}</p>
                <p><strong>Correo Electrónico:</strong> ${supplier.email}</p>
                <p><strong>Teléfono:</strong> ${supplier.phone}</p>
                <h3 class="text-xl font-semibold mt-4">Dirección</h3>
                <p><strong>Calle:</strong> ${supplier.address.street}</p>
                <p><strong>Número:</strong> ${supplier.address.number}</p>
                <p><strong>Piso:</strong> ${supplier.address.floor || "N/A"}</p>
                <p><strong>Departamento:</strong> ${
                    supplier.address.apartment || "N/A"
                }</p>
                <p><strong>Código Postal:</strong> ${
                    supplier.address.postalCode
                }</p>
                <p><strong>Ciudad:</strong> ${supplier.address.city}</p>
                <p><strong>Estado:</strong> ${supplier.address.state}</p>
                <p><strong>País:</strong> ${supplier.address.country}</p>
                <p><strong>Observaciones:</strong> ${
                    supplier.address.observations || "N/A"
                }</p>
                <h3 class="text-xl font-semibold mt-4">Condiciones de Pago</h3>
                ${supplier.paymentConditions
                    .map(
                        (condition) => `
                    <div class="mb-4">
                        <p><strong>Método de Pago:</strong> ${condition.paymentMethod}</p>
                        <p><strong>Días de Plazo de Pago:</strong> ${condition.paymentTermDays}</p>
                        <p><strong>Moneda:</strong> ${condition.currency}</p>
                        <p><strong>Banco:</strong> ${condition.bank}</p>
                        <p><strong>Número de Cuenta:</strong> ${condition.accountNumber}</p>
                        <p><strong>Observación:</strong> ${condition.observation}</p>
                    </div>
                `
                    )
                    .join("")}
                <button id="backToDashboard" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Volver al Dashboard
                </button>
            </div>
        </div>
    `;

    // Regresar al dashboard de proveedores
    document
        .getElementById("backToDashboard")
        .addEventListener("click", renderSuppliersDashboard);
}
