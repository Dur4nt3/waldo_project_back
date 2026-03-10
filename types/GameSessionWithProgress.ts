import { Prisma } from '../generated/prisma/client';

import { includeProgressData } from '../db/utilities/includeConfig';

type GameSessionWithProgress = Prisma.GameSessionGetPayload<{
    include: typeof includeProgressData;
}>;

export default GameSessionWithProgress;
