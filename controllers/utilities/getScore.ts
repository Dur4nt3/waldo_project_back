export default function getScore(finishedLevels: any[]) {
    let cumulativeScore = 0;
    for (const level of finishedLevels) {
        cumulativeScore +=
            new Date(level.finishedAt).getTime() -
            new Date(level.startedAt).getTime();
    }

    return cumulativeScore;
}
