import { createContext } from "react";

type MyDropdownContextType = {
  contractpackages: any;
  chartPanelwidth: any;
  updateContractPackage: any;
  updateChartPanelwidth: any;
};

const initialState = {
  contractpackages: undefined,
  chartPanelwidth: undefined,
  updateContractPackage: undefined,
  updateChartPanelwidth: undefined,
};

export const MyContext = createContext<MyDropdownContextType>({
  ...initialState,
});
