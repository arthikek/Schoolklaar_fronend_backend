'use server'
// Function to send the ratings form data to the backend
export default async function SendRatingsForm(payload: any, token: string) {
    if (!token) {
        throw new Error('Access token not found'); // Error if no token is provided
    }   
    try {
    
            // Making a POST request to the backend API to create a rating
            const response = await fetch("http://127.0.0.1:8000/Login/api/create_rating/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Set the JWT token as Authorization header
                },
                body: JSON.stringify(payload)  // Convert the payload to JSON and send
            });
        
            const data = await response.json(); // Parse the response data from JSON
            return data; // Return the parsed data
    }
    catch (error) {
        console.error("Error sending the ratings data:", error); // Log any errors that occur
        return false
    }
}