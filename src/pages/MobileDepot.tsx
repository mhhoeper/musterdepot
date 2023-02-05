import React from 'react';
import './MobileDepot.css';

export default class MobileDepot extends React.Component<{}> {

    render() {
        return (
            <div className="MobileDepot">
                <table className="MobileDepot">
                    <tr id="summarize">
                        <td>
                            <div className="summarize1">
                                <p className="depotvalue">20.441,32 €</p>
                                <p>Depotwert</p>
                                <div className="summarize2">
                                    <p>+4,23 %</p>
                                    <p>+624,63 €</p>
                                    <p>Verfügungsrahmen 2.566,83 €</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Hier steht noch was</td>
                    </tr>
                </table>
            </div>
        );
    }
}
