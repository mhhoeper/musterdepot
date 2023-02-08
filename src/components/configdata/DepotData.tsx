import filedepotdata from "./depotdata.json";
import { getFromLS } from "./LocalStorage";

export interface IDepotDataDepotPosition {
    Name: string;
    ISIN: string;
    WKN?: string;
    onvistaType: string;
    SelectedExchange: string;
    Amount: number;
    PriceBuy: number;
}

export interface IDepotDataWatchlistPosition {
    Name: string;
    ISIN: string;
    WKN?: string;
    onvistaType?: string;
    SelectedExchange: string;
}

export interface IDepotDataDepotEntity {
    Name: string;
    Positions: IDepotDataDepotPosition[];
}

export interface IDepotDataWatchlistEntity {
    Name: string;
    Positions: IDepotDataWatchlistPosition[];
}


export interface IDepotData {
    entities: (IDepotDataDepotEntity|IDepotDataWatchlistEntity)[];
}


export default class DepotDataManager {
    public depotdata: IDepotData;
    private static singleton: DepotDataManager;
/* Praparation for fetching depot data from a url.
   The problem is, that fetching this data takes some time and the GUI needs to
   be updated. This requires some more functionalities.
    private async fetchData(): Promise<IDepotData> {
        const response = await fetch('http://the.depot.source/getdepotdata');
        const json = await response.json();
        console.log(json);
        return json;
    }
    constructor() {
        var tempdata;
        this.fetchData().then((value) => {
            tempdata = value;
        })
        .catch((err) => {
            console.error(err);
        });
        this.depotdata = tempdata ?? {entities: []};
        console.log(this.depotdata);
    } */
    constructor() {
        const userDepotData = getFromLS('depot');
        if((userDepotData === undefined) || (userDepotData === null)) {
            this.depotdata = filedepotdata;
        } else {
            this.depotdata = userDepotData;
        }
    }
    public static getDepotDataManager(): DepotDataManager {
        if(!this.singleton) {
            this.singleton = new DepotDataManager();
        }
        return this.singleton;
    }

}
