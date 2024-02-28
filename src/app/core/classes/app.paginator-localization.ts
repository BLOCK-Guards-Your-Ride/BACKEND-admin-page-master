import { MatPaginatorIntl } from '@angular/material/paginator';
import {
  LangChangeEvent,
  TranslateService,
} from '@ngx-translate/core';
import { first } from 'rxjs/operators';

class PaginationLocalizer extends MatPaginatorIntl {

  constructor(private translateService: TranslateService) {
    super();
    this.translateService.get('APP.LIST.PAGINATOR.ITEMS_PER_PAGE').pipe(first())
      .subscribe((translation: string) => {
        this.itemsPerPageLabel = translation;
      });

    this.translateService.get('APP.LIST.PAGINATOR.NEXT_PAGE').pipe(first())
      .subscribe((translation: string) => {
        this.nextPageLabel = translation;
      });

    this.translateService.get('APP.LIST.PAGINATOR.PREVIOUS_PAGE').pipe(first())
      .subscribe((translation: string) => {
        this.previousPageLabel = translation;
      });

    this.translateService.onLangChange.subscribe((lang: LangChangeEvent) => {
      this.itemsPerPageLabel = lang.translations.APP.LIST.PAGINATOR.ITEMS_PER_PAGE;
      this.nextPageLabel = lang.translations.APP.LIST.PAGINATOR.NEXT_PAGE;
      this.previousPageLabel = lang.translations.APP.LIST.PAGINATOR.PREVIOUS_PAGE;
      this.changes.next();
    });
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    const maxLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < maxLength
      ? Math.min(startIndex + pageSize, maxLength)
      : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${maxLength}`;
  }
}

export function paginationLocalizer(trans: TranslateService) {
  return new PaginationLocalizer(trans);
}
