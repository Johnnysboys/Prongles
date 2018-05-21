import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import auth from '@feathersjs/authentication-client';

const socket = io(`http://localhost:3030`, {
  transports: ['websocket'],
  forceNew: true
});

const client = feathers();
client.configure(socketio(socket)).configure(
  auth({
    storage: window.localStorage
  })
);

export default client;
