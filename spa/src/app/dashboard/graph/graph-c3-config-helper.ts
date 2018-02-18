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

export class GraphC3ConfigHelper {

  constructor() {};

  getBaseConfigForTimeSeries(
    chartType: string,
    metric: Metric,

    // TODO Think about how to generalize these parameters
    periodKeyList: string[],
    errors: number[],
    infos: number[],
  ) {
    const columns = [
      [ 'x', ...periodKeyList ],
      [ 'ERRORS', ...errors ],
      [ 'INFOS', ...infos ],
    ];
    const groups = [
      ['ERRORS', 'INFOS'],
    ];
    const areaTypes = { 'INFOS': 'area', 'ERRORS': 'area' };
    const areaSplineTypes = { 'INFOS': 'area-spline', 'ERRORS': 'area-spline' };
    const stepTypes = { 'INFOS': 'step', 'ERRORS': 'step' };
    const colors = { 'INFOS': '#ccc', 'ERRORS': '#f00' };

    const commonData = {
      x: 'x',
      xFormat: metric.timestampParseFormat,
    };

    let data: c3.Data = null;
    switch (chartType) {
      case BAR: data = { ...commonData, type: 'bar', columns, colors }; break;
      case LINE: data = { ...commonData, columns, colors }; break;
      case SPLINE: data = { ...commonData, type: 'spline', columns, colors }; break;
      case AREA: data = { ...commonData, columns, types: areaTypes, colors }; break;
      case STEP: data = { ...commonData, columns, types: stepTypes, colors }; break;
      case STACKED_BAR: data = { ...commonData, type: 'bar', columns, groups, colors }; break;
      case STACKED_AREA: data = { ...commonData, columns, groups, types: areaSplineTypes, colors }; break;
      default: throw new Error(`Unsupported graph mode '${chartType}'`);
    }
    
    const axis: c3.Axis = {
      x: {
        type: 'timeseries',
        tick: {
          format: metric.timestampDisplayFormat,
        },
      },
    };

    const bar = { width: { ratio: 0.8 } };

    return { data, axis, bar };
  }

}