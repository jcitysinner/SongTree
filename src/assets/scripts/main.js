
var currentUserName;
var currentTwitter;

// Wait for DOM to Load
jQuery(function($) {
    
    // Create New Socket Connection using Socket.io
    var socket = io();

    // Send a message to the server
    $('a').on('click', function(){
    	var song = $('#songLink').val();
        var message = $('#message').val();

        var data = [song, message];
    	socket.emit('song', data);
        $('#songLink').val('');
        $('#message').val('');
    });

    // Recieve Update Event From The Server
    socket.on('update', function(data){

        var songDiv = document.createElement('div');
        var userInfo = document.createElement('div');
        $(userInfo).append('<p>Submitted By: ' + window.currentUserName + '</p><p><a>@' + window.currentTwitter + '</a></p>');
        $(songDiv).append(userInfo);
        $(songDiv).append('<p>' + data[1] + '</p>');
        var iframeElement   = document.createElement('iframe');
        iframeElement.width = '100%';
        iframeElement.height = '200';
        iframeElement.scrolling = 'no';
        iframeElement.setAttribute('frameborder', 'no');
        iframeElement.src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'
        var widget1         = SC.Widget(iframeElement);
        widget1.load(data[0]);

    	$(songDiv).append(iframeElement);
        $('.songs').prepend(songDiv);
    })
    
});

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
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        //console.log(username + " " + password);
        console.log(error);
      }
    });

}