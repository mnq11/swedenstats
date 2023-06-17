
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
export type PopulationBarChartProps = {
    chartTitle: string,
    chartData: any[], // replace 'any' with your actual data type
    CustomTooltip: React.ComponentType<any> // replace 'any' with the actual props of your custom tooltip component
};


