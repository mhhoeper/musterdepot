import React from "react";
import { ReactGrid, Column, Row, Id } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import depotdata from "./depotdata.json";

interface TickerType {
  Exchange: string;
  Symbol: string;
}

interface Position {
    Name: string;
    ISIN: string;
    WKN: string;
    Ticker: TickerType[];
    Amount: number;
    Buy: number;
}

const getPeople = (): Position[] => depotdata.Positions;
  
const getColumns = (): Column[] => [
    { columnId: "name", width: 150, resizable: true },
    { columnId: "isin", width: 100, resizable: true },
    { columnId: "amount", width: 50, resizable: true },
    { columnId: "buy", width: 70, resizable: true },
    { columnId: "price", width: 70, resizable: true },
    { columnId: "value", width: 70, resizable: true }
];
  
const headerRow: Row = {
    rowId: "header",
    cells: [
      { type: "header", text: "Name" },
      { type: "header", text: "ISIN" },
      { type: "header", text: "Anzahl" },
      { type: "header", text: "Kaufpreis" },
      { type: "header", text: "Aktueller Preis" },
      { type: "header", text: "Wert" }
    ]
};

const getRows = (people: Position[]): Row[] => [
    headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.Name },
      { type: "text", text: person.ISIN },
      { type: "number", value: person.Amount },
      { type: "number", value: person.Buy },
      { type: "number", value: 0 },
      { type: "number", value: 0}
    ]
  }))
];

function DepotComponent2() {
    const [people] = React.useState<Position[]>(getPeople());
    const [columns, setColumns] = React.useState<Column[]>(getColumns());

    const rows = getRows(people);

    const handleColumnResize = (ci: Id, width: number) => {
      setColumns((prevColumns) => {
        const columnIndex = prevColumns.findIndex(el => el.columnId ===ci)
        const resizedColumn = prevColumns[columnIndex];
        const updatedColumn = { ...resizedColumn, width};
        prevColumns[columnIndex] = updatedColumn;
        return [...prevColumns];
      });
    }

    return (
        <div className="depot-container">
            <div>Depot</div>
            <div className="depot-container2" onMouseDown={(event) => event.stopPropagation()}>
                <ReactGrid 
                    rows={rows} 
                    columns={columns} 
                    enableRowSelection
                    stickyTopRows={1}
                    onColumnResized={handleColumnResize}
                />
            </div>
        </div>
    );
}

export default DepotComponent2;