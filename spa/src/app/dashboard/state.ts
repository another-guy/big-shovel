export interface LogEntries { // TODO
}

export interface State {
  allLogs: { [expression: string]: LogEntries };
}

export const initialState: State = {
  allLogs: { },
};
