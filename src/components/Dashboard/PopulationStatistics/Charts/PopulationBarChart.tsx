import React from "react";
import {Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import styled from 'styled-components';
import {PopulationBarChartProps} from "../../../../types/types";

const ChartContainer = styled.div`
  background: #282c34;
  margin: 5rem 5rem 2rem 3rem ;
  padding: 1rem 1rem 1rem 1rem;
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
const colors =  ['#10B981', '#3B82F6', '#6B7280', '#D1D5DB'];
export const PopulationBarChart: React.FC<PopulationBarChartProps> = ({chartTitle, chartData, CustomTooltip}) => (
    <ChartContainer>
        <ChartTitle>{chartTitle}</ChartTitle>
        {/* Adjust height as needed */}
        <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#d3bcbc"/>
                <YAxis stroke="#d3bcbc" label={{value: '', angle: -90, position: 'insideLeft'}}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend/>
                <CartesianGrid stroke="#444"/>
                <Bar dataKey="value" barSize={10}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
);
