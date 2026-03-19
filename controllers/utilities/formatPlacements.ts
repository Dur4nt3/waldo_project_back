export default function formatPlacements(placements: any[]) {
    const formattedPlacements = [];
    let currentPlacement = 1;
    for (const player of placements) {
        if (formattedPlacements.length === 0) {
            const newPlayerData = { ...player, placement: currentPlacement };
            formattedPlacements.push(newPlayerData);
            continue;
        }

        if (
            player.score >
            formattedPlacements[formattedPlacements.length - 1].score
        ) {
            currentPlacement += 1;
            const newPlayerData = { ...player, placement: currentPlacement };
            formattedPlacements.push(newPlayerData);
        } else {
            const newPlayerData = { ...player, placement: currentPlacement };
            formattedPlacements.push(newPlayerData);
        }
    }

    return formattedPlacements;
}
