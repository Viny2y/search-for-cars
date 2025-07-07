# search-for-cars
project carried out on 07/07/2025
To run the project correctly, follow the steps below:

First, install the dependencies with "npm install express cors" or just "npm install"

Then, open the terminal in the project folder and run the following command:

node index.js

This command will search for car ads on Mercado Livre, filtering by vehicles with up to 50 thousand reais and a maximum of 100 thousand km driven. All ads captured will be saved in the database and also displayed in the terminal.

Next, with the data already saved, run in the same terminal:

node api.js

This command starts the API that sends the data stored in the database to the front-end.

Finally, open the file called index.html in your browser. It is located inside the project folder and will display the ads collected visually, using the data returned by the API.
