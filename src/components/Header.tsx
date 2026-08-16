import { dateUpdate } from "../query";
import StationSegmentedList from "./ContractPackageSegmentedList";
import { primaryLabelColor } from "../uniqueValues";
import { useQuery } from "@tanstack/react-query";

function Header() {
  const { data } = useQuery<any>({
    queryKey: ["As_Of_Date"],
    queryFn: () => dateUpdate("Utility Relocation"),
    staleTime: Infinity,
  });
  const asofdate = data ?? "";

  return (
    <>
      <header
        slot="header"
        id="header-title"
        style={{
          display: "flex",
          height: "70px",
          borderStyle: "solid",
          borderRightWidth: 5,
          borderLeftWidth: 5,
          borderBottomWidth: 4,
          borderTopWidth: 5,
          borderColor: "#555555",
        }}
      >
        <img
          src="https://EijiGorilla.github.io/Symbols/Projec_Logo/DOTr_Logo_v2.svg"
          alt="DOTr Logo"
          height={"55px"}
          width={"55px"}
          style={{
            marginBottom: "auto",
            marginTop: "auto",
            marginLeft: "10px",
          }}
        />
        <b
          style={{
            color: "white",
            marginLeft: "1rem",
            fontSize: "2.6vh",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          N2 Viaduct
        </b>
        <div
          style={{
            color: primaryLabelColor,
            marginTop: "auto",
            marginLeft: "auto",
          }}
        >
          {!asofdate ? "" : "As of " + asofdate}
        </div>

        {/* Segmented List component */}
        <div style={{ margin: "auto", float: "right" }}>
          <StationSegmentedList />
        </div>
        <div
          style={{
            marginBottom: "auto",
            marginTop: "auto",
            marginLeft: "auto",
            marginRight: "40px",
            display: "flex",
          }}
        >
          <img
            src="https://EijiGorilla.github.io/Symbols/Projec_Logo/GCR_LOGO.svg"
            alt="GCR Logo"
            height={"50px"}
            width={"75px"}
            style={{ backgroundColor: "#f0e7e7" }}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
