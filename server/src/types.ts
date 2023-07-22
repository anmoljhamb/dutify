import * as Yup from "yup";

export type Role =
    | "Level 1"
    | "Level 2"
    | "Level 3"
    | "Level 4"
    | "Level 5"
    | "Level 6"
    | "Level 7";

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
