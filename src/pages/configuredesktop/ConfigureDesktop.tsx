import React from "react";
//import { getFromLS, safeToLS } from "../../components/configdata/LocalStorage";

// import { ReactGrid, Column, Row, Id , Cell, CellTemplate, Uncertain, Compatible, UncertainCompatible, getCellProperty, CellTemplates, DefaultCellTypes } from "@silevis/reactgrid";
import { ReactGrid, Column, Row, Id } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";


const getColumns = (): Column[] => [
    { columnId: "title", width: 150, resizable: true },
    { columnId: "content", width: 100, resizable: true },
    { columnId: "remove", width: 50, resizable: true}
];

const headerRow: Row = {
    rowId: "header",
    cells: [
      { type: "header", text: "Desktop Name" },
      { type: "header", text: "Content" },
      { type: "header", text: "R" }
    ]
};

const getRows = (): Row[] =>[
    headerRow,
    {rowId: 1, cells: [ 
        {type: "text", text: "Beispieldepot"}, 
        {type: "text", text: "Marc's Depot"},
        {type: "text", text: "-"}
    ]},
    {rowId: 2, cells: [
        {type: "text", text: "+"}, 
        {type: "text", text: ""},
        {type: "text", text: ""}
    ]}
];

export default function ConfigureDesktop() {
    const [columns, setColumns] = React.useState<Column[]>(getColumns());
    const rows = getRows();
    
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
        <div>
            <br />
            <ReactGrid
                rows={rows} 
                columns={columns} 
                enableRowSelection
                stickyTopRows={1}
                onColumnResized={handleColumnResize}
            />
        </div>
    );
}
