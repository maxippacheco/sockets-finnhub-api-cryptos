//HTML - SELECTORS
const btc_price = document.querySelector("#btc-price");
const btc_volume = document.querySelector("#btc-volume");

const eth_price = document.querySelector("#eth-price");
const eth_volume = document.querySelector("#eth-volume");

const doge_price = document.querySelector("#doge-price");
const doge_volume = document.querySelector("#doge-volume");

const xrp_price = document.querySelector("#xrp-price");
const xrp_volume = document.querySelector("#xrp-volume");

const ada_price = document.querySelector("#ada-price");
const ada_volume = document.querySelector("#ada-volume");

const dot_price = document.querySelector("#dot-price");
const dot_volume = document.querySelector("#dot-volume");


const socket = io();

const finnhub = new WebSocket("wss://ws.finnhub.io?token=c00d77v48v6qajv8cfag");

// Connection opened -> Subscribe
finnhub.addEventListener("open", function () {
  finnhub.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
  );
  finnhub.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:ETHUSDT" })
  );
  finnhub.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:DOGEUSDT" })
  );
  finnhub.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:XRPUSDT" })
  );
  finnhub.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:ADAUSDT" })
  );
  finnhub.send(
    JSON.stringify({ type: "subscribe", symbol: "BINANCE:DOTUSDT" })
  );
});

// Listening thes messages
finnhub.addEventListener("message", function ({ data }) {
  const arr = [];

  const datos = JSON.parse(data);

  arr.push(datos);

  arr.map(({ data }) => {
    const [objetos] = data;

    let { p, v, s } = objetos;

    switch (s) {
      case "BINANCE:BTCUSDT":
        btc_price.innerHTML = `$${p}`;
        btc_volume.innerHTML = v;
        break;

      case "BINANCE:ETHUSDT":
        eth_price.innerHTML = `$${p}`;
        eth_volume.innerHTML = v;
        break;

      case "BINANCE:DOGEUSDT":
        doge_price.innerHTML = `$${p}`;
        doge_volume.innerHTML = v;
        break;

      case "BINANCE:XRPUSDT":
        xrp_price.innerHTML = `$${p}`;
        xrp_volume.innerHTML = v;
        break;

      case "BINANCE:ADAUSDT":
        ada_price.innerHTML = `$${p}`;
        ada_volume.innerHTML = v;
        break;

      case "BINANCE:DOTUSDT":
        dot_price.innerHTML = `$${p}`;
        dot_volume.innerHTML = v;
        break;

      default:
        break;
    }
  });
});

// Unsubscribe
var unsubscribe = function (symbol) {
  finnhub.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
};
