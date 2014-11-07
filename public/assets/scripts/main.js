

// Wait for DOM to Load
jQuery(function($) {

    $('.wrapper').load('../../login.html');
    
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
        $(songDiv).prepend('<p>' + data[1] + '</p>');
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