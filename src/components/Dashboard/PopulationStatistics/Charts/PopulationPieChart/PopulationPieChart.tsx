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
import {COLORS} from "../../../../../styles/styles";

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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  width: 90vw;
  max-width: 1080px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    height: 80vh;
    width: 95%;
  }

  @media (max-width: 768px) {
    height: 70vh;
    width: 100%;
  }

  @media (max-width: 480px) {
    height: 60vh;
    width: 100%;
  }
  @media (max-width: 320px) {
    height: 50vh;
    width: 100%;
  }
  @media (max-width: 280px) {
    height: 40vh;
    width: 100%;
  }
  @media (max-width: 240px) {
    height: 30vh;
    width: 100%;
  }
`;

const ChartTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  color: #d3bcbc;
  text-align: center;
  margin-bottom: 1em;
  transition: font-size 0.3s ease;
  font-size: calc(1em + 1vw);

  @media (max-width: 1280px) {
    font-size: calc(1em + 1vw);
  }
    @media (max-width: 1024px) {
    font-size: calc(1em + 0.8vw);
    }
  @media (max-width: 768px) {
    font-size: calc(1em + 0.5vw);
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
  @media (max-width: 320px) {
    font-size: 0.8em;
    
  }
    @media (max-width: 280px) {
    font-size: 0.6em;
    }
    @media (max-width: 240px) {
    font-size: 0.4em;
    }
`;

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
            <ResponsiveContainer>
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
