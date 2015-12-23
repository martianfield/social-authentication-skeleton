# Social Authentication Skeleton App

A NodeJS skeleton application providing social authentication workflow.

## Installation

Download / Clone and run `npm install`.

Create a configuration file using `npm run config`. This will create a file named `config.created.js` inside the `config` folder. Rename this file to `config.js` to actually use it.


## Running the Server / Workflow

Start the server using `npm start`.

Open a browser using the URL given in the command line.

Select a authentication provider, and log in using it.

When authentication is successful, you will end up at `/login/callback?token=<sometoken>`.

Use the token provided in the query string and continue from there.


## Batteries Excluded

This is just a skeleton application. There are a few pieces missing you need to provide yourself.

- Implement User Crud Operations
- Store, manipulate and use the token