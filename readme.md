#SongTree

SongTree is a music sharing app built with [Node.JS](http://nodejs.org/) using [SoundCloud](https://soundcloud.com/)'s widget API.

##Install SongTree

To install SongTree, download the zip, unzip it, and using the command line navigate to the folder and type in the following commands:

* To install all of the Node Modules, type in the command `npm install` inside the SongTree folder.
* To compile the HTML and CSS run the commant `gulp` inside the SongTree folder.
* To begin running the server type in the command `node server.js` inside the SongTree folder.

Once installed, navigate to http://localhost:3000/ to view the application.

##About

SongTree was built to allow users to share the music they love with other music lovers. The app allows a user to post any song off of SoundCloud along with a message onto an ever-growing feed of songs. This way users can be exposed to any kind of music from any user on the app at the same time as them. There is also a messaging window for users to chat with each other about the different songs that are being posted.

SongTree utilizes [Socket.io](http://socket.io/) to allow access to the real-time song list. It also uses [Parse](https://parse.com/)'s javascript API to create a database of users to store their usernames and twitter handles.

SongTree was built using the pre-processors [Jade](http://jade-lang.com/) and [Sass](http://sass-lang.com/) as well as the build tool [Gulp](http://gulpjs.com/).