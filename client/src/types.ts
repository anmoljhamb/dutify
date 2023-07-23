import { RawAxiosRequestHeaders } from "axios";
import { User, UserCredential } from "firebase/auth";
import * as Yup from "yup";

export type FormField = {
    name: string;
    label: string;
} & (OtherFormField | OptionFormField);

interface OtherFormField {
    type: "text" | "password";
}

interface OptionFormField {
    type: "option";
    choices: string[] | UserDetails[];
    defaultValue?: string | UserDetails | null;
}
export type ValidationSchemaInterface = Yup.ObjectSchema<
    { [key: string]: string },
    Yup.AnyObject,
    { [key: string]: undefined },
    ""
>;

export interface BaseUser {
    email: string;
    name: string;
    password: string;
    role: string;
}

export interface FetchedUser {
    email: string;
    name: string;
    uid: string;
    role: string;
}

export type UserDetails = FetchedUser & {
    role: Role;
};

export interface Role {
    roleName: string;
    accessLevel: number;
}

export type Roles = Record<string, Role>;

export interface BaseEvent {
    name: string;
    desc: string;
}

export type FetchedEvent = BaseEvent & {
    uid: string;
    done: boolean;
};

export interface BaseTask {
    name: string;
    desc: string;
    projectId: string;
    assignedTo: string;
}

export interface AuthContextInterface {
    currentUser: User | null;
    logIn(email: string, password: string): Promise<UserCredential>;
    logOut(): Promise<void>;
    updateUserEmail(email: string): Promise<void>;
    updateUserPassword(password: string): Promise<void>;
    reauth(password: string): Promise<UserCredential>;
    forgotPassword(email: string): Promise<void>;
    userDetails: UserDetails | null;
    headers: RawAxiosRequestHeaders;
    token: string;
}

export interface MessageContextInterface {
    showMessage(
        message: string,
        messageType?: "error" | "info" | "success" | "warning",
        messageDuration?: number
    ): void;
}

export interface RoleContextInterface {
    getRole(uid: string): Role;
}
