import React from "react";
import { ReactGrid, Column, Row, Id , Cell, CellTemplate, Uncertain, Compatible, UncertainCompatible, getCellProperty, CellTemplates, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import depotdata from "./depotdata.json";
import YFinance, { yfinancedata } from "yfinance-live";

interface TickerType {
  Exchange: string;
  Symbol: string;
}

interface Position {
    Name: string;
    ISIN: string;
    WKN: string;
    Ticker: TickerType[];
    SelectedExchange: string;
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



class TickerValue extends React.Component<{symbol: string}, {value: string}> {

  constructor(props: {symbol: string}) {
    super(props);
    this.state = {value: "none"};
  }
  onchange = (data: yfinancedata) => {
    if (data.id === this.props.symbol) {
      let value = data.price;
      let decimalPlaces = 2;
      this.setState((state) => ({
        value: Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces),
      }));
    } else {
      // keep last value
    }
  };

  yfin = YFinance([this.props.symbol], this.onchange);

  render() {
    return (
      <div>{this.state.value}</div>
    );
  }
}




interface PriceCell extends Cell {
  type: 'price';
  text: string;
  symbol: string;
  date?: Date;
  format?: Intl.DateTimeFormat;
}


class PriceCellTemplate implements CellTemplate<PriceCell> {
  getCompatibleCell(uncertainCell: Uncertain<PriceCell>): Compatible<PriceCell> {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    const symbol = getCellProperty(uncertainCell, 'symbol', 'string');
    return { ...uncertainCell, text, value, symbol};
  }
  handleKeyDown(cell: Compatible<PriceCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
      cell: Compatible<PriceCell>;
      enableEditMode: boolean;
  } {
    return { cell, enableEditMode: false};  
  }
  update(cell: Compatible<PriceCell>, cellToMerge: UncertainCompatible<PriceCell>): Compatible<PriceCell> {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text});
  }

  getClassName(cell: Compatible<PriceCell>, isInEditMode: boolean): string {
    return "price";
  }
  render(cell: Compatible<PriceCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<PriceCell>, commit: boolean) => void): React.ReactNode {
    return (
      <div><TickerValue symbol={cell.symbol} /></div>
    );
  }
}

const myCellTemplates: CellTemplates = {
  price: new PriceCellTemplate()
}



interface MyRow extends Row<DefaultCellTypes | PriceCell> {

}


const getRows = (people: Position[]): MyRow[] => [
    headerRow,
  ...people.map<MyRow>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.Name },
      { type: "text", text: person.ISIN },
      { type: "number", value: person.Amount },
      { type: "number", value: person.Buy },
      { type: "price", text: "x", symbol: person.Ticker.find(x=>x.Exchange === person.SelectedExchange)?.Symbol || ""},
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
            <div>Depot - {depotdata.Name}</div>
            <div className="depot-container2" onMouseDown={(event) => event.stopPropagation()}>
                <ReactGrid 
                    rows={rows} 
                    columns={columns} 
                    enableRowSelection
                    stickyTopRows={1}
                    onColumnResized={handleColumnResize}
                    customCellTemplates={myCellTemplates}
                />
            </div>
        </div>
    );
}

export default DepotComponent2;