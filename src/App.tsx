import { useState, useEffect } from "react";
import "./index.css";
import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-legend";
import "@esri/calcite-components/dist/components/calcite-shell";
import MapDisplay from "./components/MapDisplay";
import ActionPanel from "./components/ActionPanel";
import Header from "./components/Header";
import UndergroundSwitch from "./components/UndergroundSwitch";
import Chart from "./components/Chart";
import { MyContext } from "./contexts/MyContext";
import { contractPackage } from "./uniqueValues";
import { authenticate } from "./autho";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App(): React.JSX.Element {
  const [loggedInState, setLoggedInState] = useState<boolean>(false);
  useEffect(() => {
    authenticate(setLoggedInState, "Ej53Md7hP2lQU98y");
  }, []);

  const [contractpackages, setContractpackages] = useState<any>(
    contractPackage[0],
  );
  const [chartPanelwidth, setChartPanelwidth] = useState<any>();

  const updateContractPackage = (newContractpackage: any) => {
    setContractpackages(newContractpackage);
  };

  const updateChartPanelwidth = (newWidth: any) => {
    setChartPanelwidth(newWidth);
  };

  return (
    <>
      {loggedInState === true && (
        <div>
          <calcite-shell
            style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #555" }}
          >
            <MyContext
              value={{
                contractpackages,
                chartPanelwidth,
                updateContractPackage,
                updateChartPanelwidth,
              }}
            >
              <QueryClientProvider client={queryClient}>
                <ActionPanel />
                <UndergroundSwitch />
                <MapDisplay />
                <Chart />
                <Header />
              </QueryClientProvider>
            </MyContext>
          </calcite-shell>
        </div>
      )}
    </>
  );
}

export default App;
