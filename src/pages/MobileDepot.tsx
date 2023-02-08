import React from 'react';
import './MobileDepot.css';
import { UpdateValue, OnVistaValue, TIsinProp } from '../DepotComponent2';
import DepotDataManager, { IDepotDataDepotPosition } from '../components/configdata/DepotData';

class MobileDepotRow extends React.Component<{position: IDepotDataDepotPosition}>{
    render() {
        return (
            <tr className="MobileDepot">
                <div className="mobileValuesLeft">
                    <p className="rowheader">{this.props.position.Name.substring(0, 30)}</p>
                    <p><b>Stück/Nominale:</b> {this.props.position.Amount}</p>
                    <p><b>ISIN:</b> {this.props.position.ISIN}</p>
                    <p><b>Handelsplatz:</b> <UpdateValue isin={this.props.position.ISIN} /></p>
                    <div className="mobileValuesRight">
                        <p className="rowheader"><OnVistaValue isin={this.props.position.ISIN} isinType={TIsinProp.ValueNow} onvistaType={this.props.position.onvistaType} /></p>
                        <p className="rowheader">
                            <OnVistaValue isin={this.props.position.ISIN} isinType={TIsinProp.Diff} onvistaType={this.props.position.onvistaType} />&nbsp;&nbsp;&nbsp;
                            <OnVistaValue isin={this.props.position.ISIN} isinType={TIsinProp.Percentage} onvistaType={this.props.position.onvistaType} />
                        </p>
                        <p><b>Kaufkurs:</b> {this.props.position.PriceBuy} €</p>
                        <p><b>Akt. Kurs:</b> <OnVistaValue isin={this.props.position.ISIN} isinType={TIsinProp.PriceNow} onvistaType={this.props.position.onvistaType} /></p>
                    </div>
                </div>
            </tr>
        );
    }
}

export default class MobileDepot extends React.Component<{}> {
    private rows: any = [];
    constructor(props: {} | Readonly<{}>) {
        super(props);
        const rowdata = DepotDataManager.getDepotDataManager().depotdata.entities[0].Positions as IDepotDataDepotPosition[];
        rowdata.forEach(position => {
            this.rows.push(<MobileDepotRow position={position} />);
        });
    }

    render() { 
        return (
            <div className="MobileDepot">
                <table className="MobileDepot">
                    <tr id="summarize" className="MobileDepot">
                        <td>
                            <div className="mobileValuesLeft">
                                <p className="depotvalue"><OnVistaValue isin="total" isinType={TIsinProp.ValueNow} onvistaType="" /></p>
                                <p>Depotwert</p>
                                <p>&nbsp;</p>
                                <div className="mobileValuesRight">
                                    <p><OnVistaValue isin="total" isinType={TIsinProp.Percentage} onvistaType="" /></p>
                                    <p><OnVistaValue isin="total" isinType={TIsinProp.Diff} onvistaType="" /></p>
                                    <p>&nbsp;</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    {this.rows}
                </table>
            </div>
        );
    }
}
