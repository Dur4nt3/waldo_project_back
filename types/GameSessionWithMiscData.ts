import { Prisma } from '../generated/prisma/client';

import { includeMiscSessionData } from '../db/utilities/includeConfig';

type GameSessionWithMiscData = Prisma.GameSessionGetPayload<{
    include: typeof includeMiscSessionData;
}>;

export default GameSessionWithMiscData;
