import { getFromLS } from "./LocalStorage";

var settings = getFromLS("settings") || {provider: 'Random', updateInterval: 10000};


export interface IUpdateData {
    isin: string;
    lastPrice: number;
    additionalData?: any;
}

interface IUpdateProcessor {
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

        this.intervalId = this.createNewInterval();
    }
    createNewInterval() {
        var intervalId = setInterval(() => {
            clearInterval(this.intervalId);

            this.price += Math.floor(Math.random() * 20) - 10;
            const thisobj = this;
            this.ondata.forEach(function (value) {
                value({isin: thisobj.isin, lastPrice: thisobj.price});
            });
            this.intervalId = this.createNewInterval();
          }, settings.updateInterval + Math.floor(Math.random() * 3000));
        return intervalId;
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
        this.intervalId = setInterval( () => {
            this.queryInstrument();
        }, settings.updateInterval);
        this.ondata = [ondata];
    }
    stop(): void {
        clearInterval(this.intervalId);
    }
    queryInstrument() {
        // see https://github.com/cloasdata/pyOnvista
        // example 1: https://api.onvista.de/api/v1/stocks/ISIN:DE0007664039/snapshot
        // example 2: https://api.onvista.de/api/v1/instruments/STOCK/1552283/eod_history?idNotation=1552283&range=Y5&startDate=2022-10-01
        let useobj = this;
        if(this.isin !== "") {
            fetch('https://api.onvista.de/api/v1/' + this.onvistaType + '/ISIN:' + this.isin + '/snapshot')
                .then(function(response) {
                    return response.json();
                })
                .then(function(myJson) {
                    useobj.data = myJson;
                    if(!('statusCode' in useobj.data) || useobj.data.statusCode !== 404 ) {
                        useobj.ondata.forEach(function (value) {
                            value({isin: useobj.data.instrument.isin, lastPrice: useobj.data.quote.last, additionalData: useobj.data});
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