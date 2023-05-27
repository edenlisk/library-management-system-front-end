import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = () => {
    // const data = [
    //     {
    //         id: "Senior One",
    //         data: [
    //             {
    //                 x: 'math',
    //                 y: 20
    //             },
    //             {
    //                 x: 'physics',
    //                 y: 34
    //             },
    //             {
    //                 x: 'history',
    //                 y: 54
    //             },
    //             {
    //                 x: 'geography',
    //                 y: 46
    //             },
    //             {
    //                 x: 'literature',
    //                 y: 74
    //             },
    //             {
    //                 x: 'chemistry',
    //                 y: 34
    //             },
    //             {
    //                 x: 'english',
    //                 y: 59
    //             },
    //             {
    //                 x: 'novel',
    //                 y: 52
    //             },
    //             {
    //                 x: 'swahili',
    //                 y: 42
    //             },
    //             {
    //                 x: 'french',
    //                 y: 30
    //             },
    //             {
    //                 x: "comp science",
    //                 y: 38
    //             },
    //             {
    //                 x: "ent",
    //                 y: 46
    //             }
    //         ]
    //     },
    //     {
    //         id: "Senior Two",
    //         data: [
    //             {
    //                 x: 'math',
    //                 y: 145
    //             },
    //             {
    //                 x: 'physics',
    //                 y: 34
    //             },
    //             {
    //                 x: 'history',
    //                 y: 54
    //             },
    //             {
    //                 x: 'geography',
    //                 y: 46
    //             },
    //             {
    //                 x: 'literature',
    //                 y: 74
    //             },
    //             {
    //                 x: 'chemistry',
    //                 y: 34
    //             },
    //             {
    //                 x: 'english',
    //                 y: 59
    //             },
    //             {
    //                 x: 'novel',
    //                 y: 52
    //             },
    //             {
    //                 x: 'swahili',
    //                 y: 42
    //             },
    //             {
    //                 x: 'french',
    //                 y: 30
    //             },
    //             {
    //                 x: "comp science",
    //                 y: 38
    //             },
    //             {
    //                 x: "ent",
    //                 y: 46
    //             }
    //         ]
    //     },
    //
    //
    //
    // ]
    const data = [
        {
            "id": "Senior Two",
            "data": [
                {
                    "x": "mathematics",
                    "y": 0
                },
                {
                    "x": "biology",
                    "y": 0
                }
            ]
        },
        {
            "id": "Senior Three",
            "data": [
                {
                    "x": "biology",
                    "y": 0
                },
                {
                    "x": "mathematics",
                    "y": 1
                }
            ]
        },
        {
            "id": "Senior Four",
            "data": [
                {
                    "x": "biology",
                    "y": 1
                }
            ]
        },
        {
            "id": "Senior One",
            "data": [
                {
                    "x": "mathematics",
                    "y": 0
                },
                {
                    "x": "biology",
                    "y": 0
                }
            ]
        },
        {
            "id": "Other",
            "data": [
                {
                    "x": "novel",
                    "y": 3
                }
            ]
        }
    ]


    return (
        <ResponsiveLine
            data={data}
            curve="monotoneX"
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Number of rentals by category',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'category10' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            enableSlices="x"
            height={400}
            width={1000}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default MyResponsiveLine;