import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { FieldIsValidType, TariffPeriodType } from '../../../shared/models/station';

@Component({
  selector: 'app-tariff-list',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.scss'],
})
export class TariffListComponent implements OnInit {

  tariffTypes = [
    'ABSOLUTE',
    'RELATIVE',
  ];

  public selectedTypes: string[] = [];
  public tariffFieldStates: boolean[] = [];

  @Input() public tariffPeriodList: TariffPeriodType[];
  @Output() public tariffFormIsValidEmitter: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();
  @Output() tariffIntervalTypesEmitter: EventEmitter<TariffPeriodType[]> = new EventEmitter<TariffPeriodType[]>();

  constructor() {
  }

  ngOnInit(): void {
    if (isNotNullOrUndefined(this.tariffPeriodList)) {
      this.tariffPeriodList.forEach(value => {
        this.selectedTypes.push(value.tariffType);
      });
    }
  }

  getTariffFormIsValid(isValid: FieldIsValidType) {
    if (this.tariffFieldStates[isValid.id] == undefined) {
      this.tariffFieldStates.push(isValid.state);
    } else {
      this.tariffFieldStates[isValid.id] = isValid.state;
    }

    this.tariffFormIsValidEmitter.emit(this.tariffFieldStates);
  }


  getTariffIntervalTypes(items: TariffPeriodType) {
    if (isNotNullOrUndefined(this.tariffPeriodList) && !this.tariffPeriodList.includes(items)) {
      this.tariffPeriodList.push(items);
    }
    this.tariffIntervalTypesEmitter.emit(this.tariffPeriodList);
  }

  spliceIntervalType(id: number) {
    this.tariffPeriodList.splice(id, 1);
    this.selectedTypes.splice(id, 1);
    this.tariffFieldStates.splice(id, 1);
  }

  createTariff(tariffType: string) {
    this.selectedTypes.push(tariffType);
  }
}
