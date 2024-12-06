export const notImplemented = (input: object) => {
    throw new Error('Not Yet Implemented' + input)
}

export type APIErros = {
    statusCode: number;
    message: string;
    messageStack: { [x: string]: string };
}

export type APIResponseBase = {
    status: number,
    success: boolean,
    message: string,
}