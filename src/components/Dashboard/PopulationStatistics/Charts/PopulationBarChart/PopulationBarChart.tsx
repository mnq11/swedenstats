import React from "react";
import {Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer} from "recharts";
import styled, {keyframes} from 'styled-components';
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
  height: 90vh;
  width: 90%;
  max-width: 1080px;
  margin: 0 auto;

  &:hover {
    transform: scale(1.02); // add scale effect on hover
  }

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
`;

// Adding a simple fade in animation to the title
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ChartTitle = styled.h2`
  text-align: center;
  word-wrap: break-word;
  animation: 2s ${fadeIn} ease-out;
@media (max-width: 1200px) {
    font-size: 2em;
}
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
  @media (max-width: 280px) {
    font-size: 0.7em;
  }
`;

export const PopulationBarChart: React.FC<PopulationBarChartProps> = ({chartTitle, chartData, CustomTooltip}) => {
    const [activeIndex, setActiveIndex] = React.useState(null);

    const onMouseOver = (data: any, index: number | React.SetStateAction<null>, event: React.MouseEvent) => {
        event.stopPropagation();  // stop event from bubbling
        // @ts-ignore
        setActiveIndex(index);
    };

    const onMouseOut = (event: React.MouseEvent) => {
        event.stopPropagation();  // stop event from bubbling
        setActiveIndex(null);
    };

    return (
        <ChartContainer>
            <ChartTitle>{chartTitle}</ChartTitle>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#d3bcbc"/>
                    <YAxis stroke="#d3bcbc" label={{value: '', angle: -90, position: 'insideLeft'}}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend/>
                    <CartesianGrid stroke="#444"/>
                    <Bar dataKey="value" barSize={20} fill="#8884d8">
                        {chartData.map((entry, index) => (
                            <Cell
                                cursor="pointer"
                                fill={index === activeIndex ? 'red' : COLORS[index % COLORS.length]}
                                onMouseOver={(event) => onMouseOver(entry, index, event)}
                                onMouseOut={(event) => onMouseOut(event)}
                                key={`cell-${index}`}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};
