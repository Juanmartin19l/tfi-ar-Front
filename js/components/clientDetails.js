import {
    fetchClient,
    createInteraction,
    deleteInteraction,
} from "../api/client.js";
import { renderClientsDashboard } from "./clientsDashboard.js";

export async function renderClientDetails(clientId) {
    const app = document.getElementById("app");
    const client = await fetchClient(clientId);

    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <div class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Client Details</h2>
                <p><strong>Name:</strong> ${client.name}</p>
                <p><strong>Email:</strong> ${client.email}</p>
                <p><strong>Phone:</strong> ${client.phone}</p>
                <p><strong>Contact Name:</strong> ${client.contactName}</p>
                <p><strong>Address:</strong> ${client.address.street} ${
        client.address.number
    }, ${client.address.floor}, ${client.address.apartment}, ${
        client.address.city
    }, ${client.address.state}, ${client.address.country}, ${
        client.address.postalCode
    }</p>
                <p><strong>Address Observations:</strong> ${
                    client.address.observations
                }</p>
                <p><strong>Industry:</strong> ${client.industry}</p>
                <p><strong>Estimated Transactions Number:</strong> ${
                    client.estimatedTransactionsNumber
                }</p>
                <p><strong>Technologies Used:</strong> ${
                    client.technologiesUsed
                }</p>
                <p><strong>Remarks:</strong> ${client.remarks}</p>

                <h3 class="text-xl font-semibold mb-4">Interactions</h3>
                <div id="interactions-section">
                    ${client.interactions
                        .map(
                            (interaction) => `
                        <div class="interaction mb-4" id="interaction-${
                            interaction.id
                        }">
                            <p><strong>Date:</strong> ${new Date(
                                interaction.date
                            ).toLocaleString()}</p>
                            <p><strong>Details:</strong> ${
                                interaction.details
                            }</p>
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mb-4" data-id="${
                                interaction.id
                            }" id="delete-${interaction.id}">
                                Delete
                            </button>
                        </div>
                    `
                        )
                        .join("")}
                </div>
                <button id="addInteractionButton" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">Add Interaction</button>
                <button id="backToClientsButton" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">Back to Clients</button>
            </div>
        </div>
    `;

    client.interactions.forEach((interaction) => {
        document
            .getElementById(`delete-${interaction.id}`)
            .addEventListener("click", async () => {
                const confirmDelete = confirm(
                    "Are you sure you want to delete this interaction?"
                );
                if (confirmDelete) {
                    await deleteInteraction(clientId, interaction.id);
                    document
                        .getElementById(`interaction-${interaction.id}`)
                        .remove(); // Eliminar la interacción de la pantalla
                }
            });
    });

    document
        .getElementById("addInteractionButton")
        .addEventListener("click", () => {
            renderAddInteractionForm(clientId);
        });

    document
        .getElementById("backToClientsButton")
        .addEventListener("click", () => {
            renderClientsDashboard();
        });
}

function renderAddInteractionForm(clientId) {
    const app = document.getElementById("app");
    app.innerHTML = `
        <div class="w-full max-w-4xl mx-auto">
            <form id="addInteractionForm" class="bg-white shadow-md rounded-lg p-8">
                <h2 class="text-2xl font-bold mb-4">Add Interaction</h2>
                
                <div class="mb-4">
                    <label for="date" class="block text-gray-700 text-sm font-bold mb-2">Date</label>
                    <input type="datetime-local" id="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="mb-4">
                    <label for="details" class="block text-gray-700 text-sm font-bold mb-2">Details</label>
                    <textarea id="details" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>

                <div class="flex items-center justify-between">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add
                    </button>
                    <button id="cancel" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;

    document
        .getElementById("addInteractionForm")
        .addEventListener("submit", async (e) => {
            e.preventDefault();

            const interactionData = {
                date: document.getElementById("date").value,
                details: document.getElementById("details").value,
            };

            try {
                await createInteraction(clientId, interactionData);
                alert("Interaction added successfully");
                renderClientDetails(clientId);
            } catch (error) {
                alert(`Failed to add interaction: ${error.message}`);
            }
        });

    document.getElementById("cancel").addEventListener("click", () => {
        renderClientDetails(clientId);
    });
}
