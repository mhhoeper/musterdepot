import React from "react";

// see https://github.com/sidpagariya/yfinance-live
import YFinance, { yfinancedata } from "yfinance-live";
import depotdata from "./depotdata.json";
import "./DepotComponent.css"
import { RandomDataProvider } from "./DataProvider";
import { getFromLS } from "./LocalStorage";

export type depotprops = {
    children: string;
    keynr: number;
};

var settings = getFromLS("settings") || {yahoo: false};
var allowyahoo = settings.yahoo;

class TickerValue extends React.Component<{symbol: string}, {value: string}> {
  private yfin;

  constructor(props: {symbol: string}) {
    super(props);
    this.state = {value: ""};
    if (allowyahoo) {
      this.yfin = YFinance([this.props.symbol], this.onchange);
    } else {
      this.yfin = new RandomDataProvider([{ticker: this.props.symbol, data: new yfinancedata({id: this.props.symbol, price: 4000})}], this.onchange)
    }
  }
  onchange = (data: yfinancedata) => {
    if (data.id === this.props.symbol) {
      let value = data.price;
      let decimalPlaces = 2;
      this.setState((state) => ({
        value: Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces),
      }));
    } else {
      // keep last value
    }
  };

  render() {
    return (
      <div>{this.state.value}</div>
    );
  }
}


export default class DepotComponent extends React.Component<depotprops> {

  /* see https://www.youtube.com/watch?v=dYjdzpZv5yc */
  /* Prevent drag from https://stackoverflow.com/questions/63758425/react-ondragstart-doesnt-fire-in-material-ui-autocomplete-component */

  render() {
    console.error("render");
    return (
      <div className="depot-container">
        <div>Depot - {depotdata.Name}</div>
        <div
          className="depot-container2"
          onClick={(evt) => console.error("click")}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Kaufpreis</th>
                <th>Aktueller Preis</th>
                <th>Preis</th>
              </tr>
            </thead>
            <tbody>
              {depotdata.Positions.map((position) => {
                return (
                  <tr>
                    <td>{position.Name}</td>
                    <td>{position.Buy}</td>
                    <td><TickerValue symbol={position.Ticker.find(x=>x.Exchange === position.SelectedExchange)?.Symbol || ""} /></td>
                    <td>0</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

/**

import React from "react";
import "./styles.css";
import YFinance from "yfinance-live";

export default function App() {
  const [text, settext] = React.useState("none");

  function onchange(data) {
    
      console.log(data);
     
    settext(data.id.concat(data.price.toString()));
  }

  let yfinanceObj = YFinance(["GOOGL", "AAPL", "TSLA"], onchange);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <span>{text}</span>
    </div>
  );
}



yfinancedata {id: "GOOGL", price: 91.27999877929688, time: 1674074503000, exchange: "NMS", quoteType: 8…}

id: "GOOGL"

price: 91.27999877929688

time: 1674074503000

exchange: "NMS"

quoteType: 8

marketHours: 1

changePercent: -0.010956442914903164

dayVolume: 21782241

change: -0.01000213623046875

lastSize: 200

priceHint: 2

currency: ""

dayHigh: 0

dayLow: 0

shortName: ""

expireDate: 0

openPrice: 0

previousClose: 0

strikePrice: 0

underlyingSymbol: ""

openInterest: 0

optionsType: 0

miniOption: 0

bid: 0

bidSize: 0

ask: 0

askSize: 0

vol_24hr: 0

volAllCurrencies: 0

fromcurrency: ""

lastMarket: ""

circulatingSupply: 0

marketcap: 0

toJSON: ƒ toJSON() {}

<constructor>: "Function"

        name: "Function"

<constructor>: "yfinancedata"

name: "yfinancedata"


*/