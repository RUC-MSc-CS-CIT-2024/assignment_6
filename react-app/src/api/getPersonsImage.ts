export const getPersonsImage = async (id: number) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL_IMAGE}/${id}/images`,
            {
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_API_BEARER_TOKEN}`
                }
            }
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
