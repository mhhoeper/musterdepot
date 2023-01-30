import React from "react";
import { ReactGrid, Column, Row, Id , Cell, CellTemplate, Uncertain, Compatible, UncertainCompatible, getCellProperty, CellTemplates, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./DepotComponent2.css"
import depotdata from "./depotdata.json";
import { getDataProvider, IUpdateData } from "./DataProvider";

interface TickerType {
  Exchange: string;
  Symbol: string;
}

interface Position {
    Name: string;
    ISIN: string;
    onvistaType: string;
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

enum Direction {
  Up,
  Down,
  Unknown
}


class OnVistaValue extends React.Component<{isin: string, onvistaType: string}, {value: number, valuestr: string, direction: Direction, theclass: string}> {

  private onvista;

  constructor(props: {isin: string, onvistaType: string}) {
    super(props);
    this.state = {value: 0, valuestr: "", direction: Direction.Unknown, theclass: ""};

    this.onvista = getDataProvider(this.props.isin, this.props.onvistaType, this.onchange);
  }
  onchange = (data: IUpdateData) => {
    let value = data.lastPrice;
    let lastvalue = this.state.value;
    let direction = value > lastvalue ? Direction.Up : value < lastvalue ? Direction.Down : Direction.Unknown;
    let classset = direction === Direction.Up ? "valueUp" : direction === Direction.Down ? "valueDown" : "";
    if (lastvalue === 0) {
      direction = Direction.Unknown;
    }
    let decimalPlaces = 2;
    this.setState((state) => ({
      value: value,
      valuestr: value.toLocaleString('de-DE', {minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces}), 
      direction: direction,
      theclass: ""
    }));
    let intervalId = setInterval(() => {
      this.setState((state) => ({
        value: value,
        valuestr: value.toLocaleString('de-DE', {minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces}), 
        direction: direction,
        theclass: classset
      }));
      clearInterval(intervalId);
    }, 5);
  };

  render() {
    return (
      <div className={this.state.theclass} id="value">{this.state.valuestr}</div>
    );
  }
}


interface PriceCell extends Cell {
  type: 'price';
  text: string;
  symbol: string;
  isin: string;
  onvistaType: string;
  date?: Date;
  format?: Intl.DateTimeFormat;
}


class PriceCellTemplate implements CellTemplate<PriceCell> {
  getCompatibleCell(uncertainCell: Uncertain<PriceCell>): Compatible<PriceCell> {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    const symbol = getCellProperty(uncertainCell, 'symbol', 'string');
    const isin = getCellProperty(uncertainCell, 'isin', 'string');
    const onvistaType = getCellProperty(uncertainCell, 'onvistaType', 'string');
    return { ...uncertainCell, text, value, symbol, isin, onvistaType};
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
//    return (
//      <div id="value"><TickerValue symbol={cell.symbol} /></div>
//    );
    return (
      <div id="value"><OnVistaValue isin={cell.isin} onvistaType={cell.onvistaType} /></div>
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
      { type: "number", value: person.Buy, format: new Intl.NumberFormat('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2}) },
      { type: "price", text: "x", symbol: person.Ticker.find(x=>x.Exchange === person.SelectedExchange)?.Symbol || "", isin: person.ISIN, onvistaType: person.onvistaType},
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