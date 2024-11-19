import { authenticateUser } from "../api/auth.js";
import { renderAdminDashboard } from "../components/adminDashboard.js";

export function renderLogin() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-xs mx-auto">
            <form id="loginForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 class="text-xl font-bold mb-4">Login</h2>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    `;

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const success = await authenticateUser(email, password);
        if (success) {
            // Redirigir al panel de Admin o cargar vista de Admin
            renderAdminDashboard(); // Cargar la vista de Admin
        } else {
            alert("Invalid credentials");
        }
    });
}
