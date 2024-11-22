import { authenticateUser } from "../api/auth.js";

export function renderLogin() {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Iniciar Sesión - DataXperts
                </h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form id="loginForm" class="space-y-6">
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                            </label>
                            <div class="mt-1">
                                <input id="email" name="email" type="email" autocomplete="email" required
                                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div class="mt-1">
                                <input id="password" name="password" type="password" autocomplete="current-password" required
                                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>

                    <div class="mt-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white text-gray-500">
                                    O
                                </span>
                            </div>
                        </div>

                        <div class="mt-6">
                            <a href="https://tfi-ar-nosotros.netlify.app" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                Acerca de Nosotros
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const success = await authenticateUser(email, password);
        if (success) {
            window.location.hash = "#admin";
        } else {
            showError("Credenciales inválidas");
        }
    });
}

function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className =
        "mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative";
    errorDiv.role = "alert";
    errorDiv.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${message}</span>
    `;

    const form = document.getElementById("loginForm");
    form.parentNode.insertBefore(errorDiv, form.nextSibling);

    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}
