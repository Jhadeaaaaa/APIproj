// Add event listener to the 'Get Holidays' button
// This function will run when the button is clicked
document.getElementById('getHolidaysBtn').addEventListener('click', async () => {
    // Get selected country and year from the input fields
    const country = document.getElementById('country').value;
    const year = document.getElementById('year').value;
    // Get the element where holidays will be displayed
    const holidaysList = document.getElementById('holidaysList');
    // Show loading message while fetching data
    holidaysList.innerHTML = 'Loading...';
    try {
        // Build the API URL for Nager.Date (CORS-enabled public holidays API)
        const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`;
        // Fetch data from the API
        const response = await fetch(url);
        // If the response is not OK, throw an error with details
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }
        // Parse the JSON data
        const data = await response.json();
        // If no holidays are found, show a message
        if (!data || data.length === 0) {
            holidaysList.innerHTML = 'No holidays found.';
            return;
        }
        // Build an HTML table to display the holidays
        let html = `<table><thead><tr><th>Date</th><th>Name</th><th>Local Name</th></tr></thead><tbody>`;
        data.forEach(holiday => {
            html += `<tr><td>${holiday.date}</td><td>${holiday.name}</td><td>${holiday.localName}</td></tr>`;
        });
        html += '</tbody></table>';
        // Insert the table into the page
        holidaysList.innerHTML = html;
    } catch (error) {
        // Show error message if something goes wrong
        holidaysList.innerHTML = `Failed to fetch holidays.<br><small>${error.message}</small>`;
    }
});
