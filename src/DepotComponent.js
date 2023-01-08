import React from "react";
import SimpleComponent from "./SimpleComponent";
import depotdata from "./depotdata.json";

export default class DepotComponent extends SimpleComponent {
  constructor(props) {
    super(props);
  }

  /* see https://www.youtube.com/watch?v=dYjdzpZv5yc */
  /* Prevent drag from https://stackoverflow.com/questions/63758425/react-ondragstart-doesnt-fire-in-material-ui-autocomplete-component */
  render() {
    return (
      <div className="depot-container">
        <div>Depot</div>
        <div
          class="depot-container"
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
                    <td>{position.price}</td>
                    <td>{position.value}</td>
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
