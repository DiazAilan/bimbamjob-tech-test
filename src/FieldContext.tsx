import React from "react";

export interface Field {
  width: number;
  lenght: number;
}

const FieldContext = React.createContext({
  width: null,
  length: null,
});

export default FieldContext;
