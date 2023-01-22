import { yfinancedata } from "yfinance-live";

export class RandomDataProvider {
    private tickers;
    private ondata;
    private intervalId
    constructor(tickers: {ticker: string, data: yfinancedata}[], ondata: (data: yfinancedata) => any) {
        this.tickers = tickers;
        this.ondata = ondata; 

        this.intervalId = this.createNewInterval();
    }
    createNewInterval() {
        var intervalId = setInterval(() => {
            clearInterval(this.intervalId);
            const forclass = this;
            this.tickers.forEach(function(item) {
                let newdata = item.data;
                newdata.price += Math.floor(Math.random() * 20) - 10;
                forclass.ondata(newdata);
            });
            this.intervalId = this.createNewInterval();
          }, 5000 + Math.floor(Math.random() * 3000));
        return intervalId;
    }    
    stop(): void {
        clearInterval(this.intervalId);
    }
}