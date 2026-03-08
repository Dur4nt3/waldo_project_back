import { prisma } from '../../lib/prisma';

async function main() {
    try {
        await prisma.characterLocation.createMany({
            data: [
                {
                    characterId: 1,
                    breakpointId: 1,
                    xMin: 0.43365367562597795,
                    xMax: 0.4343747347476639,
                    yMin: 0.3280009258300117,
                    yMax: 0.413298846309406,
                },
                {
                    characterId: 1,
                    breakpointId: 2,
                    xMin: 0.4296345350035905,
                    xMax: 0.43212370997906263,
                    yMin: 0.3263283742142204,
                    yMax: 0.3867789319022745,
                },
                {
                    characterId: 1,
                    breakpointId: 3,
                    xMin: 0.43215371517224055,
                    xMax: 0.4326619001054633,
                    yMin: 0.3274999220705516,
                    yMax: 0.3941089296715707,
                },
                {
                    characterId: 1,
                    breakpointId: 4,
                    xMin: 0.4326686610840687,
                    xMax: 0.43480414037211795,
                    yMin: 0.3286588785077498,
                    yMax: 0.39350006728211223,
                },
                {
                    characterId: 1,
                    breakpointId: 5,
                    xMin: 0.4301122551314623,
                    xMax: 0.431640625,
                    yMin: 0.3209403459490155,
                    yMax: 0.39333585978841357,
                },

                {
                    characterId: 2,
                    breakpointId: 1,
                    xMin: 0.7061964256809048,
                    xMax: 0.7108354269905126,
                    yMin: 0.7703300929056365,
                    yMax: 0.8813019481956662,
                },
                {
                    characterId: 2,
                    breakpointId: 2,
                    xMin: 0.7107044674289565,
                    xMax: 0.7190730063735383,
                    yMin: 0.7777339504539348,
                    yMax: 0.9311429583181491,
                },
                {
                    characterId: 2,
                    breakpointId: 3,
                    xMin: 0.7106701815063635,
                    xMax: 0.7171875,
                    yMin: 0.7753645788182526,
                    yMax: 0.9320623381301028,
                },
                {
                    characterId: 2,
                    breakpointId: 4,
                    xMin: 0.709898472309843,
                    xMax: 0.7161458333333334,
                    yMin: 0.7846973820620844,
                    yMax: 0.9410803617731323,
                },
                {
                    characterId: 2,
                    breakpointId: 5,
                    xMin: 0.7119140625,
                    xMax: 0.71484375,
                    yMin: 0.7843877479018906,
                    yMax: 0.9397839130474207,
                },

                {
                    characterId: 3,
                    breakpointId: 1,
                    xMin: 0.5968124252574936,
                    xMax: 0.5972209983503872,
                    yMin: 0.39751799306743374,
                    yMax: 0.43189624777041397,
                },
                {
                    characterId: 3,
                    breakpointId: 2,
                    xMin: 0.6002926984865135,
                    xMax: 0.6017857142857143,
                    yMin: 0.392831619911029,
                    yMax: 0.4310533271650906,
                },
                {
                    characterId: 3,
                    breakpointId: 3,
                    xMin: 0.5997366196551157,
                    xMax: 0.6047591003410654,
                    yMin: 0.39167357124368823,
                    yMax: 0.4343265508500614,
                },
                {
                    characterId: 3,
                    breakpointId: 4,
                    xMin: 0.5912277740758605,
                    xMax: 0.5921134385349794,
                    yMin: 0.3936289100482883,
                    yMax: 0.4275116136047837,
                },
                {
                    characterId: 3,
                    breakpointId: 5,
                    xMin: 0.5661880430430161,
                    xMax: 0.5686880382178942,
                    yMin: 0.39193698788749576,
                    yMax: 0.42616281960463354,
                },

                {
                    characterId: 4,
                    breakpointId: 1,
                    xMin: 0.8203187750455682,
                    xMax: 0.8218105752187038,
                    yMin: 0.6297192175505298,
                    yMax: 0.6682022624956726,
                },
                {
                    characterId: 4,
                    breakpointId: 2,
                    xMin: 0.8283464916716036,
                    xMax: 0.8321428571428572,
                    yMin: 0.6330239034641464,
                    yMax: 0.6691172966857092,
                },
                {
                    characterId: 4,
                    breakpointId: 3,
                    xMin: 0.830712547367812,
                    xMax: 0.8345257277765882,
                    yMin: 0.6361340110387298,
                    yMax: 0.6740820013437285,
                },
                {
                    characterId: 4,
                    breakpointId: 4,
                    xMin: 0.7967613776625236,
                    xMax: 0.8022138822107897,
                    yMin: 0.6345417482333527,
                    yMax: 0.6721735537376538,
                },
                {
                    characterId: 4,
                    breakpointId: 5,
                    xMin: 0.7231954600862645,
                    xMax: 0.7264942902296385,
                    yMin: 0.6356156982651978,
                    yMax: 0.6757362056344778,
                },

                {
                    characterId: 5,
                    breakpointId: 1,
                    xMin: 0.5324175226651725,
                    xMax: 0.5372189563676034,
                    yMin: 0.17254792571932262,
                    yMax: 0.199241538564812,
                },
                {
                    characterId: 5,
                    breakpointId: 2,
                    xMin: 0.5328620614926892,
                    xMax: 0.5364471316205756,
                    yMin: 0.1598448893914934,
                    yMax: 0.18626837309828662,
                },
                {
                    characterId: 5,
                    breakpointId: 3,
                    xMin: 0.5321901572498231,
                    xMax: 0.535841116701927,
                    yMin: 0.15452850837037257,
                    yMax: 0.1836066930739131,
                },
                {
                    characterId: 5,
                    breakpointId: 4,
                    xMin: 0.5329847590732961,
                    xMax: 0.5353090315748422,
                    yMin: 0.15448479065872797,
                    yMax: 0.18259182738931495,
                },
                {
                    characterId: 5,
                    breakpointId: 5,
                    xMin: 0.5335744606535581,
                    xMax: 0.53515625,
                    yMin: 0.15021208193910873,
                    yMax: 0.17738878858203824,
                },

                {
                    characterId: 6,
                    breakpointId: 1,
                    xMin: 0.317155342791245,
                    xMax: 0.31865876808977966,
                    yMin: 0.801443820770321,
                    yMax: 0.8147549315623039,
                },
                {
                    characterId: 6,
                    breakpointId: 2,
                    xMin: 0.31052837204569367,
                    xMax: 0.31361564268268977,
                    yMin: 0.8118404983260741,
                    yMax: 0.8289198268598111,
                },
                {
                    characterId: 6,
                    breakpointId: 3,
                    xMin: 0.3102568189824254,
                    xMax: 0.3121910254449518,
                    yMin: 0.8146849480922769,
                    yMax: 0.8321316297271705,
                },
                {
                    characterId: 6,
                    breakpointId: 4,
                    xMin: 0.3092939976860582,
                    xMax: 0.31129826173902875,
                    yMin: 0.8154523909573895,
                    yMax: 0.8364051668172722,
                },
                {
                    characterId: 6,
                    breakpointId: 5,
                    xMin: 0.30711762876318766,
                    xMax: 0.3095703125,
                    yMin: 0.8175045559962008,
                    yMax: 0.8390145767334336,
                },
            ],
        });

        console.log('Character locations seeded successfully!');
    } catch (error) {
        console.error(
            '------------------Initialization Error------------------',
        );
        console.error(error);
        console.error(
            '------------------Initialization Error------------------',
        );
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
