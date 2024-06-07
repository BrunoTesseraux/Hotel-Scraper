
export const siteBScrapeOptions = {
    url: 'https://onepagebooking.com/includio?arrival=07.06.2024&departure=08.06.2024&lang=de&adults=2&rooms=1&children=0',
    selectors: {
        room: '.day ng-tns-c118-8', // Selector for the room
        price: '.room-lowest-price ng-tns-c127-17 ng-star-inserted', // Selector for the price
        steps: ['.icon-close-large'] // Selectors for steps to handle
    }
};

