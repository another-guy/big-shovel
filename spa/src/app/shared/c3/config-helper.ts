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
  xTickList: (string | number)[],
}

export interface DataSeries {
  pointList: number[];
  color: string;
};

export class GraphC3ConfigHelper {

  constructor() {};

  createConfig(
    chartType: string,
    xAxis: XAxis,
    dataSeries: { [seriesName: string]: DataSeries },
  ) {
    const seriesNameList = Object.getOwnPropertyNames(dataSeries);
    const columns = [
      [ 'x', ...xAxis.xTickList ],
      ...seriesNameList.map(seriesName => [ seriesName, ...dataSeries[seriesName].pointList ]),
    ];
    const groups = [ seriesNameList ];
    const areaTypes = mapWithObject(seriesNameList, dataSeries, 'area');
    const areaSplineTypes = mapWithObject(seriesNameList, dataSeries, 'area-spline');
    const stepTypes = mapWithObject(seriesNameList, dataSeries, 'step');
    const colors = sliceObject(seriesNameList, dataSeries, 'color');

    const commonData = {
      x: 'x',
      xFormat: xAxis.metric.xFormat,
    };

    const data: c3.Data = (() => {
      switch (chartType) {
        case BAR: return { ...commonData, type: 'bar', columns, colors }; break;
        case LINE: return { ...commonData, columns, colors }; break;
        case SPLINE: return { ...commonData, type: 'spline', columns, colors }; break;
        case AREA: return { ...commonData, columns, types: areaTypes, colors }; break;
        case STEP: return { ...commonData, columns, types: stepTypes, colors }; break;
        case STACKED_BAR: return { ...commonData, type: 'bar', columns, groups, colors }; break;
        case STACKED_AREA: return { ...commonData, columns, groups, types: areaSplineTypes, colors }; break;
        default: throw new Error(`Unsupported graph mode '${chartType}'`);
      }
    })();
    
    const axis: c3.Axis = {
      x: {
        tick: {
          format: xAxis.metric.xTickFormat,
        },
      },
    };
    if (xAxis.isTimeseries) {
      axis.x.type = 'timeseries';
    }

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
