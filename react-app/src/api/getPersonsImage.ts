export const getPersonsImage = async (id: number) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/person/${id}/images?api_key=${
                import.meta.env.VITE_API_KEY
            }`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching persons image:", error);
        throw error;
    }
};
