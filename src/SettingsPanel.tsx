import React from "react";
import { getFromLS, safeToLS } from "./LocalStorage";
import "./SettingsPanel.css";

export default class SettingsPanel extends React.Component<{}, {settings: any}> {
    defaultsettings = {provider: 'Random', updateInterval: 10000};

    constructor(props: {}) {
        super(props);

        console.log(JSON.stringify(getFromLS("settings") || this.defaultsettings));

        this.state = {
            settings: JSON.parse(JSON.stringify(getFromLS("settings") || this.defaultsettings))
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
                        <div className="SettingsChecks">
                            <input 
                                type="number" 
                                id="updateInterval" 
                                defaultValue={this.state.settings.updateInterval}
                                onChange={e => this.onSettingsChangeUpdateInterval(e)} />
                        </div>
                        <div className="SettingsChecks">
                            Aktualisierungsintervall<br/>Zeit in ms zwischen den Abfragen der aktuellen Kurse
                        </div>
                    </label>
                </div>
            </div>
        );
    }
}