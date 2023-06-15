import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { darkMode, COLORS } from "../../../styles/styles";
import { getColor } from "../../../utils/utils";

// Define the types of props
type YearSelectorProps = {
    selectedYear: string,
    setSelectedYear: (year: string) => void,
    YEARS: string[]
};

type MaritalStatusSelectorProps = {
    selectedMaritalStatus: string,
    setSelectedMaritalStatus: (status: string) => void,
    maritalStatusPopulationChartData: { name: string, value: number }[]
};

type PopulationBarChartProps = {
    chartTitle: string,
    chartData: any[], // replace 'any' with your actual data type
    CustomTooltip: React.ComponentType<any> // replace 'any' with the actual props of your custom tooltip component
};

type PopulationPieChartProps = {
    chartTitle: string,
    chartData: any[], // replace 'any' with your actual data type
    CustomTooltip?: React.ComponentType<any> // replace 'any' with the actual props of your custom tooltip component
};
export type PayloadType = {
    payload: {
        maleAgeRange: [number, number],
        femaleAgeRange: [number, number],
        maleCount: number,
        femaleCount: number,
    },
    value: number
    name :String
};


// Functional Components
export const Parts: React.FC<YearSelectorProps> = ({ selectedYear, setSelectedYear, YEARS }) => (
    <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
        {YEARS.map(year => <option key={year}>{year}</option>)}
    </select>
);

export const MaritalStatusSelector: React.FC<MaritalStatusSelectorProps> = ({ selectedMaritalStatus, setSelectedMaritalStatus, maritalStatusPopulationChartData }) => (
    <label>Select Marital Status:
        <select value={selectedMaritalStatus} onChange={e => setSelectedMaritalStatus(e.target.value)}>
            <option key="All">All</option>
            {Object.keys(maritalStatusPopulationChartData).map(status => <option
                key={status}>{status}</option>)}
        </select>
    </label>
);

export const PopulationBarChart: React.FC<PopulationBarChartProps> = ({ chartTitle, chartData, CustomTooltip }) => (
    <div className="chart">
        <h2>{chartTitle}</h2>
        <BarChart width={600} height={300} data={chartData}
                  style={{backgroundColor: darkMode.backgroundColor}}>
            <XAxis dataKey="name" stroke={darkMode.axisColor} />
            <YAxis stroke={darkMode.axisColor} label={{ value: 'Population', angle: -90, position: 'insideLeft' }}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend/>
            <CartesianGrid stroke={darkMode.gridColor}/>
            <Bar dataKey="value" barSize={10}>
                {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
                ))}
            </Bar>
        </BarChart>
    </div>
);

export const PopulationPieChart: React.FC<PopulationPieChartProps> = ({ chartTitle, chartData, CustomTooltip }) => (
    <div className="chart">
        <h2>{chartTitle}</h2>
        <PieChart width={600} height={300} style={{margin: 'auto'}}>
            <Pie
                dataKey="value"
                isAnimationActive={true}
                data={chartData}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#8884d8"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
            {CustomTooltip && <Tooltip content={<CustomTooltip />}/>}
        </PieChart>
    </div>
);
