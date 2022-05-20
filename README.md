## Folder Structure
In the project directory, you will see two folders.
1. public 
2. routes

## public folder
This is where all our front end code will go
1. HTML
2. CSS
3. Front end Javascript

## routes folder
Our api layer where we will make requests to external apis
This is our own api where we send requests from our front end javascript to our server to be handled

## gitignore
This is used to tell git to not push certain files to GitHub (source control), like node_modules

## package.json
This is where we define our scripts and dependencies for the project

## server.js
This is where we define our server configurations such as the port number and where are routes live for the app

## This README
This is intended to help guide you to know the structure and how to run the app.

## Instructions on how to run the app

Since this has a server and we are using express you have to make sure you have all the dependecnies you need.
You can do this my doing `npm i`, i is short for install.
This will install all the npm packages listed in the dependecies in the `package.json` file.

IMPORTANT
When all dependencies are installed, create a `.env` file to store the api key
IMPORTANT

When the .env is there in the root project folder, same level as server.js you can proceed to starting the app.

`package.json` has a script defined: `npm start`, this will start the server.

MAKE SURE YOU ARE IN THE CORRECT FOLDER IN YOUR TERMNAL OR BASH
MAKE SURE YOU ARE IN THE CORRECT FOLDER IN YOUR TERMNAL OR BASH
MAKE SURE YOU ARE IN THE CORRECT FOLDER IN YOUR TERMNAL OR BASH
MAKE SURE YOU ARE IN THE CORRECT FOLDER IN YOUR TERMNAL OR BASH

After running `npm start` the server will start and when you see `App running on port 3000` the server is up and running

Now go to your browser and you can see the app by going to `http://localhost:3000/`