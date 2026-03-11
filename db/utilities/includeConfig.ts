const includeProgressData = {
    playerProgress: {
        include: {
            level: {
                include: {
                    image: true,
                },
            },
        },
    },
};

const includeMiscSessionData = {
    player: true,
    breakpoint: true,
};

export { includeProgressData, includeMiscSessionData };
