const API_BASE_URL = "http://localhost:8080/api/v1";

export async function authenticateUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("jwt", data.accessToken);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return false;
    }
}
