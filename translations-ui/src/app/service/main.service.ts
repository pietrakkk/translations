import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Translation } from "../models/translation";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public showEditResult = new Subject<Object>();

  setEditResultFlag(value: Object) {
    this.showEditResult.next(value);
  }

  constructor() { }
}
