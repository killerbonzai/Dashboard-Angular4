import { Injectable } from '@angular/core';

@Injectable()
export class GroupsService {

  group: Boolean = false;
  amount: Number = 0;
  amountArray: Number[] = [];
  groupRanges: Map<Number, GroupRange> = new Map<Number, GroupRange>();
  groupRangesLabel: Map<Number, String> = new Map<Number, String>();

  constructor() { }

  numberToArray(num): void {
    this.amountArray = Array.apply(null, Array(Number.parseInt(num))).map(function (_, i) { return i; });
  }

  addGroupRange(i: Number, val: String) {
    try {
      let s = val.split(',');
      if (s.length == 2) {
        let r = new GroupRange(Number.parseInt(s[0]), Number.parseInt(s[1]));

        this.groupRanges.set(i, r);
      }
    } catch (e) {
    }
  }

  addGroupRangeLabel(i: Number, val: String) {
    this.groupRangesLabel.set(i, val);
  }

  reset(){
    this.groupRanges = new Map<Number, GroupRange>();
    this.groupRangesLabel = new Map<Number, String>();
  }

}

class GroupRange {
  start: Number;
  end: Number;

  constructor(start: Number, end: Number) {
    this.start = start;
    this.end = end;
  }
}