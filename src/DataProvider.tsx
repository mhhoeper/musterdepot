import { getFromLS, safeToLS } from "./components/configdata/LocalStorage";

const defaultsettings = {provider: 'Random', updateInterval: 10000};
var settings = getFromLS("settings") || defaultsettings;

if (settings.provider === undefined || settings.provider === null) {
    settings.provider = defaultsettings.provider;
}
if (settings.updateInterval === undefined || settings.updateInterval === null) {
    settings.updateInterval = defaultsettings.updateInterval;
}
safeToLS("settings", settings);




export interface IUpdateData {
    isin: string;
    lastPrice: number;
    market: string;
    additionalData?: any;
}

export interface IUpdateProcessor {
    (data: IUpdateData): void;
}

class BaseProvider {
    protected ondata: IUpdateProcessor[];
    constructor(ondata: IUpdateProcessor) {
        this.ondata = [ondata];
    }
    addListener(ondata: IUpdateProcessor) {
        this.ondata = this.ondata.concat(ondata);
    }
    stop(): void {};
}

export class RandomDataProvider extends BaseProvider {
    private isin;
    private price;
    private intervalId;
    constructor(isin: string, ondata: IUpdateProcessor) {
        super(ondata);
        this.isin = isin;
        this.price = 4000;

        this.queryInstrument();
        this.intervalId = setInterval(this.queryInstrument.bind(this), settings.updateInterval + Math.floor(Math.random() * 3000));
    }
    queryInstrument(): void {
        this.price += Math.floor(Math.random() * 20) - 10;
        this.ondata.forEach( (value) => {
            value({isin: this.isin, lastPrice: this.price, market: "Test"});
        });        
    }
    stop(): void {
        clearInterval(this.intervalId);
    }
}




export class OnVistaProvider extends BaseProvider {
    private isin: string;
    private onvistaType: string;
    private intervalId;
    private data: any;
    constructor(isin: string, onvistaType: string, ondata: IUpdateProcessor) {
        super(ondata);
        this.isin = isin;
        this.onvistaType = onvistaType;
        this.queryInstrument();
        this.intervalId = setInterval(this.queryInstrument.bind(this), settings.updateInterval+ 2000 + Math.floor(Math.random() * 4000) - 2000);
        this.ondata = [ondata];
    }
    stop(): void {
        clearInterval(this.intervalId);
    }
    queryInstrument() {
        // see https://github.com/cloasdata/pyOnvista
        // example 1: https://api.onvista.de/api/v1/stocks/ISIN:DE0007664039/snapshot
        // example 2: https://api.onvista.de/api/v1/instruments/STOCK/1552283/eod_history?idNotation=1552283&range=Y5&startDate=2022-10-01
        if(this.isin !== "") {
            fetch('https://api.onvista.de/api/v1/' + this.onvistaType + '/ISIN:' + this.isin + '/snapshot')
                .then( (response) => {
                    return response.json();
                })
                .then( (myJson) => {
                    this.data = myJson;
                    if(!('statusCode' in this.data) || this.data.statusCode !== 404 ) {
                        // Check if Tradegate quote is available
                        let bestquote = this.data.quote.last;
                        let market = this.data.quote.market.name;
                        try {
                            if(this.data.quoteList) {
                                this.data.quoteList.list.forEach(function (quote: any) {
                                    if (quote.market.codeExchange === "GAT") {
                                        bestquote = quote.last;
                                        market = quote.market.name;
                                    }
                                });
                            }
                        }
                        catch(e) {
                            console.log(e);
                            console.log(this.data);
                        }
                        this.ondata.forEach( (value) => {
                            value({isin: this.data.instrument.isin, lastPrice: bestquote, market: market, additionalData: this.data});
                        });
                    }
                });
        }
    }
}



interface IProviderData {
    isin: string;
    provider: BaseProvider;
}
var providerData: IProviderData[] = [];
export function getDataProvider(isin: string, onvistaType: string, ondata: (data: any) => any): BaseProvider {
    const field = providerData.find(x => x.isin === isin);
    if (field === undefined) {
        if (settings.provider === 'OnVista') {
            const onVistaProvider = new OnVistaProvider(isin, onvistaType, ondata);
            providerData = providerData.concat({isin: isin, provider: onVistaProvider});
            return onVistaProvider;
        }

        // in all other cases
        const randomProvider = new RandomDataProvider(isin, ondata);
        providerData = providerData.concat({isin: isin, provider: randomProvider});
        return randomProvider;
    } else {
        field.provider.addListener(ondata);
        return field.provider;
    }
}