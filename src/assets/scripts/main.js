
var currentUserName;
var currentTwitter;
var socket = io();
var $ = window.$;
    

$('.wrapper').load('../../login');



// Create New Socket Connection using Socket.io


// Send a message to the server
// $('#postSong').click(function(){
//     console.log('test');
// 	var song = $('#songLink').val();
//     var message = $('#message').val();

//     var data = [song, message];
// 	socket.emit('song', data);
//     $('#songLink').val('');
//     $('#message').val('');
// });

// Recieve Update Event From The Server
socket.on('update', function(data){

    var songDiv = document.createElement('div');
    var userInfo = document.createElement('div');
    var iframeElement;
    var widget1 

    songDiv.className = 'songDiv';
    userInfo.className = 'userInfo';

    $(userInfo).append('<p>Submitted By: ' + window.currentUserName + '</p><a class="twitterLink" target="_blank" href="https://twitter.com/'+ window.currentTwitter +'">@' + window.currentTwitter + '</a>');
    $(songDiv).append(userInfo);
    $(songDiv).append('<p>' + data[1] + '</p>');

    iframeElement            = document.createElement('iframe');
    iframeElement.width      = '100%';
    iframeElement.height     = '150';
    iframeElement.scrolling  = 'no';
    iframeElement.src        = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'
    iframeElement.setAttribute('frameborder', 'no');
    

    widget1 = SC.Widget(iframeElement);
    widget1.load(data[0]);

	$(songDiv).append(iframeElement);
    $('.songs').prepend(songDiv);
})

socket.on('post', function(message){

    $('.chatSection').append('<p><span>' + message[1] + ': </span>' + message[0] + '</p>');

})


function signUpSubmit () {

    var username = $('#userNameSignUp').val();
    var password = $('#passwordSignUp').val();
    var twitter = $('#twitterSignUp').val();


    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("twitter", twitter);
     
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        window.currentUserName = username;
        window.currentTwitter = twitter;
        $('.wrapper').load('../../main');
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
}

function loginSubmit () {

    var username = $('#userNameLogin').val();
    var password = $('#passwordLogin').val();

    Parse.User.logIn(username, password, {
      success: function(user) {
        // Do stuff after successful login.
        window.currentUserName = username;
        window.currentTwitter = Parse.User.current().get('twitter');
        $('.wrapper').load('../../main');
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        //console.log(username + " " + password);
        console.log(error);
      }
    });

}

function toSignup () {
    $('.wrapper').load('../../signup');
}

function postSong () {

    console.log('test');
    var song = $('#songLink').val();
    var message = $('#message').val();

    var data = [song, message];
    socket.emit('song', data);
    $('#songLink').val('');
    $('#message').val('');

}

function sendMessage () {

    var message = [$('#chatBox').val(), window.currentUserName];
    $('#chatBox').val('');

    socket.emit('message', message);

}