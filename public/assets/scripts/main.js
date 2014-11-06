
// Wait for DOM to Load
jQuery(function($) {
    
    // Create New Socket Connection using Socket.io
    var socket = io();

    // Send a message to the server
    $('a').on('click', function(){
    	var text = $('input').val();
    	socket.emit('message', text);
    });

    // Recieve Update Event From The Server
    socket.on('update', function(msg){

        var iframeElement   = document.createElement('iframe');
        iframeElement.width = '100%';
        iframeElement.height = '200';
        iframeElement.scrolling = 'no';
        iframeElement.setAttribute('frameborder', 'no');
        iframeElement.src = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/'
        var widget1         = SC.Widget(iframeElement);
        widget1.load(msg);

    	$('.messages').prepend(iframeElement);
    })
    
});