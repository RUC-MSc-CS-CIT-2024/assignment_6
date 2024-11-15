const BASE_URL = "https://api.themoviedb.org/3/search/person";

export const getPersons = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}?query=spielberg&api_key=`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching persons:", error);
        throw error;
    }
};
