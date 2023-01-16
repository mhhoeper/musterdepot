import React from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

interface Person {
    name: string;
    surname: string;
}

const getPeople = (): Person[] => [
    {name: "Thomas", surname: "Goldman" },
    { name: "Susie", surname: "Quattro" },
    {name: "Thomas2", surname: "Goldman" },
    { name: "Susie2", surname: "Quattro" },
    {name: "Thomas3", surname: "Goldman" },
    { name: "Susie3", surname: "Quattro" },
    {name: "Thomas4", surname: "Goldman" },
    { name: "Susie5", surname: "Quattro" },
    { name: "", surname: "" }
  ];
  
const getColumns = (): Column[] => [
    { columnId: "name", width: 150 },
    { columnId: "surname", width: 150 }
];
  
const headerRow: Row = {
    rowId: "header",
    cells: [
      { type: "header", text: "Name" },
      { type: "header", text: "Surname" }
    ]
};

const getRows = (people: Person[]): Row[] => [
    headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname }
    ]
  }))
];

function DepotComponent2() {
    const [people] = React.useState<Person[]>(getPeople());

    const rows = getRows(people);
    const columns = getColumns();

    return (
        <div className="depot-container">
            <div>Depot</div>
            <div className="depot-container2">
                <ReactGrid 
                    rows={rows} 
                    columns={columns} 
                    enableRowSelection
                    stickyTopRows={1}
                />
            </div>
        </div>
    );
}

export default DepotComponent2;