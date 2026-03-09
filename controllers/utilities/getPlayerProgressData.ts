import { getAllLevelData } from '../../db/queries/levelQueries';

import type GameSessionWithProgress from '../../types/GameSessionWithProgress';

export default async function getPlayerProgressData(
    currentProgress: GameSessionWithProgress,
) {
    let completedLevels = 0;
    let currentLevel = null;

    for (const levelProgress of currentProgress.playerProgress) {
        const { startedAt, finishedAt, level } = levelProgress;

        if (startedAt !== null && finishedAt !== null) {
            completedLevels += 1;
        }

        if (startedAt !== null && finishedAt === null) {
            currentLevel = level.orderIndex;
        }
    }

    // If currentLevel is null
    // The player still hasn't started the next level
    // Return null to indicate such
    if (currentLevel !== null) {
        currentLevel = await getAllLevelData(
            currentLevel,
            currentProgress.breakpointId,
        );
    }

    return {
        completed: completedLevels,
        total: currentProgress.levelCount,
        current: currentLevel,
    };
}
