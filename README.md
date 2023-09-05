This his how you install my app!

This guide will walk you through the installation process for my CRUD web application. This application allows you to manage a list of artists to look up various information about them.

Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

1. Web Server: You need a web server environment browser! Like Google Chrome, Firefox or Safari.

2. Database: A relational database system like MySQL, PostgreSQL, or SQLite to store data.

3. PHP: A server-side scripting language like PHP to handle server-side logic. Ensure it's installed and configured with your web server.

4. Git (Optional): Git is helpful for cloning the project repository if it's hosted on a version control platform like GitHub.

Installation Steps

1. Clone the Repository (if using Git): git clone <repository-url>

If you don't have Git, you can download the project as a ZIP file and extract it to your web server's document root.

2.  Database Setup:
    * Create a new database for the application.
    * Import the database schema included in the project (usually found in a .sql file in the project's database or sql directory).

3. Configuration:
    * Locate the configuration file (often named config.php or similar) in the project's root directory.
    * Update the database connection settings with your database credentials (e.g., host, username, password, database name).

4.  Web Server Configuration:
    * Ensure your web server is running.
    * Configure your web server to point to the project's root directory as the document root.
    * Restart your web server to apply the changes.

5.  Access the Application:
    * Open your web browser.
    * Enter the URL where the application is hosted (e.g., http://localhost3000).
    * You should now be able to access and use my CRUD app.

Usage

* Use the application to create, read, update, and delete items as needed.
* Refer to the project documentation or README for specific usage instructions, if available.


My first project for 2nd semester.

How to run my app:

To start the app you need to run the following commands:

1. Open up the terminal and write:
    
    cd .\artists-CRUD-app\

2. Install all the modules with:

    npm install

3. Start the app by typing:

    npm start

4. The app should be running!


