import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslationService } from './translationService';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    constructor(private translationService: TranslateService) {
        super();

        this.getAndInitTranslations();
    }

    getAndInitTranslations() {

        this.translationService.get('GENERAL.ITEM_PER_PAGE').subscribe(data => {
            this.itemsPerPageLabel = data;
        });
        this.changes.next();

    }

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} / ${length}`;
    }
}