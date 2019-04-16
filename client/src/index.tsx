import React, { useState, useEffect } from "react";
import format from "date-fns/format";
import { SubscriptionClient, ClientOptions } from "subscriptions-transport-ws";
import ReactDom from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer, { AppState } from "./reducer";
import { Provider } from "react-redux";
import { WEBSOCKET_URL } from "./config";

export default function Time() {
  const [time, updateTime] = useState(null);
  useEffect(() => {
    const client = new SubscriptionClient(WEBSOCKET_URL, {
      reconnect: true
    });

    const query = `
        subscription Time {
            time
        }
    `;
    client.request({ query }).subscribe({
      next: (res: GraphQLResponse) => {
        updateTime(res.data.time);
      }
    });

    return client.close;
  }, []);

  return (
    <div>
      <h3>What is the time?</h3>
      <h3>{time ? format(time, "H:mm:ss A") : "?"}</h3>
    </div>
  );
}

const rootElement: HTMLDivElement = document.querySelector("#root");
ReactDom.render(<Time />, rootElement);
