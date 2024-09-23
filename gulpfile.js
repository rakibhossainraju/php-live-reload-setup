const gulp = require('gulp');
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 3001});

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', message => {
      console.log('Received: %s', message);
    });
  });
  
gulp.task('serve', () => {
gulp.watch("**/*.php").on("change", () => {

    console.log('PHP file changed, sending reload signal...');

    wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
        client.send('reload'); 
    }
    });

});
});
  
gulp.task("default", gulp.series("serve"));
