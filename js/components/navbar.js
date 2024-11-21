export function renderNavbar() {
    const navbar = `
        <nav class="bg-blue-600 p-4 fixed top-0 left-0 w-full z-50">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <div class="text-white font-bold text-xl">
                    Admin Dashboard
                </div>
                <div class="flex space-x-4">
                    <a href="#employees" class="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Empleados
                    </a>
                    <a href="#suppliers" class="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Proveedores
                    </a>
                    <a href="#clients" class="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Clientes
                    </a>
                    <a href="#logout" class="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    `;
    return navbar;
}
