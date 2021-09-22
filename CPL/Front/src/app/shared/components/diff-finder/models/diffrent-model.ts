export interface DeiffrentModel {
    id: number;
    tableName: string;
    keyValues: any;
    oldValues: any;
    newValues: any;
    auditType: string;
    displayName:string;
    createdOnUtc: string;
    createdByRefId: number;
}