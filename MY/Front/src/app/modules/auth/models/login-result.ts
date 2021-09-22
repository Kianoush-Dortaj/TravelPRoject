export interface LoginResult {
    hash: string;
    isTowfactor: boolean;
    token: string;
    userInfo: UserInfo;
    displayName: string;
}

export interface UserInfo {
    displayName: string;
}