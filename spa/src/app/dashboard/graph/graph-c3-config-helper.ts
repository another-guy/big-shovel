import { Metric } from '../models/log-entry-key-extractors';

export class GraphC3ConfigHelper {

  constructor() {};

  getBaseConfigForTimeSeries(
    kind: string,
    metric: Metric,

    // Think about how to generalize these parameters
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
      xFormat: metric.parseFormat,
    };

    let data: c3.Data = null;
    switch (kind) {
      case 'stacked-bar': data = { ...commonData, type: 'bar', columns, groups, colors }; break;
      case 'stacked-area': data = { ...commonData, columns, groups, types: areaSplineTypes, colors }; break;
      case 'area': data = { ...commonData, columns, types: areaTypes, colors }; break;
      case 'line': data = { ...commonData, columns, colors }; break;
      case 'spline': data = { ...commonData, type: 'spline', columns, colors }; break;
      case 'step': data = { ...commonData, columns, types: stepTypes, colors }; break;
      case 'bar': data = { ...commonData, type: 'bar', columns, colors }; break;
      default: throw new Error(`Unsupported graph mode '${kind}'`);
    }
    
    const axis: c3.Axis = {
      x: {
        type: 'timeseries',
        tick: {
          format: metric.displayFormat,
        },
      },
    };

    const bar = { width: { ratio: 0.8 } };

    return { data, axis, bar };
  }

}