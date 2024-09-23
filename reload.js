const socket = new WebSocket('ws://localhost:3001');

socket.addEventListener('message', function(event) {
if (event.data === 'reload') {
    location.reload();  // Trigger reload
}
});
console.log('TEH RELOAD FILE IS RUNNING');
