export const notImplemented = (input: object) => {
    throw new Error('Not Yet Implemented' + input)
}

export interface APIResponseBaseError extends APIResponseBase {
    messageStack: { [x: string]: string };
};

export const isAPIResponseBaseError = (err: any): err is APIResponseBaseError => "messageStack" in err

export interface APIResponseBase {
    status: number,
    success: boolean,
    message: string,
}



export const baseTransformErrorResponse = (err: any): APIResponseBaseError => {
    if ('data' in err) {
        return err.data as APIResponseBaseError;
    }
    return {
        messageStack: {},
        status: 500,
        message: err.error,
        success: false,
    } as APIResponseBaseError;
};