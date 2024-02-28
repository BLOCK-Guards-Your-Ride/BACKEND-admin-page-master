import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'translateCommon',
})
export class TranslateCommonPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: string): string {
    if (!value) {
      return '';
    }
    return this.translateService.instant(`APP.SHARED.PIPES.TRANSLATE_COMMON.${value.toString().toUpperCase()}`);
  }

}
