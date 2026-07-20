import { createContext } from "react";

type MyDropdownContextType = {
  cpackage: any;
  updateCpackage: any;
};

const initialState = {
  cpackage: undefined,
  updateCpackage: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
