import {
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from 'recharts';
import styled, { createGlobalStyle } from 'styled-components';
import { PopulationPieChartProps } from "../../types/Parts";
import React from "react";

interface LabelProps {
    cx: number,
    cy: number,
    midAngle: number,
    innerRadius: number,
    outerRadius: number,
    percent: number,
    index: number,
    name: string
}

const GlobalFonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
`;

const ChartContainer = styled.div`
  background: #282c34;
  border-radius: 10px;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  color: #d3bcbc;
  text-align: center;
  margin-bottom: 1px;
  font-size: 2em; /* adjust as necessary */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* adjust as necessary */
  line-height: 1.2; /* adjust as necessary */
  letter-spacing: 0.05em; /* adjust as necessary */
  transition: font-size 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.5em; /* adjust for smaller screens */
  }
  
  @media (max-width: 480px) {
    font-size: 1em; /* adjust for even smaller screens */
  }
`;
export const COLORS = ['#FFD700', '#008000', '#696969', '#DC143C'];
// Customized Label component
const renderCustomizedLabel: React.FC<LabelProps & {name: string}> = ({
                                                                          cx,
                                                                          cy,
                                                                          midAngle,
                                                                          innerRadius,
                                                                          outerRadius,
                                                                          percent,
                                                                          index,
                                                                          name
                                                                      }) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill={COLORS[index % COLORS.length]}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const PopulationPieChart: React.FC<PopulationPieChartProps> = ({chartTitle, chartData, CustomTooltip}) => (
    <>
        <GlobalFonts />
        <ChartTitle>{chartTitle}</ChartTitle>
        <ChartContainer>
            <ResponsiveContainer width="80%" height="80%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        isAnimationActive={true}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        fill="#8884d8"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="#282c34"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    {CustomTooltip && <Tooltip content={<CustomTooltip />}/>}
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    </>
);
