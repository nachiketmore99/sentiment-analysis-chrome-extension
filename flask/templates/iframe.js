// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) 
{
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}

// Send a message to the parent
var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    window.parent.postMessage(msg, '*');
};

var results = document.getElementById('results'),
    messageButton = document.getElementById('message_button');

// Listen to messages from parent window
bindEvent(window, 'message', function (e) {
    results.value = e.data;
    // document.getElementById('urlform').submit();
});

// Send random message data on every button click
bindEvent(messageButton, 'click', function (e) {
    var random = Math.random();
    sendMessage('' + random);
});