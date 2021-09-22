import { GenericServic } from 'src/app/core/services/GenericService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse, TablePagingIndex } from 'src/app/core/models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService extends GenericServic<any, any, any, any>{


    GetRoles(): Observable<ServerResponse<TablePagingIndex<any>>> {
        return this.httpClient.post<ServerResponse<TablePagingIndex<any>>>(this.appConfig.apiEndpoint + '/RolesManager/Role/Filter', this.appConfig.defaultSearchParam);
    }

    UpdateAdminRoles(userId: number, rolesId: number[]): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint}/User/Access`;
        return this.httpClient.post(Url, { userId, rolesId });
    }

    VerifyPhonenumber(phoneNumber, id): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint}/User/PersonalInfo/PhoneVerification/${id}`;
        return this.httpClient.post(Url, { phoneNumber });
    }

    ChangeAccountInfo(userName, confirmuserName,isActive,isWriter, id): Observable<any> {
        const Url = `${this.appConfig.apiEndpoint}/admin/User/updateAccountInfo/${id}`;
        return this.httpClient.put(Url, { userName, confirmuserName,isWriter,isActive }).pipe(
            map(res => {
                if (res['success']) {
                    this.alertService.success('', res['message']);
                    return res;
                }
            })
        );
    }

} 