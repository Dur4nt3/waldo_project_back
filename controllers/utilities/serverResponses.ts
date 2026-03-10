import type { Response } from 'express';

export function error500(res: Response) {
    return res.status(500).json({
        success: false,
        message: 'Internal server error!',
    });
}

export function error401(res: Response) {
    return res.status(401).json({
        success: false,
        message: 'Could not validate session!',
    });
}

export function error403(res: Response) {
    return res.status(403).json({
        success: false,
        message: 'You are not allowed to perform this action',
    });
}