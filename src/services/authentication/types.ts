export type authMessage = {
    status: string;
    message: string;
};

export type InputSignUp = {
    firstname: string;
    lastname : string;
    email: string;
    password: string;
};

export type InputSignIn = {
    email: string;
    password: string;
}