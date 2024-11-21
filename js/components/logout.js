import { renderLogin } from "./login.js"; // Importar la función para renderizar el login

export function renderLogout() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-xs mx-auto">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 class="text-xl font-bold mb-4">Cerrar Sesión</h2>
                <p class="mb-4">¿Estás seguro de que deseas cerrar la sesión?</p>
                <div class="flex items-center justify-between">
                    <button id="confirmLogoutButton" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Cerrar Sesión
                    </button>
                    <button id="cancelLogoutButton" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Volver
                    </button>
                </div>
            </div>
        </div>
    `;

    const confirmLogoutButton = document.getElementById("confirmLogoutButton");
    const cancelLogoutButton = document.getElementById("cancelLogoutButton");

    confirmLogoutButton.addEventListener("click", () => {
        sessionStorage.removeItem("jwt"); // Eliminar el JWT del almacenamiento de sesión
        window.location.hash = "#login"; // Redirigir al login
        renderLogin(); // Renderizar la vista de login
    });

    cancelLogoutButton.addEventListener("click", () => {
        window.history.back(); // Volver a la página anterior
    });
}
