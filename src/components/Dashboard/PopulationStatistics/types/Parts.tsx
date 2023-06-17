import React from 'react';

// Define the types of props
export type YearSelectorProps = {
    selectedYear: string,
    setSelectedYear: (year: string) => void,
    YEARS: string[]
};
export type PopulationBarChartProps = {
    chartTitle: string,
    chartData: any[], // replace 'any' with your actual data type
    CustomTooltip: React.ComponentType<any> // replace 'any' with the actual props of your custom tooltip component
};

export type PopulationPieChartProps = {
    chartTitle: string,
    chartData: any[], // replace 'any' with your actual data type
    CustomTooltip?: React.ComponentType<any> // replace 'any' with the actual props of your custom tooltip component
};
export type AgeRange = {
    start: number;
    end: number;
    count: number;
};

export type PayloadType = {
    payload: {
        maleAgeGroups: AgeRange[];
        femaleAgeGroups: AgeRange[];
        maleCount: number;
        femaleCount: number;
    },
    value: number
    name: String
};



