import { Injectable } from "@angular/core";

@Injectable()
export class IdGenerator {
  
  static _uniqueNumber = 1;

  get nextNumber(): number {
    return IdGenerator._uniqueNumber++;
  }

  get nextString(): string {
    return this.nextNumber.toString();
  }
}
