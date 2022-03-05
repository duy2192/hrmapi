import { Response } from 'express';

export const success = (res: Response, data: any,pagination?:any) => {
    return res.status(200).json({
        message: 'OK',
        statusCode: 200,
        success: true,
        results: data,
        pagination:pagination
    })
}

export const error = (res: Response, msg: string, status: number = 400) => {
    return res.status(status).json({
        message: msg,
        statusCode: status,
        success: false,
    })
}

export const done = (res: Response, msg: string) => {
    return res.status(200).json({
        message: msg,
        statusCode: 200,
        success: true,
        
    })
}
