
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';;
import { map } from 'rxjs/operators';
import { GenericServic } from 'src/app/core/services/GenericService';

@Injectable({
    providedIn: 'root'
})
export class DiscountService extends GenericServic<any, any, any, any>{

} 