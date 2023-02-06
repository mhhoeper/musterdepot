import React from "react";
import { ReactGrid, Column, Row, Id , Cell, CellTemplate, Uncertain, Compatible, UncertainCompatible, getCellProperty, CellTemplates, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./DepotComponent2.css"
import { getDataProvider, IUpdateData } from "./DataProvider";
import DepotDataManager, { IDepotDataDepotPosition } from './components/configdata/DepotData';

enum Direction {
  Up = 1,
  Down,
  Unknown
}

enum TIsinProp {
  PriceNow,
  ValueNow,
  Diff,
  Percentage
}

interface Position {
    Name: string;
    ISIN: string;
    onvistaType: string;
    WKN?: string;
    SelectedExchange: string;
    Amount: number;
    PriceBuy: number;
    priceNow?: number;
    valueBuy?: number;
    valueNow?: number;
    diffToBuy?: number;
    percToBuy?: number;
    direction?: Direction;
}

interface IDepotModelUpdateData extends IUpdateData {
  valueBuy: number;
  valueNow: number;
  diffToBuy: number;
  percToBuy: number;
  direction: Direction;
}

interface IDepotModelUpdateProcessor {
  (data: IDepotModelUpdateData): void;
}

interface IDepotModelListener {
  dataType: TIsinProp;
  updateProcessor: IDepotModelUpdateProcessor;
}

class DepotModel {
  positions: Position[];
  valueBuy: number;
  valueNow: number;
  diffToBuy: number;
  percToBuy: number;
  private listenerRegister: Map<string, IDepotModelListener[]>;
  private updatePosition(position: Position, newPrice: number) {
    let oldPrice = position.priceNow;
    position.priceNow = newPrice;
    position.valueBuy = position.PriceBuy * position.Amount;
    position.valueNow = position.priceNow * position.Amount;
    position.diffToBuy = position.valueNow - position.valueBuy;
    position.percToBuy = ((position.valueNow / position.valueBuy) - 1) * 100;
    if(oldPrice) {
      position.direction = (newPrice - oldPrice > 0.01) ? Direction.Up : ( (newPrice - oldPrice < -0.01) ? Direction.Down : Direction.Unknown);
    } else {
      position.direction = Direction.Unknown
    }
  }
  private calcValueBuy(positions: Position[]): number {
    var sum: number = 0;
    positions.forEach(position => {
      sum += position.valueBuy || 0;
    });
    return sum;
  }
  private calcValueNow(positions: Position[]): number {
    var sum: number = 0;
    positions.forEach(position => {
      sum += position.valueNow || 0;
    });
    return sum;
  }
  constructor(positions: Position[]) {
    this.positions = positions;
    this.positions.forEach(position => {
      position.valueBuy = position.Amount * position.PriceBuy;
    });
    this.valueBuy = this.calcValueBuy(positions);
    this.valueNow = this.calcValueNow(positions);
    this.diffToBuy = this.valueNow - this.valueBuy;
    this.percToBuy = 1 - (this.valueBuy / this.valueNow);
    positions.forEach(position => {
      const onvistaType = (position.onvistaType === undefined) ? "" : position.onvistaType;
      getDataProvider(position.ISIN, onvistaType, this.onchange);
    });
    this.listenerRegister = new Map<string, IDepotModelListener[]>();
  }
  private informListener(listenerID: string, data: IDepotModelUpdateData) {
    const listenerArray = this.listenerRegister.get(listenerID);
    if(listenerArray) {
      listenerArray.forEach(listener => {
        listener.updateProcessor(data);
      })
    }
  }
  onchange = (data: IUpdateData) => {
    const idx = this.positions.findIndex(el => el.ISIN === data.isin);
    this.updatePosition(this.positions[idx], data.lastPrice);
    let oldValue = this.valueNow;
    this.valueNow = this.calcValueNow(this.positions);
    this.diffToBuy = this.valueNow - this.valueBuy;
    this.percToBuy = ((this.valueNow / this.valueBuy) - 1) * 100;
    let direction = (this.valueNow - oldValue > 0.01) ? Direction.Up : ( (this.valueNow - oldValue < -0.01) ? Direction.Down : Direction.Unknown);

    this.informListener(data.isin, {
      ...data,
      valueBuy: this.positions[idx].valueBuy || 0,
      valueNow: this.positions[idx].valueNow || 0,
      diffToBuy: this.positions[idx].diffToBuy || 0,
      percToBuy: this.positions[idx].percToBuy || 0,
      direction: this.positions[idx].direction || Direction.Unknown 
    });
    this.informListener("valueNow", {
      isin: "valueNow", 
      lastPrice: this.valueNow,
      market: "",
      valueBuy: 0, valueNow: 0, diffToBuy: 0, percToBuy: 0, direction: direction});
    this.informListener("diffToBuy", {
      isin: "diffToBuy", 
      lastPrice: this.diffToBuy,
      market: "",
      valueBuy: 0, valueNow: 0, diffToBuy: 0, percToBuy: 0, direction: direction});
    this.informListener("percToBuy", {
      isin: "percToBuy", 
      lastPrice: this.percToBuy,
      market: "",
      valueBuy: 0, valueNow: 0, diffToBuy: 0, percToBuy: 0, direction: direction});
  }
  registerListener(field: string, type: TIsinProp, onchange: IDepotModelUpdateProcessor): void {
    if(!this.listenerRegister.has(field)) {
      this.listenerRegister.set(field, [{dataType: type, updateProcessor: onchange}]);
    } else {
      this.listenerRegister.get(field)!.push({dataType: type, updateProcessor: onchange});
    }
  }
  getPositions() {
    return this.positions;
  }
}

const depotModel = new DepotModel(DepotDataManager.getDepotDataManager().depotdata.entities[0].Positions as IDepotDataDepotPosition[]);

const getPeople = (): Position[] => depotModel.getPositions();
  
const getColumns = (): Column[] => [
    { columnId: "name", width: 150, resizable: true },
    { columnId: "isin", width: 100, resizable: true },
    { columnId: "amount", width: 50, resizable: true },
    { columnId: "buy", width: 70, resizable: true },
    { columnId: "price", width: 70, resizable: true },
    { columnId: "buyValue", width: 70, resizable: true },
    { columnId: "value", width: 70, resizable: true },
    { columnId: "diffToBuy", width: 70, resizable: true },
    { columnId: "percToBuy", width: 70, resizable: true },
    { columnId: "market", width: 50, resizable: true}
];
  
const headerRow: Row = {
    rowId: "header",
    cells: [
      { type: "header", text: "Name" },
      { type: "header", text: "ISIN" },
      { type: "header", text: "Anzahl" },
      { type: "header", text: "Kaufpreis" },
      { type: "header", text: "Aktueller Preis" },
      { type: "header", text: "Kaufwert" },
      { type: "header", text: "Wert" },
      { type: "header", text: "Diff" },
      { type: "header", text: "Diff %" },
      { type: "header", text: "Börse"}
    ]
};




class OnVistaValue extends React.Component<{isin: string, isinType: TIsinProp, onvistaType: string}, {value: number, valuestr: string, direction: Direction, theclass: string, signcolor: string}> {

  //private onvista;

  constructor(props: {isin: string, isinType: TIsinProp, onvistaType: string}) {
    super(props);
    this.state = {value: 0, valuestr: "", direction: Direction.Unknown, theclass: "", signcolor: ""};

    //this.onvista = getDataProvider(this.props.isin, this.props.onvistaType, this.onchange);
    depotModel.registerListener(this.props.isin, this.props.isinType, this.onchange);
  }
  onchange = (data: IDepotModelUpdateData) => {
    let value = data.lastPrice;
    let lastvalue = this.state.value;
    let decimalPlaces = 2;
    let direction = data.direction;
    let classset = "";
    let signcolor = "";
    if(lastvalue !== value) {
      if(this.props.isinType === TIsinProp.PriceNow) {
        // keep everything like it is
      } else if(this.props.isinType === TIsinProp.ValueNow) {
        value = data.valueNow;
      } else if(this.props.isinType === TIsinProp.Diff) {
        value = data.diffToBuy;
      } else {
        // TIsinProp.Percentage
        value = data.percToBuy;
      }
      classset = direction === Direction.Up ? "valueUp" : ( direction === Direction.Down ? "valueDown" : "" );
      signcolor = (this.props.isinType === TIsinProp.Diff) || (this.props.isinType === TIsinProp.Percentage) ? 
        ((value > 0) ? "posvalue" : ((value < 0) ? "negvalue" : "")) : "";
      this.setState((state) => ({
        value: value,
        valuestr: value.toLocaleString('de-DE', {minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces}), 
        direction: direction,
        theclass: "",
        signcolor: signcolor
      }));
      let intervalId = setInterval(() => {
        this.setState((state) => ({
          value: value,
          valuestr: value.toLocaleString('de-DE', {minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces}), 
          direction: direction,
          theclass: classset,
          signcolor: signcolor
        }));
        clearInterval(intervalId);
      }, 5);
    }
  };

  render() {
    return (
      <div className={this.state.theclass + " " + this.state.signcolor} id="value">{this.state.valuestr}</div>
    );
  }
}


class UpdateValue extends React.Component<{isin: string}, {market: string}> {

  //private onvista;

  constructor(props: {isin: string}) {
    super(props);
    this.state = {market: ""};

    //this.onvista = getDataProvider(this.props.isin, this.props.onvistaType, this.onchange);
    depotModel.registerListener(this.props.isin, TIsinProp.ValueNow, this.onchange);
  }
  onchange = (data: IDepotModelUpdateData) => {
    let market = data.market;
    this.setState((state) => ({
      market: market
    }));
  }

  render() {
    return (
      <div>{this.state.market}</div>
    );
  }
}

interface PriceCell extends Cell {
  type: 'price';
  text: string;
  isin: string;
  onvistaType: string;
  date?: Date;
  format?: Intl.DateTimeFormat;
}


class PriceCellTemplate implements CellTemplate<PriceCell> {
  getCompatibleCell(uncertainCell: Uncertain<PriceCell>): Compatible<PriceCell> {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    const isin = getCellProperty(uncertainCell, 'isin', 'string');
    const onvistaType = getCellProperty(uncertainCell, 'onvistaType', 'string');
    return { ...uncertainCell, text, value, isin, onvistaType};
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
      <div id="value"><OnVistaValue isin={cell.isin} isinType={TIsinProp.PriceNow} onvistaType={cell.onvistaType} /></div>
    );
  }
}

interface ValueCell extends Cell {
  type: 'valueNow';
  text: string;
  isin: string;
  onvistaType: string;
  date?: Date;
  format?: Intl.DateTimeFormat;
}

class ValueCellTemplate implements CellTemplate<PriceCell> {
  getCompatibleCell(uncertainCell: Uncertain<PriceCell>): Compatible<PriceCell> {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    const isin = getCellProperty(uncertainCell, 'isin', 'string');
    const onvistaType = getCellProperty(uncertainCell, 'onvistaType', 'string');
    return { ...uncertainCell, text, value, isin, onvistaType};
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
      <div id="value"><OnVistaValue isin={cell.isin} isinType={TIsinProp.ValueNow} onvistaType={cell.onvistaType} /></div>
    );
  }
}

interface PriceDiffCell extends Cell {
  type: 'priceDiff';
  text: string;
  isin: string;
  onvistaType: string;
  date?: Date;
  format?: Intl.DateTimeFormat;
}


class PriceDiffCellTemplate implements CellTemplate<PriceDiffCell> {
  getCompatibleCell(uncertainCell: Uncertain<PriceDiffCell>): Compatible<PriceDiffCell> {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    const isin = getCellProperty(uncertainCell, 'isin', 'string');
    const onvistaType = getCellProperty(uncertainCell, 'onvistaType', 'string');
    return { ...uncertainCell, text, value, isin, onvistaType};
  }
  handleKeyDown(cell: Compatible<PriceDiffCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
      cell: Compatible<PriceDiffCell>;
      enableEditMode: boolean;
  } {
    return { cell, enableEditMode: false};  
  }
  update(cell: Compatible<PriceDiffCell>, cellToMerge: UncertainCompatible<PriceDiffCell>): Compatible<PriceDiffCell> {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text});
  }

  getClassName(cell: Compatible<PriceDiffCell>, isInEditMode: boolean): string {
    return "priceDiff";
  }
  render(cell: Compatible<PriceDiffCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<PriceDiffCell>, commit: boolean) => void): React.ReactNode {
    return (
      <div id="value"><OnVistaValue isin={cell.isin} isinType={TIsinProp.Diff} onvistaType={cell.onvistaType} /></div>
    );
  }
}


interface PricePercentageCell extends Cell {
  type: 'pricePerc';
  text: string;
  isin: string;
  onvistaType: string;
  date?: Date;
  format?: Intl.DateTimeFormat; 
}



class PricePercCellTemplate implements CellTemplate<PricePercentageCell> {
  getCompatibleCell(uncertainCell: Uncertain<PricePercentageCell>): Compatible<PricePercentageCell> {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    const isin = getCellProperty(uncertainCell, 'isin', 'string');
    const onvistaType = getCellProperty(uncertainCell, 'onvistaType', 'string');
    return { ...uncertainCell, text, value, isin, onvistaType};
  }
  handleKeyDown(cell: Compatible<PricePercentageCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
      cell: Compatible<PricePercentageCell>;
      enableEditMode: boolean;
  } {
    return { cell, enableEditMode: false};  
  }
  update(cell: Compatible<PricePercentageCell>, cellToMerge: UncertainCompatible<PricePercentageCell>): Compatible<PricePercentageCell> {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text});
  }

  getClassName(cell: Compatible<PricePercentageCell>, isInEditMode: boolean): string {
    return "pricePerc";
  }
  render(cell: Compatible<PricePercentageCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<PricePercentageCell>, commit: boolean) => void): React.ReactNode {
    return (
      <div id="value"><OnVistaValue isin={cell.isin} isinType={TIsinProp.Percentage} onvistaType={cell.onvistaType} /></div>
    );
  }
}



interface MarketCell extends Cell {
  type: 'market';
  market: string;
  isin: string;
}



class MarketCellTemplate implements CellTemplate<MarketCell> {
  getCompatibleCell(uncertainCell: Uncertain<MarketCell>): Compatible<MarketCell> {
    const market = getCellProperty(uncertainCell, 'market', 'string') || "";
    const isin = getCellProperty(uncertainCell, 'isin', 'string');
    return { ...uncertainCell, text: market, value: NaN, market: market, isin: isin};
  }
  handleKeyDown(cell: Compatible<MarketCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
      cell: Compatible<MarketCell>;
      enableEditMode: boolean;
  } {
    return { cell, enableEditMode: false};  
  }
  update(cell: Compatible<MarketCell>, cellToMerge: UncertainCompatible<MarketCell>): Compatible<MarketCell> {
    return this.getCompatibleCell({ ...cell, market: cellToMerge.text});
  }

  getClassName(cell: Compatible<MarketCell>, isInEditMode: boolean): string {
    return "market";
  }
  render(cell: Compatible<MarketCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<MarketCell>, commit: boolean) => void): React.ReactNode {
    return (
      <div id="value"><UpdateValue isin={cell.isin} /></div>
    );
  }
}



const myCellTemplates: CellTemplates = {
  price: new PriceCellTemplate(),
  valueNow: new ValueCellTemplate(),
  priceDiff: new PriceDiffCellTemplate(),
  pricePerc: new PricePercCellTemplate(),
  market: new MarketCellTemplate()
}



interface MyRow extends Row<DefaultCellTypes | PriceCell | ValueCell | PriceDiffCell | PricePercentageCell | MarketCell> {

}


const getRows = (people: Position[]): MyRow[] => [
    headerRow,
  ...people.map<MyRow>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.Name },
      { type: "text", text: person.ISIN },
      { type: "number", value: person.Amount },
      { type: "number", value: person.PriceBuy, format: new Intl.NumberFormat('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2}) },
      { type: "price", text: "x", isin: person.ISIN, onvistaType: person.onvistaType},
      { type: "number", value: person.valueBuy || 0},
      { type: "valueNow", text: "x", isin: person.ISIN, onvistaType: person.onvistaType},
      { type: "priceDiff", text: "x", isin: person.ISIN, onvistaType: person.onvistaType},
      { type: "pricePerc", text: "x", isin: person.ISIN, onvistaType: person.onvistaType},
      { type: "market", market: "x", isin: person.ISIN}
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
            <div>Depot - {DepotDataManager.getDepotDataManager().depotdata.entities[0].Name}</div>
            <div><table>
              <tr>
                <td>Gesamt:&nbsp;&nbsp;</td>
                <td><OnVistaValue isin="valueNow" isinType={TIsinProp.PriceNow} onvistaType=""/></td>
                <td>&nbsp;&nbsp;|&nbsp;&nbsp;</td>
                <td>Diff:&nbsp;&nbsp;</td>
                <td><OnVistaValue isin="diffToBuy" isinType={TIsinProp.PriceNow} onvistaType=""/></td>
                <td>&nbsp;&nbsp;</td>
                <td><OnVistaValue isin="percToBuy" isinType={TIsinProp.PriceNow} onvistaType=""/></td>
              </tr>
            </table></div>
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