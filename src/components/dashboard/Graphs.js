import React, {useEffect, useState} from "react";
import {ResponsiveLine} from '@nivo/line';
import {ResponsivePie} from '@nivo/pie';
import {useWeeklyStatsQuery, useOverallStatsQuery} from "../../states/apiSlice";
import {Box} from "@mui/material";
import {Bars} from "react-loader-spinner";
import {toast} from "react-toastify";


export const MyResponsivePie = () => {
    const {data: rows, isSuccess, isLoading} = useWeeklyStatsQuery();
    const [data, setData] = useState([]);
    useEffect(() => {
        if (isSuccess) {
            const {data: weeklyStats} = rows;
            const {response} = weeklyStats;
            setData(response);
        }
    }, [isSuccess, data]);

    const datum = [
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
        isLoading ?
            <Box>
                <Bars
                    height="180"
                    width="120"
                    color="#FFE3A3"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </Box>
            :
            <ResponsivePie
                width={400}
                height={300}
                data={data}
                margin={{top: 40, right: 40, bottom: 80, left: 60}}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{scheme: 'category10'}}
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
                arcLinkLabelsTextColor="#068DA9"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{from: 'color'}}
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
    const {data: rows, isSuccess, isLoading, isError, error} = useOverallStatsQuery();
    const [data, setData] = useState([]);
    useEffect(() => {
        if (isSuccess) {
            const {data} = rows;
            const {numberOfRentalsByCategory} = data;
            setData(numberOfRentalsByCategory)
        } else if (isError) {
            const {data: fullError} = error;
            const {message} = fullError;
            toast.error(message)
        }
    }, [isSuccess, data, isError, error]);

    return (
        <>
            <ResponsiveLine
                data={data}
                curve="monotoneX"
                margin={{top: 10, right: 10, bottom: 70, left: 60}}
                xScale={{type: 'point'}}
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
                    tickSize: 3,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Number of rentals by category',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    renderTick: (tick, index) => (
                        <g transform={`translate(${tick.x},${tick.y + 22})`}>
                            <text
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{ fill: index === 0 ? 'red' : '#F9E2AF', fontSize: 10 }}
                            >
                                {tick.value.split(' ').length > 0 ? tick.value.split(' ')[0] : tick.value }
                            </text>
                        </g>
                    ),
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    renderTick: (tick) => (
                        <g transform={`translate(${tick.x - 22},${tick.y})`}>
                            <text
                                textAnchor="end"
                                dominantBaseline="middle"
                                style={{ fill: '#F9E2AF', fontSize: 10 }}
                            >
                                {tick.value}
                            </text>
                        </g>
                    ),
                }}
                colors={{scheme: 'category10'}}
                pointSize={10}
                pointColor={{theme: 'background'}}
                pointBorderWidth={2}
                pointBorderColor={{from: 'serieColor'}}
                pointLabelYOffset={-12}
                useMesh={true}
                // enableSlices="x"
                height={700}
                // width={900}
                legends={[
                    {
                        padding: 30,
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 90,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 100,
                        itemHeight: 20,
                        itemTextColor: '#F9E2AF',
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(210,210,210,0.5)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </>
    )
}
// 0000007F