# subscription-transport-ws-repro
This repo is intended to reproduce the accumulation of websocket instances for every reconnection perfromed buy the `apollo/subscriptions-transport-ws` package.

To reproduce:
Start the server: 
- Open a terminal window and type: `cd server; yarn install && yarn start`

Start the client:
- Open a second terminal window and type: `cd client; yarn install && yarn start`

View the ws connections:
- Open Chrome DevTools, open the network tab, filter to WS only observe the `subscriptions` WS connection.

Kill the server:
- Navigate to the Server's terminal window and Ctrl+C the process, observe the WS connnections failing on retries and backing off.

Revive the server:
- Navigate to the Server's terminal window and type: `yarn start`, observe the websocket connection successfully reconnect.

Observe that there are now 2 live websocket connections in the Network tab.

Rinse and repeat and observe the number of live WS connections grow.

These are not receiving messages but don't appear to be terminated either.

Are these WS not getting GC'd?
Are these WS taking up resource?

🤷‍♂




 
