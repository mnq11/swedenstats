import {
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';
import {COLORS} from "../../../../styles/styles";
import {PopulationPieChartProps} from "../../../../types/Parts";
import React from "react";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; // Aligns the title and chart vertically
  height: 100vh; // Takes the full height
`;

const ChartContainer = styled.div`
  background: #282c34;
  margin: 2rem;
  padding: 1rem;
  border-radius: 10px;
  height: 90vh; // 90% of viewport height
  width: 90vw; // 90% of viewport width
`;

const ChartTitle = styled.h2`
  color: #d3bcbc;
  text-align: center;
  margin-bottom: 1rem; // Creates some space between the title and the chart
`;

export const PopulationPieChart: React.FC<PopulationPieChartProps> = ({chartTitle, chartData, CustomTooltip}) => (
    <MainContainer>
        <ChartTitle>{chartTitle}</ChartTitle>
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius="50%"
                        fill="#8884d8"
                        labelLine={true}
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) =>
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="#fff"
                                strokeWidth={1}
                            />)
                        }
                    </Pie>
                    {CustomTooltip && <Tooltip content={<CustomTooltip/>}/>}
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    </MainContainer>
);
