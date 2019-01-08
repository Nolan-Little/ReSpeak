# Welcome to ReSpeak
ReSpeak is a dictaphone and note taking application for recording whats on your mind in the moment and organizing it whenever you want. This app is simple and has broad usability, from a songwriter who wants to record a snippet of a song idea or demo, to a business owner who wants to record an hour long meeting to review later.

### New User
A first time user logging in will see the following dashboard. A default collection waiting to be filled! User's can start by adding a new note or by renaming their default collection.
![Alt text](../demo_gifs/firstNote.gif)

A user can also create new collections to organize their notes. These collections will populate the sidebar in the dashboard.


When a user wants to create a new note they are shown options to add a title and text content as well as to record audio. 


This application has full CRUD capability for both notes and collections including moving a note between collections. 

## Technologies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Reactstrap was utilized for styling and layout. Firebase acts as the persistent storage for audio files. The MediaStream and WebAudio APIs were utilized to handle the recording of audio and giving user feedback with a waveform visualizer.

## Test and Develop

NPM will be a necessity to get this project up and running on your own machine. After you have forked this repository and cloned it down locally run:
```
npm install 
```
in the root directory of the project. Once everything has installed and updated: 
```
npm start
```
You will also need json-server for the mock database. This can be installed via npm as well. 
From the root directory navigate to the directory titled api and execute the following to serve up the data for the app utilizing JSON server:
```
json-server -p 8088 -w database.json
```

The database has been popluated with some starter data with the following login credentials:

Email: nolan@email.com  
Password: test

You can also register a new user to get a blank canvas to work with if you wish to manipulate data. 

Please feel free to contact me regarding any questions or concerns.
