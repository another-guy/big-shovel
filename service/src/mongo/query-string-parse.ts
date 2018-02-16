import { ObjectID } from "mongodb";

export function parseObjectFromString(objectAsString: string): any {
  if (!objectAsString)
    return null;

  const queryObject = JSON.parse(objectAsString);
  if (queryObject._id)
    queryObject._id = new ObjectID(queryObject._id);
  return queryObject;
}
