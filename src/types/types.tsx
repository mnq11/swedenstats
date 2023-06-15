
import React from 'react';

export interface StatsData {
    data: {
        key: string[],
        values: string[]
    }[]
}

export interface Props {
    statsData: StatsData;
}


export type YearSelectorProps = {
    selectedYear: string,
    setSelectedYear: (year: string) => void,
    YEARS: string[]
};

export type MaritalStatusSelectorProps = {
    selectedMaritalStatus: string,
    setSelectedMaritalStatus: (status: string) => void,
    maritalStatusPopulationChartData: any[] // replace 'any' with your actual data type
};

export type PopulationBarChartProps = {
    chartTitle: string,
    chartData: any[], // replace 'any' with your actual data type
    CustomTooltip: React.ComponentType<any> // replace 'any' with the actual props of your custom tooltip component
};

