import { Metric } from '../models/metric-type';

export const BAR = 'bar';
export const LINE = 'line';
export const SPLINE = 'spline';
export const AREA = 'area';
export const STEP = 'step';
export const STACKED_BAR = 'stacked-bar';
export const STACKED_AREA = 'stacked-area';

export const CHART_TYPES = [
  BAR,
  LINE,
  SPLINE,
  AREA,
  STEP,
  STACKED_BAR,
  STACKED_AREA,
];

export interface XAxis {
  metric: Metric,
  isTimeseries: boolean,
  xTickList: any[],
}

export interface DataSeries {
  pointList: number[];
  color: string;
};

export type Data = { [seriesName: string]: DataSeries };

export class GraphC3ConfigHelper {

  constructor() {};

  createConfig(
    chartType: string,
    xAxis: XAxis,
    dataSeries: Data,
  ) {
    const seriesNameList = Object.getOwnPropertyNames(dataSeries);
    
    
    const columns =
      xAxis.isTimeseries ?
        [
          [ 'x', ...xAxis.xTickList ],
          ...seriesNameList.map(seriesName => [ seriesName, ...dataSeries[seriesName].pointList ]),
        ] :
        [
          ...seriesNameList.map(seriesName => [ seriesName, ...dataSeries[seriesName].pointList ])
        ];


    const groups = [ seriesNameList ];
    const areaTypes = mapWithObject(seriesNameList, dataSeries, 'area');
    const areaSplineTypes = mapWithObject(seriesNameList, dataSeries, 'area-spline');
    const stepTypes = mapWithObject(seriesNameList, dataSeries, 'step');
    const colors = sliceObject(seriesNameList, dataSeries, 'color');

    const commonData = xAxis.isTimeseries ?
      {
        x: 'x',
        xFormat: xAxis.metric.xFormat,
      } :
      { };

    const data: c3.Data = (() => {
      switch (chartType) {
        case BAR: return { ...commonData, type: 'bar', columns, colors };
        case LINE: return { ...commonData, columns, colors };
        case SPLINE: return { ...commonData, type: 'spline', columns, colors };
        case AREA: return { ...commonData, columns, types: areaTypes, colors };
        case STEP: return { ...commonData, columns, types: stepTypes, colors };
        case STACKED_BAR: return { ...commonData, type: 'bar', columns, groups, colors };
        case STACKED_AREA: return { ...commonData, columns, groups, types: areaSplineTypes, colors };
        default: throw new Error(`Unsupported graph mode '${chartType}'`);
      }
    })();
    
    const axis: c3.Axis =
      xAxis.isTimeseries ?
        {
          x: {
            type: 'timeseries',
            tick: {
              format: xAxis.metric.xTickFormat,
            },
          },
        } :
        {
          x: {
            type: 'category',
            categories: xAxis.xTickList,
          },
        };

    const bar = { width: { ratio: 0.8 } };
    const zoom = { enabled: true };
    const subchart = { show: true };

    return { data, axis, bar, zoom, subchart };
  }

}

function sliceObject(
  seriesNameList: string[],
  dataSeries: { [seriesName: string]: DataSeries },
  field: string,
): any {
  return seriesNameList
    .reduce((result, seriesName) => {
      result[seriesName] = dataSeries[seriesName][field];
      return result;
    },
    {}
  );
}
function mapWithObject(
  seriesNameList: string[],
  dataSeries: { [seriesName: string]: DataSeries },
  valueOverries: any,
): any {
  return seriesNameList
    .reduce((result, seriesName) => {
      result[seriesName] = valueOverries;
      return result;
    },
    {}
  );
}
