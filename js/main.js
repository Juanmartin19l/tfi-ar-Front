import { renderLogin } from "./components/login.js";
import { renderAdminDashboard } from "./components/adminDashboard.js";

document.addEventListener("DOMContentLoaded", () => {
    // Si ya hay un JWT, redirigimos al Admin
    if (sessionStorage.getItem("jwt")) {
        renderAdminDashboard();
    } else {
        renderLogin();
    }
});
