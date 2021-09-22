import { Injectable } from '@angular/core';


@Injectable()
export class LogHelper {

  constructor() { }

  log(key: string, body: any): void {
	console.log(key, body);
  }
}
