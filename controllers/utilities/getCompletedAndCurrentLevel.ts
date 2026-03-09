import type GameSessionWithProgress from '../../types/GameSessionWithProgress';

export default function getCompletedAndCurrentLevel(
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

    return { completed: completedLevels, currentLevel };
}
