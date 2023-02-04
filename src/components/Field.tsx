import { useEffect, useState } from "react";
import { asArray } from "../utils";

export type MowerOrientation = 'N' | 'S' | 'W' | 'E';
export type MowerMovement = 'L' | 'R' | 'F';

export interface Mower {
  orientation: MowerOrientation;
  position: { x: number, y: number }
  movement: MowerMovement[];
}

export interface FieldConfig {
  width: number;
  height: number;
  mowers: Mower[];
}

function Cell(props: { orientation: MowerOrientation | null }): JSX.Element {

  const [orientation, setOrientation] = useState<string | null>('');

  const orientationToRender = (orientation: MowerOrientation | null): (string | null) => {
    switch (orientation) {
      case 'N': return '^';
      case 'S': return '⌄';
      case 'W': return '<';
      case 'E': return '>';
      default: return null;
    }
  }

  useEffect(() => {
    setOrientation(orientationToRender(props.orientation));
  }, [props])

  return (
    <button className="square">
      {orientation}
    </button>
  );
}

function Field(props: { config: FieldConfig }): JSX.Element {

  const [rows, setRows] = useState<null[]>(asArray(props.config.height));
  const [columns, setColumns] = useState<null[]>(asArray(props.config.width));

  const [state, setState] = useState<(MowerOrientation | null)[][]>([]);

  const generateStateFromConfig = (config: FieldConfig): (MowerOrientation | null)[][] => {
    const table: (MowerOrientation | null)[][] = asArray(props.config.width)
      .map(() => asArray(props.config.height));
    config.mowers.forEach(mower => {
      table[mower.position.x][mower.position.y] = mower?.orientation;
    })
    // console.log(table);
    return table;
  }

  useEffect(() => {
    setRows(asArray(props.config.height));
    setColumns(asArray(props.config.width));
    setState(generateStateFromConfig(props.config));
  }, [props.config])

  return (
    <div>
      {rows.map((row, rowIndex) => {
        return <div className="board-row" key={rowIndex}>
          {columns.map((column, columnIndex) => {
            return <Cell orientation={state[columnIndex]?.[rowIndex]} key={rowIndex + '/' + columnIndex} />
          })}
        </div>
      })}
    </div>
  );
}

export default Field