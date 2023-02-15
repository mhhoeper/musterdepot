import React from "react";
import { getFromLS, safeToLS } from "./components/configdata/LocalStorage";
import "./SettingsPanel.css";

enum DepotDataState {
    unknown,
    loaded,
    unloaded,
    failed
}

export default class SettingsPanel extends React.Component<{}, {settings: any, depotdatastate: DepotDataState, statetext: string}> {
    defaultsettings = {provider: 'Random', updateInterval: 10000};

    constructor(props: {}) {
        super(props);

        this.depotDataInput = React.createRef();

        console.log(JSON.stringify(getFromLS("settings") || this.defaultsettings));

        this.state = {
            settings: JSON.parse(JSON.stringify(getFromLS("settings") || this.defaultsettings)),
            depotdatastate: DepotDataState.unknown,
            statetext: ""
        };
        console.log(JSON.stringify(this.state.settings));
    }

    private getSettingsStructure() {
        const thesettings = {
            provider: this.state.settings.provider,
            updateInterval: this.state.settings.updateInterval
        }
        return thesettings;
    }

    private storeSettings(settings: any) {
        safeToLS("settings", settings);
        this.setState({settings: settings});
    }

    onSettingsChange(event: React.FormEvent<HTMLSelectElement>) {
        var providerselection: string = event.currentTarget.value;
        console.log("Settings changed");

        var localsettings = this.getSettingsStructure();
        localsettings.provider = providerselection;

        this.storeSettings(localsettings);
    }

    onSettingsChangeUpdateInterval(event: React.FormEvent<HTMLInputElement>) {
        var updateIntervalSelection: number = event.currentTarget.valueAsNumber;
        console.log("UpdateInterval changed");

        var localsettings = this.getSettingsStructure();
        localsettings.updateInterval = updateIntervalSelection;

        this.storeSettings(localsettings);
    }

    private depotDataInput: any;
    onSettingsChangeDepotData(event: React.FormEvent<HTMLInputElement>) {
        const thisobj = this;
        fetch(this.depotDataInput.current.value)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            safeToLS("depot", myJson);
            thisobj.setState({depotdatastate: DepotDataState.loaded});
            thisobj.setState({statetext: "success"});
        })
        .catch((e) => {
            thisobj.setState({depotdatastate: DepotDataState.failed});
            thisobj.setState({statetext: (e as Error).message});
            console.log(e);
        });
    }

    onSettingsChangeDepotDataClear(event: React.FormEvent<HTMLInputElement>) {
        safeToLS("depot", null);
        this.setState({depotdatastate: DepotDataState.unloaded})
    }

    render() {
        const providerSelected = this.state.settings.provider === 'OnVista' ? "OnVista" : "Random";
        return (
            <div className="SettingsPanel">
                <p>Einstellungen</p>
                <div>
                    <label>
                        <div className="SettingsChecks">
                            <select 
                                id="provider" 
                                name="provider"
                                onChange={e => this.onSettingsChange(e)}
                                value={providerSelected}
                                disabled={true}>
                                <option value="Random" >Random</option>
                                <option value="OnVista" >OnVista</option>
                            </select>
                        </div>
                        <div className="SettingsChecks">
                            Streamauswahl<br/>Bitte vor Nutzung OnVista Lizenzbedingungen berücksichtigen. 
                            OnVista ist nur zur persönlichen Verwendung gedacht.
                        </div>
                    </label>
                    <br />
                    <label>
                        <span className="SettingsChecks">
                            <input 
                                type="number" 
                                id="updateInterval" 
                                defaultValue={this.state.settings.updateInterval}
                                onChange={e => this.onSettingsChangeUpdateInterval(e)} />
                        </span>
                        <span className="SettingsChecks">
                            Aktualisierungsintervall<br/>Zeit in ms zwischen den Abfragen der aktuellen Kurse
                        </span>
                    </label>
                    <br />
                    <label>
                        <span className="SettingsChecks">
                            <input
                                type="text"
                                id="depotdataurl"
                                ref={this.depotDataInput}
                                defaultValue="" />
                            <input
                                type="button"
                                id="depotdataload"
                                value="Daten laden" 
                                onClick={e => this.onSettingsChangeDepotData(e)}/>
                            <input
                                type="button"
                                id="depotdataclear"
                                value="Daten initialisieren"
                                onClick={e => this.onSettingsChangeDepotDataClear(e)} />
                            <p>{(this.state.depotdatastate === DepotDataState.failed) ? "Laden fehlgeschlagen"
                                : ( (this.state.depotdatastate === DepotDataState.loaded) ? "Daten geladen, Seite neu laden um Ergebnis zu sehen"
                                : ( (this.state.depotdatastate === DepotDataState.unloaded) ? "Daten gelöscht" : "" ))}</p>
                            <p>{this.state.statetext}</p>
                        </span>
                        <span className="SettingsChecks">
                            Quelle für Depotdaten zum Laden.<br />Die Antwort der Webabfrage muss das JSON Schema<br />
{`{entity: [depotdata]}`}<br />
{`depotdata := {`}<br />
&nbsp;&nbsp;&nbsp;&nbsp;{`Name: string`}<br />
&nbsp;&nbsp;&nbsp;&nbsp;{`ISIN: string`}<br />
&nbsp;&nbsp;&nbsp;&nbsp;{`onvistaType?: ["stocks"|"funds"]`}<br />
&nbsp;&nbsp;&nbsp;&nbsp;{`SeletedExchange: String`}<br />
&nbsp;&nbsp;&nbsp;&nbsp;{`Amount: number`}<br />
&nbsp;&nbsp;&nbsp;&nbsp;{`PriceBuy: number`}<br />
{`}`}<br />
erfüllen.
                        </span>
                    </label>
                </div>
            </div>
        );
    }
}