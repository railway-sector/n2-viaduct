import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D.js";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer.js";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import CustomContent from "@arcgis/core/popup/content/CustomContent";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
// import { toAsofdate } from './query';

//----------------------------------------------//
//              portalItem                      //
//----------------------------------------------//
const portalItem_url = { url: "https://gis.railway-sector.com/portal" };

export const portalItems = (id: any) => {
  return { id: id, portal: portalItem_url };
};

export const cpackages = ["N-01", "N-02", "N-03", "N-04"];

//----------------------------------------------//
//              Chart Parameters                //
//----------------------------------------------//
// chart width
export const chart_width = "26vw";
export const chart_box_width = 250;

// labeling and value label color
export const primaryLabelColor = "#9ca3af";
export const valueLabelColor = "#d1d5db";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- PIER ACCESS POINT LAYER ---//
export const pier_access_label = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: { color: valueLabelColor },
        size: 15,
        font: { family: "Ubuntu Mono", weight: "bold" },
      }),
    ],
    verticalOffset: {
      screenLength: 80,
      maxWorldLength: 500,
      minWorldLength: 30,
    },
    callout: {
      type: "line",
      size: 0.5,
      color: [0, 0, 0],
      border: { color: [255, 255, 255, 0.7] },
    },
  }),
  labelExpressionInfo: { expression: "$feature.PierNumber" },
  labelPlacement: "above-center",
});

//--- CHAINAGE LAYER ---//
export const label_chainage = new LabelClass({
  labelExpressionInfo: { expression: "$feature.KmSpot" },
  symbol: {
    type: "text",
    color: [85, 255, 0],
    haloColor: "black",
    haloSize: 0.5,
    font: { size: 15, weight: "bold" },
  },
});

export const chainage_renderer = new SimpleRenderer({
  symbol: new SimpleMarkerSymbol({
    size: 5,
    color: [255, 255, 255, 0.9],
    outline: { width: 0.2, color: "black" },
  }),
});

//--- PROW LAYER ---//
// ORIGINAL (DEFAULT)
export const prow_renderer = new SimpleRenderer({
  symbol: new SimpleLineSymbol({ color: "#ff0000", width: "2px" }),
});

//--- STATION LAYER ---//
export const label_stationp = new LabelClass({
  symbol: new LabelSymbol3D({
    symbolLayers: [
      new TextSymbol3DLayer({
        material: { color: "#d4ff33" },
        size: 15,
        halo: { color: "black", size: 0.5 },
      }),
    ],
    verticalOffset: {
      screenLength: 100,
      maxWorldLength: 700,
      minWorldLength: 80,
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: [128, 128, 128, 0.5],
      size: 0.2,
      border: { color: "grey" },
    },
  }),
  labelPlacement: "above-center",
  labelExpressionInfo: { expression: "$feature.Station" },
});

//---------------------------------------------//
//             Viaduct Layer                   //
//---------------------------------------------//
export const via_type_f = "Type";
export const via_status_f = "Status";
export const cp_f = "CP";

//--- VIADUCT TYPES
const via_icons = [
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Pile_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Pilecap_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Pier_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Pierhead_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Precast_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Precast_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Precast_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Precast_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Precast_Logo.svg",
  "https://EijiGorilla.github.io/Symbols/Viaduct_Images/Viaduct_Precast_Logo.svg",
];

export const viatypes_q = [
  { value: 1, category: "Bored Pile", icon: via_icons[0] },
  { value: 2, category: "Pile Cap", icon: via_icons[1] },
  { value: 3, category: "Pier", icon: via_icons[2] },
  { value: 4, category: "Pier Head", icon: via_icons[3] },
  { value: 5, category: "Precast", icon: via_icons[4] },
];

//--- VIADUCT STATUS
export const viastatus_q: any = [
  {
    value: 1,
    status: "incomp",
    label: "To be Constructed",
    color: "#000000",
    rgb: [225, 225, 225, 0.1],
  },
  {
    value: 2,
    status: "ongoing",
    label: "Under Construction",
    color: "#f7f7f7ff",
    rgb: [211, 211, 211, 0.5],
  },
  {
    value: 3,
    status: "delayed",
    label: "Delayed",
    color: "#FF0000",
    rgb: [255, 0, 0, 0.8],
  },
  {
    value: 4,
    status: "comp",
    label: "Completed",
    color: "#0070ff",
    rgb: [0, 112, 255, 0.8],
  },
];

const via_uniqueV = [1, 2, 4].map((v: any) => {
  return {
    value: v,
    label: viastatus_q.find((f: any) => f.value === v)?.label,
    symbol: new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: viastatus_q.find((f: any) => f.value === v)?.rgb,
            colorMixMode: "replace",
          },
          edges: new SolidEdges3D({ color: [225, 225, 225, 0.3] }),
        }),
      ],
    }),
  };
});

export const via_renderer = new UniqueValueRenderer({
  field: "Status",
  uniqueValueInfos: via_uniqueV,
});

//--- POPUP
const highlight = (value: unknown) =>
  `<span style="color: #d9dc00ff; font-weight: bold; margin-left: 20px">${value}</span>`;

const via_customContent = new CustomContent({
  outFields: ["via_status_f", "Type", "PileNo", "PierId", "uniqueID", "Status"],
  creator: (event: any) => {
    const attrs = event.graphic.attributes;
    const cps = attrs[cp_f];
    const status = attrs[via_status_f];
    const type = attrs["Type"];
    const pileno = attrs["PileNo"]
    const pierid = attrs["PierId"]
    const uniqueid = attrs["uniqueID"]

    //-- Dates
    // const start_date = toAsofdate(new Date(attrs["start_actual"]));
    // const end_date = toAsofdate(new Date(attrs["finish_actual"]));
    // <tr><td class='lbl'>Start Date:</td><td>${highlight(start_date ?? "")}</td></tr>
    // <tr><td class='lbl'>End Date:</td><td>${highlight(end_date ?? "")}</td></tr>

    const typeV = viatypes_q.find((f: any) => f.value === type)?.category;
    const statusL = viastatus_q.filter((f: any) => f.value === status)[0]
      ?.label;

    return `
    <div style='line-height: 1.7'>
        <style>
        .lbl { padding: 2px 8px 2px 3px; font-weight: bold; }
      </style>
    <table style='border-collapse: collapse;'>
        <tr><td class='lbl'>Contract Package:</td><td>${highlight(cps)}</td></tr>
        <tr><td class='lbl'>Type:</td><td>${highlight(typeV)}</td></tr>
        <tr><td class='lbl'>Status:</td><td>${highlight(statusL ?? "")}</td></tr>
        <tr><td class='lbl'>Pile No:</td><td>${highlight(pileno ?? "")}</td></tr>
        <tr><td class='lbl'>Pier ID:</td><td>${highlight(pierid ?? "")}</td></tr>
        <tr><td class='lbl'>Unique ID:</td><td>${highlight(uniqueid ?? "")}</td></tr>
      </table>
    </div>
              `;
  },
});

export const via_popup = new PopupTemplate({
  title: "<div style='color: #eaeaea'>Pier Number: <b>{PierNumber}</b></div>",
  lastEditInfoEnabled: false,
  content: [via_customContent],
});

//---------------------------------------------//
//              Layer List                     //
//---------------------------------------------//
export async function defineActions(event: any) {
  const { item } = event;
  if (item.layer.type !== "group") {
    item.panel = { content: "legend", open: true };
  }
  item.title === "Chainage" ? (item.visible = false) : (item.visible = true);
}
