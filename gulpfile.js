import gulp from "gulp";
import {WebSocketServer} from 'ws'; 
import open from "open"

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', ws => {
    console.log('Client connected');
    ws.on('message', message => {
        console.log('Received: %s', message);
    });
});

gulp.task('serve', () => {
    // Watch for PHP file changes
    gulp.watch("**/*.php").on("change", () => {
        console.log('PHP file changed, sending reload signal...');
        
        // Send reload signal to WebSocket clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload'); 
            }
        });
    });

    // Automatically open 'hello-world.test' in the browser
    open('http://hello-world.test');  // This will open the browser to the specified URL
});

gulp.task('default', gulp.series('serve'));
