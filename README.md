# Table of Contents 📝
- [Talking to Carol 💬](#talking-to-carol-)
- [Configuring Carol 🔧](#configuring-carol-)
  * [General](#general)
  * [Interaction](#interaction)
- [Extending Carol's Responses ✍️](#extending-carols-responses-%EF%B8%8F)
- [Running Carol Locally 🚀](#running-carol-locally-)
- [Carol in the ☁️](#carol-in-the-%EF%B8%8F)

&nbsp;
# Talking to Carol 💬

Carol is built on top of `socket.io` by default, meaning you should use a client implementation of this to talk to it.

In JavaScript we can simply do something like:

```javascript
import io from 'socket.io-client';

const socket = io(
  'https://carol.chatcenter.net',
  { transports: ['websocket', 'polling', 'flashsocket'] }
);

socket.on('bot-message', (message) => {
  // do something
});
```

Carol is simple and cleanly written. This makes it easy to swap out `socket.io` for a general web socket or `REST` solution for example.

&nbsp;
# Configuring Carol 🔧
Carol has an easy-to-change constants file, called `constants.js` in the root of the server. Here's what you can change:

## General
*General configuration*
- `PORT`: where the Carol server should listen.

- `RESPONSES_FILE_PATH`: the file location of the dataset file Carol should source it's responses from. Expects a csv file with keys matching `RESPONSES_INPUT_KEY` and `RESPONSES_OUTPUT_KEY below.

- `RESPONSES_INPUT_KEY`: the name of the input (matched phrase) column in the csv file above

- `RESPONSES_OUTPUT_KEY`: the name of the output (message) column in the csv file above

- `USER_MESSAGE_EVENT`: the event string Carol listens to for user socket messages.

- `BOT_MESSAGE_EVENT`: the event string Carol will emit for it's reponse messages.

- `BOT_TYPING_EVENT`: the event string Carol will emit when typing a response. If `MAX_TYPING_S` is falsy, this event will never be emitted.

## Interaction
*Things to make Carol seem more real*

- `DEFAULT_RESPONSE`: the message Carol replies with if it finds no response matches.

- `RESPONSE_MATCH_THRESHOLD`: Carol response-matching tolerance. The lower this value, the looser the matches.

- `MIN_TYPING_S`: the minimum value Carol should 'type' for, in seconds.

- `MAX_TYPING_S`: the maximum value Carol should 'type' for, in seconds. Set this to 0 to skip typing events.

- `MIN_NATURAL_PAUSE_S`: the minimum pause Carol will take before emitting it's first event, in seconds.

- `MAX_NATURAL_PAUSE_S`: the maximum pause Carol will take before emitting it's first event, in seconds.


&nbsp;
# Extending Carol's Responses ✍️
Carol has a default dataset file called `response_dataset.csv`. This is easily extendable, or you can provide your own. If you want to bring your own file, simple change the value of the `RESPONSES_FILE_PATH` constant and make sure it's in the correct format (see constants above).

*Feel free to open a pull request to extend the default file.*

&nbsp;
# Running Carol Locally 🚀
```javascript
yarn

# Carol will be available through socket.io on the port defined through the PORT constant
yarn start
```
