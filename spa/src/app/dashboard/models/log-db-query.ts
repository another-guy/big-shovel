
export interface LogDbQuery {
  query: string;
  sortOptions: any;
}

const QUERY_KEY = 'q';
const SORT_KEY = 's';

export function toStringRepresentation(logDbQuery: LogDbQuery): string {
  return `${QUERY_KEY}=${logDbQuery.query}&${SORT_KEY}=${logDbQuery.sortOptions}`;
}

export function toLogDbQuery(logDbQueryStringRepresentation: string): LogDbQuery {
  const parts = logDbQueryStringRepresentation.split('&');

  const findPartByKey = (key: string) => {
    const fullKey = `${key}=`;
    const matchingPart = parts.find(part => part.indexOf(fullKey) === 0);
    return matchingPart.substring(fullKey.length);
  }

  return {
    query: findPartByKey(QUERY_KEY),
    sortOptions: findPartByKey(SORT_KEY),
  };
}
