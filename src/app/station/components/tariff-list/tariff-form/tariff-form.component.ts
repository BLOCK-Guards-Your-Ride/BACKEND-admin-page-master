import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { FieldIsValidType, TariffIntervalType, TariffPeriodType } from '../../../../shared/models/station';

@Component({
  selector: 'app-tariff-form',
  templateUrl: './tariff-form.component.html',
  styleUrls: ['./tariff-form.component.scss'],
})
export class TariffFormComponent implements OnInit {

  @Input() public tariffType: string;
  @Input() public tariffTypeId: number;
  @Input() public tariffPeriodList: TariffPeriodType;
  @Output() public tariffTypes: EventEmitter<TariffPeriodType> = new EventEmitter<TariffPeriodType>();
  @Output() public tariffFormIsValid: EventEmitter<FieldIsValidType> = new EventEmitter<FieldIsValidType>();

  fromTime = '';
  toTime = '';

  tariffIntervalTypes: TariffIntervalType[] = [];
  tariffFieldStates: boolean[] = [];

  fromTimeIsOk = false;
  toTimeIsOk = false;
  priceIsOk = false;
  intervalFromTimeIsOk = false;
  intervalToTimeIsOk = false;
  intervalFromIsOk = false;
  intervalToIsOk = false;

  tariffPeriodType: TariffPeriodType = {
    fromTime: this.fromTime,
    toTime: this.toTime,
    tariffType: this.tariffType,
    tariffIntervalList: this.tariffIntervalTypes,
  };

  constructor() {
  }

  ngOnInit(): void {
    if (!isNotNullOrUndefined(this.tariffPeriodList)) {
      this.tariffPeriodType.tariffType = this.tariffType;
      this.tariffPeriodList = this.tariffPeriodType;
      this.pushTariffIntervalType();
    } else {
      this.tariffPeriodList.fromTime = this.tariffPeriodList.fromTime.substring(0, 10);
      this.tariffPeriodList.toTime = this.tariffPeriodList.toTime.substring(0, 10);
    }

    if (this.tariffType == 'ABSOLUTE') {
      this.tariffPeriodList.tariffIntervalList.forEach(value => {
        value.fromTime = value.fromTime?.substring(0, 5);
        value.toTime = value.toTime?.substring(0, 5);
      });
    }

    setTimeout(() => {
      this.emitData();
    }, 100);

    this.validateFromTime();
    this.validateToTime();
    this.validatePrice();

    if (this.tariffType == 'ABSOLUTE') {
      this.validateIntervalFromTime();
      this.validateIntervalToTime();
    } else {
      this.validateIntervalFrom();
      this.validateIntervalTo();
    }
  }

  updateFromTime(time: string) {
    this.tariffPeriodList.fromTime = time;
    this.emitData();
    this.validateFromTime();
  }

  updateToTime(time: string) {
    this.tariffPeriodList.toTime = time;
    this.emitData();
    this.validateToTime();
  }

  updatePrice() {
    this.validatePrice();
  }

  updateIntervalFromTime() {
    this.validateIntervalFromTime();
  }

  updateIntervalToTime() {
    this.validateIntervalToTime();
  }

  updateIntervalFrom() {
    this.validateIntervalFrom();
  }

  updateIntervalTo() {
    this.validateIntervalTo();
  }

  pushTariffIntervalType() {
    if (this.tariffType == 'RELATIVE') {
      this.tariffPeriodList.tariffIntervalList.push({
        from: null,
        to: null,
        price: null,
      });
    } else {
      this.tariffPeriodList.tariffIntervalList.push({
        fromTime: null,
        toTime: null,
        price: null,
      });
    }
  }

  spliceIntervalType(id: number) {
    this.tariffPeriodList.tariffIntervalList.splice(id, 1);
    if (this.tariffType == 'ABSOLUTE') {
      this.validateIntervalFromTime();
      this.validateIntervalToTime();
    } else {
      this.validateIntervalFrom();
      this.validateIntervalTo();
    }
    this.validatePrice();
  }

  createTariffIntervalType() {
    this.pushTariffIntervalType();
    this.emitData();
    if (this.tariffType == 'ABSOLUTE') {
      this.validateIntervalFromTime();
      this.validateIntervalToTime();
    } else {
      this.validateIntervalFrom();
      this.validateIntervalTo();
    }
    this.validatePrice();
  }

  emitData() {
    this.tariffTypes.emit(this.tariffPeriodList);
  }

  emitStates() {
    this.tariffFormIsValid.emit({ id: this.tariffTypeId, state: this.tariffFieldStates.length == 0 });
  }

  validateFromTime() {
    if (!isNotNullOrUndefined(this.tariffPeriodList.fromTime) || this.tariffPeriodList.fromTime == '') {
      if (!this.fromTimeIsOk) {
        this.fromTimeIsOk = true;
        this.tariffFieldStates.push(false);
      }
    } else {
      if (this.fromTimeIsOk) {
        this.fromTimeIsOk = false;
        this.tariffFieldStates.pop();
      }
    }
    this.emitStates();
  }

  validateToTime() {
    if (!isNotNullOrUndefined(this.tariffPeriodList.toTime) || this.tariffPeriodList.toTime == '') {
      if (!this.toTimeIsOk) {
        this.toTimeIsOk = true;
        this.tariffFieldStates.push(false);
      }
    } else {
      if (this.toTimeIsOk) {
        this.toTimeIsOk = false;
        this.tariffFieldStates.pop();
      }
    }
    this.emitStates();
  }

  validatePrice() {
    this.tariffPeriodList.tariffIntervalList.forEach(value => {
      if (value.price == null) {
        if (!this.priceIsOk) {
          this.priceIsOk = true;
          this.tariffFieldStates.push(false);
        }
      } else {
        if (this.priceIsOk) {
          this.priceIsOk = false;
          this.tariffFieldStates.pop();
        }
      }
    });
    this.emitStates();
  }

  validateIntervalFromTime() {
    this.tariffPeriodList.tariffIntervalList.forEach(value => {
      if (value.fromTime == null || value.fromTime.trim() == '') {
        if (!this.intervalFromTimeIsOk) {
          this.intervalFromTimeIsOk = true;
          this.tariffFieldStates.push(false);
        }
      } else {
        if (this.intervalFromTimeIsOk) {
          this.intervalFromTimeIsOk = false;
          this.tariffFieldStates.pop();
        }
      }
    });
    this.emitStates();
  }

  validateIntervalToTime() {
    this.tariffPeriodList.tariffIntervalList.forEach(value => {
      if (value.toTime == null || value.toTime.trim() == '') {
        if (!this.intervalToTimeIsOk) {
          this.intervalToTimeIsOk = true;
          this.tariffFieldStates.push(false);
        }
      } else {
        if (this.intervalToTimeIsOk) {
          this.intervalToTimeIsOk = false;
          this.tariffFieldStates.pop();
        }
      }
    });
    this.emitStates();
  }

  validateIntervalTo() {
    this.tariffPeriodList.tariffIntervalList.forEach(value => {
      if (!isNotNullOrUndefined(value.to) || value.to == null) {
        if (!this.intervalToIsOk) {
          this.intervalToIsOk = true;
          this.tariffFieldStates.push(false);
        }
      } else {
        if (this.intervalToIsOk) {
          this.intervalToIsOk = false;
          this.tariffFieldStates.pop();
        }
      }
    });
    this.emitStates();
  }

  validateIntervalFrom() {
    this.tariffPeriodList.tariffIntervalList.forEach(value => {
      if (!isNotNullOrUndefined(value.from) || value.from == null) {
        if (!this.intervalFromIsOk) {
          this.intervalFromIsOk = true;
          this.tariffFieldStates.push(false);
        }
      } else {
        if (this.intervalFromIsOk) {
          this.intervalFromIsOk = false;
          this.tariffFieldStates.pop();
        }
      }
    });
    this.emitStates();
  }
}
