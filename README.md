Music Artist Fullstack Management Web Application

Overview

This comprehensive full-stack web application empowers users to manage and explore information about music artists. The application boasts a backend and a user-friendly frontend, harnessing technologies and coding principles. Smooth communication between the backend and frontend is achieved through a REST API.

I have also made a backup file for the artists.json if that should be needed.

Installation

Here's a simple guide to get started:

1 - Clone the project and open it in your preferred code editor.
2 - In your code editor's terminal, run the command npm install express cors to install the necessary dependencies.
3 - Navigate to the directory where the node_modules are installed.
4 - While inside the node_modules directory, run npm start in the terminal to start the application.
5 - Have fun!

6. Also make sure that to read the FURPS+ document, visit my github repository on by clicking on the following link below:

https://github.com/NikolajChristianMoeller/artists-CRUD-app

Licensing

This application is an open-source project, freely available for use by anyone to use.

Backend
Implementation:
The backend uses the power of Node.js and Express.js to deliver a REST API. Key features include:

A comprehensive set of routes with endpoints for various HTTP methods, including GET, POST, PUT/PATCH, and DELETE.
Successful implementation of CRUD (Create, Read, Update, Delete) operations for interacting with a JSON file that serves as the data source.
The ability for users to retrieve a complete list of artists and access specific artist details by providing a unique ID.

Data Structure:
The data is sourced from a JSON file, with artist objects containing, at a minimum, the following properties: name, birthdate, activeSince, genres, labels, website, image, and shortDescription.

Frontend
User Interface:
The frontend is meticulously crafted using HTML, CSS, and JavaScript. It offers users a seamless experience, with the following features:

Efficient CRUD operations for managing artist information.
Intuitive filtering and sorting based on user-selected parameters.
A convenient favorite artist feature, enabling users to mark and access their preferred artists.
A responsive and visually appealing user interface, designed using CSS Grid and related HTML elements.
Modular code organization, ensuring maintainability and scalability.