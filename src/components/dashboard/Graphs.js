import React from "react";
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'


const data = [
    {
        id: "returned",
        label: "Returned",
        value: 94,
        color: "hsl(142, 70%, 50%)"
    },
    {
        id: "issued",
        label: "Issued",
        value: 143,
        color: "hsl(194,70%,50%)"
    },
    // {
    //     "id": "python",
    //     "label": "python",
    //     "value": 579,
    //     "color": "hsl(101, 70%, 50%)"
    // },
    // {
    //     "id": "elixir",
    //     "label": "elixir",
    //     "value": 426,
    //     "color": "hsl(8, 70%, 50%)"
    // },
    // {
    //     "id": "css",
    //     "label": "css",
    //     "value": 48,
    //     "color": "hsl(342, 70%, 50%)"
    // }
]

export const MyResponsivePie = () => {

    const data = [
        {
            id: "returned",
            label: "Returned",
            value: 94,
            color: "hsl(142, 70%, 50%)"
        },
        {
            id: "issued",
            label: "Issued",
            value: 143,
            color: "hsl(194,70%,50%)"
        }
    ]

    return (
        <ResponsivePie
            width={400}
            height={300}
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{ scheme: 'category10' }}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 10,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}


export const MyResponsiveLine = () => {
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
