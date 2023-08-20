import { DataState } from "./apiTypes";
import { ChangeEvent, FormEvent } from "react";


export interface AuthState {

        is_Useremail : string;
        is_Password? : string;
        is_Username? : string;
        is_Userflag? : string;
        is_Password_check? : string;
}

export interface UserState {
        useremail : string;
        userflag : string;
        username : string;
        userpassword : string;
}

export interface UserInfoState {
        useremail : string;
        username:string;
        userflag:string;
}

export interface AuthApiState {
        duplicationCheck: ({ is_Useremail }: AuthState) => Promise<number>,
        signup: ({ is_Username, is_Useremail, is_Password }: AuthState) => Promise<string>,
        signin: ({ is_Useremail, is_Password }: AuthState) => Promise<any>,
        sessionState: ({ is_Useremail, is_Username, is_Userflag }: AuthState) => Promise<number>,
        sessionConfirm: () => Promise<UserInfoState>,
        deleteUser: (is_Useremail: string) => Promise<DataState>,
        emailAuth: (email: string) => Promise<{randomNum :number}>,
        modifyPassword: (email: string, password: string) => Promise<DataState>,
        authUser: (email: string) => Promise<DataState>,
        testUser: (email: string, password: string) => Promise<any>,
        modifyUsername: (useremail: string, username: string) => Promise<DataState>
      }

export interface RegisterUserViewState {
        registerData: {
                authMail: string;
                onChange: () => void;
                password: string;
                onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
                passwordCheck: string;
                onPasswordCheckChange: (e: ChangeEvent<HTMLInputElement>) => void;
                userName: string;
                onUserNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
                onSubmit: (event: FormEvent<HTMLFormElement>) => void;
        };
};

export interface LoginFormViewState {
        email: string;
        onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
        password: string;
        onPwChange: (e: ChangeEvent<HTMLInputElement>) => void;
        handleTestUser:() => Promise<void>;
        onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export interface PasswordChangeFormViewState{
        password: string;
        onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
        passwordCheck: string;
        onPasswordCheckChange: (e: ChangeEvent<HTMLInputElement>) => void;
        handleEditPassword: () => Promise<any>;
};
export interface EmailAuthViewState {
        step: string;
        authNum: string;
        authMail: string;
        onAuthNumChange: (e: ChangeEvent<HTMLInputElement>) => void;
        onAuthMailChange: (e: ChangeEvent<HTMLInputElement>) => void;
        handleEmailAuth: () => Promise<any>;
        handleAuthCheck: () => Promise<any>;
};

export interface MyPageViewState {
        userInfo: UserInfoState;
        editName: string;
        onEditNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
        editedName: string | null;
        active: boolean;
        handleActiveCancel: () => void;
        handleEdit:()=>void,
        handleActive:()=>void,
        handleUserDelete:() => Promise<void>,
        handleChangeUserLocation: () => Promise<boolean>,
};