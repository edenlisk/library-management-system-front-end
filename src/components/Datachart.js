import React from 'react';

import { ResponsiveLine } from '@nivo/line'


const MyResponsiveLine = () => {
    const data = [
        {
            "id": "Mon",
            "color": "hsl(149, 70%, 50%)",
            "data": [
                {
                    "x": "History",
                    "y": 2
                },
                {
                    "x": "Geography",
                    "y": 20
                },
                {
                    "x": "Mathematics",
                    "y": 48
                },
                {
                    "x": "Physics",
                    "y": 84
                },
                {
                    "x": "Computer Science",
                    "y": 16
                },
                {
                    "x": "English",
                    "y": 40
                }
            ]
        },
        {
            "id": "Tue",
            "color": "hsl(249, 70%, 50%)",
            "data": [
                {
                    "x": "History",
                    "y": 46
                },
                {
                    "x": "Geography",
                    "y": 19
                },
                {
                    "x": "Mathematics",
                    "y": 26
                },
                {
                    "x": "Physics",
                    "y": 31
                },
                {
                    "x": "Computer Science",
                    "y": 22
                },
                {
                    "x": "English",
                    "y": 40
                }
            ]
        },
        {
            "id": "Wed",
            "color": "hsl(327, 70%, 50%)",
            "data": [
                {
                    "x": "History",
                    "y": 17
                },
                {
                    "x": "Geography",
                    "y": 50
                },
                {
                    "x": "Mathematics",
                    "y": 49
                },
                {
                    "x": "Physics",
                    "y": 73
                },
                {
                    "x": "Computer Science",
                    "y": 53
                },
                {
                    "x": "English",
                    "y": 62
                }
            ]
        },
        {
            "id": "Thur",
            "color": "hsl(284, 70%, 50%)",
            "data": [
                {
                    "x": "History",
                    "y": 40
                },
                {
                    "x": "Geography",
                    "y": 34
                },
                {
                    "x": "Mathematics",
                    "y": 21
                },
                {
                    "x": "Physics",
                    "y": 32
                },
                {
                    "x": "Computer Science",
                    "y": 80
                },
                {
                    "x": "English",
                    "y": 61
                }
            ]
        },
        {
            "id": "Fri",
            "color": "hsl(163, 70%, 50%)",
            "data": [
                {
                    "x": "History",
                    "y": 62
                },
                {
                    "x": "Geography",
                    "y": 60
                },
                {
                    "x": "Mathematics",
                    "y": 48
                },
                {
                    "x": "Physics",
                    "y": 21
                },
                {
                    "x": "Computer Science",
                    "y": 52
                },
                {
                    "x": "English",
                    "y": 29
                }
            ]
        }
    ]

    return (
        <ResponsiveLine
            data={data}
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
                legend: 'transportation',
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
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
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