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



export const baseTransformErrorResponse = (err: any): APIErros => {
    if ('data' in err) {
        return err.data as APIErros;
    }
    return {
        messageStack: {},
        statusCode: 500,
        message: err.error
    };
};