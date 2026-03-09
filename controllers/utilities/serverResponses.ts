import type { Response } from 'express';

export function error500(res: Response) {
    return res.status(500).json({
        success: false,
        message: 'Internal server error!',
    });
}
