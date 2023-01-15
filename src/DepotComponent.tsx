import React from "react";
import depotdata from "./depotdata.json";
import "./DepotComponent.css"

export type depotprops = {
    children: string;
    keynr: number;
};

export default class DepotComponent extends React.Component<depotprops> {

  /* see https://www.youtube.com/watch?v=dYjdzpZv5yc */
  /* Prevent drag from https://stackoverflow.com/questions/63758425/react-ondragstart-doesnt-fire-in-material-ui-autocomplete-component */
  render() {
    return (
      <div className="depot-container">
        <div>Depot</div>
        <div
          className="depot-container2"
          onClick={(evt) => console.log("click")}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Kaufpreis</th>
                <th>Aktueller Preis</th>
                <th>Wert</th>
              </tr>
            </thead>
            <tbody>
              {depotdata.Positions.map((position) => {
                return (
                  <tr>
                    <td>{position.Name}</td>
                    <td>{position.Buy}</td>
                    <td>{this.props.keynr}</td>
                    <td>value</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
