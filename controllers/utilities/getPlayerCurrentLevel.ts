import { getLevelByOrderIndex } from '../../db/queries/gameQueries';

import type GameSessionWithProgress from '../../types/GameSessionWithProgress';

export default async function getPlayerCurrentLevel(
    currentProgress: GameSessionWithProgress,
) {
    if (currentProgress.playerProgress.length === 0) {
        const level = await getLevelByOrderIndex(1);
        return { completed: [], current: level };
    }

    const completedLevels = [];
    let currentLevel = null;

    for (const levelProgress of currentProgress.playerProgress) {
        if (
            levelProgress.startedAt !== null &&
            levelProgress.finishedAt !== null
        ) {
            completedLevels.push(levelProgress);
        }

        if (
            levelProgress.startedAt !== null &&
            levelProgress.finishedAt === null
        ) {
            currentLevel = levelProgress.level;
        }
    }

    if (currentLevel === null) {
        const nextLevel = completedLevels.length + 1;
        if (nextLevel <= currentProgress.levelCount) {
            currentLevel = await getLevelByOrderIndex(nextLevel);
        }
    }

    return { completed: completedLevels, current: currentLevel };
}
