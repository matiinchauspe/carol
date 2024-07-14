import { createServer } from 'node:http'
import path from 'node:path';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io'

// Utils
import { getRandomDelay, getBotResponse, parseResponseDataset } from './utils/index.js';

// Constants
import {
  PORT,
  RESPONSES_FILE_PATH,
  USER_MESSAGE_EVENT,
  BOT_MESSAGE_EVENT,
  BOT_TYPING_EVENT,
  MIN_TYPING_S,
  MAX_TYPING_S,
  MIN_NATURAL_PAUSE_S,
  MAX_NATURAL_PAUSE_S,
} from './constants.js';

import router from './routes/index.js';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: {}
  }
})

let botResponses = null;

app.use('/api', router);
app.use(cors({ origin: '*' }));
app.use(express.static(path.dirname + '/public'));

io.on('connection', (socket) => {
  const loggedUser = socket.handshake.auth.userId;

  console.log(`${loggedUser} connected`)
  
  socket.broadcast.emit('user-connected', { userId: loggedUser });
  
  // join to the sender room
  socket.join(loggedUser);

  // disconnect
  socket.on('disconnect', () => {
    console.log(`${loggedUser} disconnected`)
    socket.broadcast.emit('user-disconnected', { userId: loggedUser });
  })
  
  // Private messages between users
  socket.on('user-private-message', ({ message, sender, receiver }) => {
    socket.join(sender);
    
    io.in(receiver).emit('user-private-message', { message, sender, receiver });
  })


  socket.on(USER_MESSAGE_EVENT, ({ message, sender }) => {
    // send the message to the sender room
    socket.broadcast.to(sender).emit(
      USER_MESSAGE_EVENT,
      message,
    )

    setTimeout(() => {
      // Don't emit a typing event if we've set typing seconds to 0
      if (MAX_TYPING_S) { io.in(loggedUser).emit(BOT_TYPING_EVENT); }

      setTimeout(() => {
        io.in(loggedUser).emit(
          BOT_MESSAGE_EVENT,
          getBotResponse(message, botResponses),
        );
      }, getRandomDelay(MIN_TYPING_S, MAX_TYPING_S));

    }, getRandomDelay(MIN_NATURAL_PAUSE_S, MAX_NATURAL_PAUSE_S));
  });
});

parseResponseDataset(RESPONSES_FILE_PATH).then(parsedResponses => {
  botResponses = parsedResponses;
});

server.listen(PORT, () => {
  console.log(`Carol server listening on *:${PORT} 🚀`);
});
