import React from 'react';
import './MobileDepot.css';
import { UpdateValue, OnVistaValue, TIsinProp } from '../DepotComponent2';

class MobileDepotRow extends React.Component<{isin: string, onvistaType: string}>{
    render() {
        return (
            <tr className="MobileDepot">
                <div className="mobileValuesLeft">
                    <p className="rowheader">Allianz SE</p>
                    <p><b>Stück/Nominale:</b> 15</p>
                    <p><b>ISIN:</b> {this.props.isin}</p>
                    <p><b>Handelsplatz:</b> <UpdateValue isin={this.props.isin} /></p>
                    <div className="mobileValuesRight">
                        <p className="rowheader"><OnVistaValue isin={this.props.isin} isinType={TIsinProp.ValueNow} onvistaType={this.props.onvistaType} /></p>
                        <p className="rowheader">
                            <OnVistaValue isin={this.props.isin} isinType={TIsinProp.Diff} onvistaType={this.props.onvistaType} />&nbsp;&nbsp;&nbsp;
                            <OnVistaValue isin={this.props.isin} isinType={TIsinProp.Percentage} onvistaType={this.props.onvistaType} />
                        </p>
                        <p><b>Kaufkurs:</b> 200,9 €</p>
                        <p><b>Akt. Kurs:</b> <OnVistaValue isin={this.props.isin} isinType={TIsinProp.PriceNow} onvistaType={this.props.onvistaType} /></p>
                    </div>
                </div>
            </tr>
        );
    }
}

export default class MobileDepot extends React.Component<{}> {

    render() {
        var rows = [];
        for(var i=0; i<20; i++) {
            const isin = "DE0008404005"
            rows.push(<MobileDepotRow isin={isin} onvistaType="stocks"/>);
        }
        return (
            <div className="MobileDepot">
                <table className="MobileDepot">
                    <tr id="summarize" className="MobileDepot">
                        <td>
                            <div className="mobileValuesLeft">
                                <p className="depotvalue">20.441,32 €</p>
                                <p>Depotwert</p>
                                <p>&nbsp;</p>
                                <div className="mobileValuesRight">
                                    <p>+4,23 %</p>
                                    <p>+624,63 €</p>
                                    <p>Verfügungsrahmen 2.566,83 €</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    {rows}
                </table>
            </div>
        );
    }
}
