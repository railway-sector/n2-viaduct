import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import {
  chainage_renderer,
  label_chainage,
  label_stationp,
  pier_access_label,
  portalItems,
  prow_renderer,
  via_popup,
  via_renderer,
} from "./uniqueValues";
import GroupLayer from "@arcgis/core/layers/GroupLayer";

//----------------------------------------------//
//            Alignment Layers                  //
//----------------------------------------------//
//--- PIER ACCESS POINT LAYER ---//
export const pierAccessLayer = new FeatureLayer({
  portalItem: portalItems("876de8483da9485aac5df737cbef2143"),
  outFields: ["*"],
  layerId: 6,
  labelingInfo: [pier_access_label],
  title: "Pier Number",
  minScale: 150000,
  maxScale: 0,
  elevationInfo: { mode: "on-the-ground" },
});

//--- CHAINAGE LAYER ---//
export const chainageLayer = new FeatureLayer({
  portalItem: portalItems("876de8483da9485aac5df737cbef2143"),
  layerId: 5,
  title: "Chainage",
  elevationInfo: { mode: "relative-to-ground" },
  labelingInfo: [label_chainage],
  minScale: 150000,
  maxScale: 0,
  renderer: chainage_renderer,
  popupEnabled: false,
});

//--- PROW LAYER ---//
// ORIGINAL (DEFAULT)
export const prowLayer = new FeatureLayer({
  url: "https://gis.railway-sector.com/server/rest/services/N2_Alignment/FeatureServer/1",
  layerId: 1,
  title: "PROW",
  popupEnabled: false,
  renderer: prow_renderer,
});

//--- STATION LAYER ---//
export const stationLayer = new FeatureLayer({
  portalItem: portalItems("876de8483da9485aac5df737cbef2143"),
  layerId: 2,
  title: "N2 Stations",
  labelingInfo: [label_stationp],
  elevationInfo: { mode: "relative-to-ground" },
});
stationLayer.listMode = "hide";

export const alignmentGroupLayer = new GroupLayer({
  title: "Alignment",
  visible: true,
  visibilityMode: "independent",
  layers: [chainageLayer, pierAccessLayer, prowLayer], //stationLayer,
});

//-----------------------------------------------//
//              Other Layers                     //
//-----------------------------------------------//
//--- DATES FEATURE TABLE ---//
export const dateTable = new FeatureLayer({
  portalItem: portalItems("b2a118b088a44fa0a7a84acbe0844cb2"),
});

//-----------------------------------------------//
//              Viaduct Layer                    //
//-----------------------------------------------//
export const viaductLayer = new SceneLayer({
  portalItem: portalItems("1b0061355b83444aae54e6784036e46e"),
  elevationInfo: { mode: "absolute-height" },
  title: "Viaduct",
  labelsVisible: false,
  renderer: via_renderer,
  popupTemplate: via_popup,
});

//---------------------------------------------//
//            Other Parameters                 //
//---------------------------------------------//
//--- SEARCH WIDGET
export const sources: any = [
  {
    layer: viaductLayer,
    searchFields: ["PierNumber"],
    displayField: "PierNumber",
    exactMatch: false,
    outFields: ["PierNumber"],
    name: "Pier Number",
    placeholder: "example: P-1011",
  },
  {
    layer: viaductLayer,
    searchFields: ["uniqueID"],
    displayField: "uniqueID",
    exactMatch: false,
    outFields: ["uniqueID"],
    name: "uniqueID",
    placeholder: "example: 12345",
  },
];
