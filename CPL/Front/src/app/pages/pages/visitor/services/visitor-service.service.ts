import { GenericServic } from 'src/app/core/services/GenericService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse, TablePagingIndex } from 'src/app/core/models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class VisitorService extends GenericServic<any, any, any, any>{


    GetRoles(): Observable<ServerResponse<TablePagingIndex<any>>> {
        return this.httpClient.post<ServerResponse<TablePagingIndex<any>>>(this.appConfig.apiEndpoint + '/RolesManager/Role/Filter', this.appConfig.defaultSearchParam);
    }

    UpdateAdminRoles(userId: number, rolesId: number[]): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint}/Visitor/Access`;
        return this.httpClient.post(Url, { userId, rolesId });
    }

    VerifyPhonenumber(phoneNumber, id): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint}/Visitor/PersonalInfo/PhoneVerification/${id}`;
        return this.httpClient.post(Url, { phoneNumber });
    }

    ChangeAccountInfo(email, confirmEmail,isActive, id): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint}/admin/Visitor/UpdateAccountInfo/${id}`;
        return this.httpClient.put(Url, { email, confirmEmail,isActive }).pipe(
            map(res => {
                if (res['success']) {
                    this.alertService.success('', res['message']);
                    return res;
                }
            })
        );
    }

} 