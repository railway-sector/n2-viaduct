/* eslint-disable @typescript-eslint/no-unused-expressions */
import { dateTable, viaductLayerStatus4 } from "./layers";
import StatisticDefinition from "@arcgis/core/rest/support/StatisticDefinition";

export const construction_status = [
  "To be Constructed",
  "Under Construction",
  "Completed",
];

// Updat date
export async function dateUpdate() {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const query = dateTable.createQuery();
  query.where = "project = 'N2'" + " AND " + "category = 'Viaduct'";

  return dateTable.queryFeatures(query).then((response: any) => {
    const stats = response.features;
    const dates = stats.map((result: any) => {
      const date = new Date(result.attributes.date);
      const year = date.getFullYear();
      const month = monthList[date.getMonth()];
      const day = date.getDate();
      const final = year < 1990 ? "" : `${month} ${day}, ${year}`;
      return final;
    });
    return dates;
  });
}

export async function timeSeriesChartData(contractp: any) {
  const total_complete_pile = new StatisticDefinition({
    onStatisticField: "CASE WHEN Type = 1 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_complete_pile",
    statisticType: "sum",
  });

  const total_complete_pilecap = new StatisticDefinition({
    onStatisticField: "CASE WHEN Type = 2 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_complete_pilecap",
    statisticType: "sum",
  });

  const total_complete_pier = new StatisticDefinition({
    onStatisticField: "CASE WHEN Type = 3 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_complete_pier",
    statisticType: "sum",
  });

  const total_complete_pierhead = new StatisticDefinition({
    onStatisticField: "CASE WHEN Type = 4 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_complete_pierhead",
    statisticType: "sum",
  });

  const total_complete_precast = new StatisticDefinition({
    onStatisticField: "CASE WHEN Type = 5 THEN 1 ELSE 0 END",
    outStatisticFieldName: "total_complete_precast",
    statisticType: "sum",
  });

  const query = viaductLayerStatus4.createQuery();
  if (!contractp) {
    query.where = "end_date IS NOT NULL" + " AND " + "CP = 'N-01'";
  } else {
    query.where = "end_date IS NOT NULL" + " AND " + "CP = '" + contractp + "'";
  }

  query.outStatistics = [
    total_complete_pile,
    total_complete_pilecap,
    total_complete_pier,
    total_complete_pierhead,
    total_complete_precast,
  ];
  query.outFields = ["end_date", "CP"];
  query.orderByFields = ["end_date"];
  query.groupByFieldsForStatistics = ["end_date"];

  return viaductLayerStatus4.queryFeatures(query).then((response: any) => {
    const stats = response.features;

    // collect all dates for each viaduct type
    const data = stats.map((result: any) => {
      const attributes = result.attributes;
      const date = attributes.end_date;

      const pileCount = attributes.total_complete_pile;
      const pilecapCount = attributes.total_complete_pilecap;
      const pierCount = attributes.total_complete_pier;
      const pierheadCount = attributes.total_complete_pierhead;
      const precastCount = attributes.total_complete_precast;

      // compile in object
      return Object.assign(
        {},
        {
          date,
          pile: pileCount,
          pilecap: pilecapCount,
          pier: pierCount,
          piearhead: pierheadCount,
          precast: precastCount,
        },
      );
    });

    return data;
  });
}

// Thousand separators function
export function thousands_separators(num: any) {
  if (num) {
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
}

export function zoomToLayer(layer: any, view: any) {
  return layer.queryExtent().then((response: any) => {
    view
      ?.goTo(response.extent, {
        //response.extent
        speedFactor: 2,
      })
      .catch((error: any) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });
  });
}

// Layer list
export async function defineActions(event: any) {
  const { item } = event;
  if (item.layer.type !== "group") {
    item.panel = {
      content: "legend",
      open: true,
    };
  }
  item.title === "Chainage" ? (item.visible = false) : (item.visible = true);
}
