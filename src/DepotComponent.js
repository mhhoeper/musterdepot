import React from "react";
import SimpleComponent from "./SimpleComponent";

export default class DepotComponent extends SimpleComponent {
  constructor(props) {
    super(props);
  }

  /* see https://www.youtube.com/watch?v=dYjdzpZv5yc */
  /* Prevent drag from https://stackoverflow.com/questions/63758425/react-ondragstart-doesnt-fire-in-material-ui-autocomplete-component */
  render() {
    return (
      <div
        className="depot-container"
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
            <tr>
              <td>MSCI World</td>
              <td>76,40€</td>
              <td>80,00€</td>
              <td>13.120,42€</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
