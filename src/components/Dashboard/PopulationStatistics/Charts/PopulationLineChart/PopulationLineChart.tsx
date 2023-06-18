import React from "react";
import {Line, LineChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend} from "recharts";
import styled from 'styled-components';
import {PopulationBarChartProps} from "../../types/types";
import {COLORS} from "../../../../../styles/styles";

const ChartContainer = styled.div`
  background: #282c34;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: all 0.3s ease;
  font-family: 'Roboto', sans-serif;
  color: #f1f1f1;
  max-width: 1080px;  // limiting maximum width
  margin: 0 auto;  // centering container
  height: 80vh;
  width: 90%;

  @media (max-width: 1024px) {
    height: 80vh;
    width: 95%;
  }

  @media (max-width: 768px) {
    height: 90vh;
    width: 100%;
  }

  @media (max-width: 480px) {
    height: 100vh;
    width: 100%;
  }
    @media (max-width: 320px) {
    height: 100vh;
    width: 100%;
    }
  
`;

const ChartTitle = styled.h2`
  color: #d3bcbc;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 1.5em;
  }

  @media (max-width: 768px) {
    font-size: 1.2em;
  }

  @media (max-width: 480px) {
    font-size: 1em;
  }
  @media (max-width: 320px) {
    font-size: 0.8em;
    
  }
`;

export const PopulationLineChart: React.FC<PopulationBarChartProps> = ({chartTitle, chartData, CustomTooltip}) => (
    <ChartContainer>
        <ChartTitle>{chartTitle}</ChartTitle>
        <ResponsiveContainer width="100%" height="80%">
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
