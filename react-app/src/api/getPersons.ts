export const getPersons = async (name: string, page: number) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/search/person?query=${name}&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`
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
