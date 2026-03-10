import { getAllLevelData } from '../../db/queries/gameQueries';

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
        if (
            levelProgress.startedAt !== null &&
            levelProgress.finishedAt !== null
        ) {
            completedLevels += 1;
        }

        if (
            levelProgress.startedAt !== null &&
            levelProgress.finishedAt === null
        ) {
            currentLevel = levelProgress.level.orderIndex;
        }
    }

    if (currentLevel === null) {
        const nextLevel = completedLevels + 1;
        if (nextLevel <= currentProgress.levelCount) {
            currentLevel = await getAllLevelData(
                nextLevel,
                currentProgress.breakpointId,
            );
        }
    } else {
        currentLevel = await getAllLevelData(
            currentLevel,
            currentProgress.breakpointId,
        );
    }

    return { completed: completedLevels, current: currentLevel };
}
