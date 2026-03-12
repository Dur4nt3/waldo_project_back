import { getAllLevelData } from '../../db/queries/levelQueries';

import type GameSessionWithProgress from '../../types/GameSessionWithProgress';

export default async function getPlayerCurrentLevel(
    currentProgress: GameSessionWithProgress,
) {
    if (currentProgress.playerProgress.length === 0) {
        const level = await getAllLevelData(1, currentProgress.breakpointId);
        return { completed: [], current: level };
    }

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

    return { completed: completedLevels, current: currentLevel };
}
