
const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Monate sind nullbasiert
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
// Funktion zum Generieren der URL mit aktuellen Daten
export const generateUrl = (): string => {
    const currentDate = new Date();
    const arrivalDate = formatDate(currentDate);

    const departureDate = new Date();
    departureDate.setDate(currentDate.getDate() + 1); // Abreisedatum einen Tag später
    const formattedDepartureDate = formatDate(departureDate);

    return `https://onepagebooking.com/includio?arrival=${arrivalDate}&departure=${formattedDepartureDate}&lang=de&adults=1&rooms=1&children=0`;
};

