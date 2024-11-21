import { renderLogin } from "./components/login.js"; // Importamos el componente de login
import { renderNavbar } from "./components/navbar.js"; // Importamos el navbar
import { renderAdminDashboard } from "./components/adminDashboard.js";
import { renderSuppliersDashboard } from "./components/suppliersDashboard.js";
import { renderClientsDashboard } from "./components/clientsDashboard.js";
import { renderLogout } from "./components/logout.js"; // Importamos la nueva pantalla de logout

function handleRouting() {
    const jwt = sessionStorage.getItem("jwt"); // Verificar si el usuario está autenticado
    const hash = window.location.hash || "#employees"; // Por defecto, empleados

    // Si no hay JWT, redirigimos a la página de login
    if (!jwt && hash !== "#login") {
        renderLogin(); // Mostrar el login
        return;
    }

    // Renderizar el navbar
    const app = document.getElementById("app");
    app.innerHTML = renderNavbar();

    switch (hash) {
        case "#employees":
            renderAdminDashboard();
            break;
        case "#suppliers":
            renderSuppliersDashboard();
            break;
        case "#clients":
            renderClientsDashboard();
            break;
        case "#logout":
            renderLogout(); // Mostrar la pantalla de logout
            break;
        case "#login":
            renderLogin(); // Si el hash es #login, mostrar el login
            break;
        default:
            renderAdminDashboard(); // Si el hash no coincide, por defecto empleados
    }
}

document.addEventListener("DOMContentLoaded", () => {
    handleRouting(); // Cargar la pantalla inicial
});

window.addEventListener("hashchange", handleRouting); // Detectar cambios en el hash
