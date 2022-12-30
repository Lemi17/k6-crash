import ws from "k6/ws";
import http from "k6/http";
import exec from "k6/execution";
import encoding from "k6/encoding";

const server = "rocket.aslotcasino.cc";
const urlServer = `https://${server}/api`;

export const options = {
  vus: 10,
  duration: "24h",
  rps: 1,
  iterations: 10,
};

const generatedTokensArray = [
  "YkVFU2N3R3VnazlZVnpJaEd4cnJYTUg1NXo1Z3UxWUpmckE3N3o4bVdwK1VwcVVOTEZlU1czTnh3TlN4Ym5aYw==",
  "MG9WWVVOMjVpTlo4cFhPUnVUbDdYSnVZQ1dmRjVLRlFiNEZYT2VwUXNJZmt3SGlTZW5mZm4xbDMvQlFETjBEUw==",
  "NTdVeG5oU0dMU3MrazQ3UWJoN2txYTZzd0ZzdkEySGZETVRZVTFaZ3Z6NFdudCt2Mkt5eENYSVk5Q0xHT0IwdA==",
  "WmhBL2dGbjJWRXlldUg5ckFueFBiVHZzNW5BeC9BWHIrUkhtekt3OTMwRm9vS0VSd2J1ZXhtR1Y2Zm5KbE9XLw==",
  "QWd2dWpwTThuc0hxQ2hvdEdJOFZDKzJIOEJmUlplbXVxUHF6WVNuZHlQQmJQZ3NVb1NSdTNZVFhwYmlFM1BUWg==",
  "Q2lOeTVIV0VFaDkwNTNJbVF2OEZvM04zVEUyRCtxeEFTL3crbzdOUkY1SFoyam1rV0dnaW9PQzR0Y1VZRWxXTw==",
  "SExnZEpqNEdnUHlHVkFOQVFqN2MwR2E1MzNkZjVyR05JaG1vSVFjd08vMzBUNGQyYVVqdVRXWjRqZzhQMmhyTA==",
  "d2JvdWlKNHFrVHVJWk4xV0lZRnZ5dHN5UlpsSnAwZUJkTm9zWUNsYnpFSUpmay9TOXRTcndkc1gzVUxiYjQwWg==",
  "LytrbVA1QnZ6QWlLQ0Vxc1FHZ2tsSUNVanpVYm1sanVHcGVyeHFwZzdJUHdtSlQ1NGplcHVUQmRNaDZaWHpFcA==",
  "RVlFSUNBU1pVOEp3KzdXM3hta1BSU1NENWVLTGtHWnB1NEZRcVhNTEpZTVZBdGNYZ09HUTdCbDhnOVFkNjVKcg==",
];

let FlyingRound = 0;
let minPayIn = 0.4;
let maxPayIn = 4;

export default function (a) {
  const slotsToken = generatedTokensArray[exec.vu.idInTest - 1];
  const resAuth = http.post(
    urlServer + "/Authenticate/Tokens" + "?slotsToken=" + slotsToken,
    null
  );

  const accessToken = JSON.parse(resAuth.body).accessToken;

  const url = "wss://" + server + "/ws?token=" + accessToken;
  const params = { tags: { my_tag: "hello" } };

  const res = ws.connect(url, params, function (socket) {
    socket.on("open", () => {
      socket.send(`test`);
    });
    socket.on("message", (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.Type === "STATE") {
        if (FlyingRound !== parsedData.Payload.FlyingRound) {
          if (FlyingRound !== 0) {
            FlyingRound = parsedData.Payload.FlyingRound;

            console.log("Nova runda");
            if (Math.random() > 0.5) {
              const multiplier = Math.random() * 8.7 + 1.3;
              const payIn = (
                Math.random() * (maxPayIn - minPayIn) +
                minPayIn
              ).toFixed(1);
              socket.setTimeout(() => {
                console.log("BETUJEM");
                socket.send(
                  `{"type": "BET", "payload": {"payIn":${payIn},"multiplier":${multiplier}}}`
                );
              }, Math.random() * 8000);
            }
          } else {
            FlyingRound = parsedData.Payload.FlyingRound;
          }
        }
      }
    });
    socket.on("close", () => console.log("disconnected"));
  });
}
