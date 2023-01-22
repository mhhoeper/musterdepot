import React from "react";
import { getFromLS, safeToLS } from "./LocalStorage";
import "./SettingsPanel.css";

export default class SettingsPanel extends React.Component<{}, {settings: any}> {
    defaultsettings = {samplesetting: 0};

    constructor(props: {}) {
        super(props);

        console.log(JSON.stringify(getFromLS("settings") || this.defaultsettings));

        this.state = {
            settings: JSON.parse(JSON.stringify(getFromLS("settings") || this.defaultsettings))
        };
        console.log(JSON.stringify(this.state.settings));
    }

    onSettingsChange(index: number) {
        console.log("Settings changed");

        var localsettings = {
            samplesetting: !this.state.settings.yahoo
        };

        safeToLS("settings", localsettings);

        this.setState({settings: localsettings});
    }

    render() {
        return (
            <div className="SettingsPanel">
                <p>Einstellungen</p>
                <div>
                    <label>
                        <div className="SettingsChecks">
                            <input 
                                type="checkbox" 
                                disabled={false} 
                                onChange={() => this.onSettingsChange(5)} 
                                checked={this.state.settings.samplesetting} 
                            /></div>
                        <div className="SettingsChecks">
                            Beispiel-Einstellung<br/>Hier kann eine Erläuterung 
                            zu den Einstellungen stehen.
                        </div>
                    </label>
                </div>
            </div>
        );
    }
}