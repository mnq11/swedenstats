import React from "react";
import {Line, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend} from "recharts";
import styled from 'styled-components';
import {PopulationBarChartProps} from "../../types/types";
import {COLORS} from "../../../../../styles/styles";

const ChartContainer = styled.div`
  background: #282c34;
  border-radius: 10px;
  display: flex;
  flex-direction: column; // This will arrange its children in a column
  justify-content: center;
  align-items: center;
  height: 90vh; // 90% of viewport height
  width: 90vw; // 90% of viewport width
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  color: #f1f1f1;
  @media (max-width: 768px) {
      
  }
`;

const ChartTitle = styled.h2`
  color: #d3bcbc;
  text-align: center;
`;

// Color array
export const PopulationLineChart: React.FC<PopulationBarChartProps> = ({chartTitle, chartData, CustomTooltip}) => (
    <ChartContainer>
        <ChartTitle>{chartTitle}</ChartTitle>
        {/* Adjust height as needed */}
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#d3bcbc"/>
                <YAxis stroke="#d3bcbc" label={{value: '', angle: -90, position: 'insideLeft'}}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend/>
                <CartesianGrid stroke="#444"/>
                <Line type="monotone" dataKey="value" stroke={COLORS[0]} animationDuration={500} />
            </LineChart>
        </ResponsiveContainer>
    </ChartContainer>
);
