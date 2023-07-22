import * as Yup from "yup";

export type ValidationSchema = Yup.ObjectSchema<
    {
        body: any;
        params: any;
        query: any;
    },
    Yup.AnyObject
>;

export interface User {
    email: string;
    name: string;
    password: string;
    role: string;
}

export interface Role {
    roleName: string;
    accessLevel: number;
}

export type Roles = Record<string, Role>;
