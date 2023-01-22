import React from "react";
import { getFromLS, safeToLS } from "./LocalStorage";
import "./SettingsPanel.css";

export default class SettingsPanel extends React.Component<{}, {settings: any}> {
    defaultsettings = {yahoo: 0};

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
            yahoo: !this.state.settings.yahoo
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
                                disabled={true} 
                                onChange={() => this.onSettingsChange(5)} 
                                checked={this.state.settings.yahoo} 
                            /></div>
                        <div className="SettingsChecks">
                            Yahoo! Finance Stream<br/>Yahoo hat Lizenzbedingungen, die beachtet werden müssen. Bevor der Schalter
                            aktiviert wird, müssen die Bedingungen u.a. in <a href="https://legal.yahoo.com/us/en/yahoo/terms/product-atos/apiforydn/index.html" target="_blank" rel="noreferrer">hier</a>
                            , <a href="https://legal.yahoo.com/us/en/yahoo/terms/otos/index.html" target="_blank" rel="noreferrer">hier</a> und <a href="https://policies.yahoo.com/us/en/yahoo/terms/index.htm" target="_blank" rel="noreferrer">hier</a> beachtet 
                            werden. Yahoo! finance API ist nur zur persönlichen Verwendung gedacht. 
                        </div>
                    </label>
                </div>
            </div>
        );
    }
}