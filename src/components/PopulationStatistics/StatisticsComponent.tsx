import React, { useState } from 'react';
import { Parts, MaritalStatusSelector, PopulationBarChart, PopulationPieChart } from "./Charts/Parts";
import { Props } from "../../types/types";
import { CustomTooltipAgeGender } from "./tools/CustomTooltipAgeGender";
import { CustomTooltipYear } from "./tools/CustomTooltipYear";
import {CustomTooltipMaritalStatus} from "./tools/CustomTooltipMaritalStatus";


const StatisticsComponent: React.FC<Props> = ({statsData}) => {
    const [selectedYear, setSelectedYear] = useState('2022');
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('All');

    const chartData = statsData.data.map((item, index) => ({
        name: `Data ${index + 1}`,
        Region: item.key[0],
        MaritalStatus: item.key[1],
        Age: item.key[2],
        Gender: item.key[3],
        Year: item.key[4],
        Population: parseInt(item.values[0]),
    }));

    const filteredData = chartData.filter(d => (d.Year === selectedYear) && (selectedMaritalStatus === 'All' || d.MaritalStatus === selectedMaritalStatus));


    const yearPopulationData = chartData.reduce<{
        [key: string]: { name: string, value: number, Male: number, Female: number }
    }>((accumulator, current) => {
        if (accumulator[current.Year]) {
            accumulator[current.Year].value += current.Population;
            accumulator[current.Year][current.Gender === '1' ? 'Male' : 'Female'] += current.Population;
        } else {
            accumulator[current.Year] = {name: current.Year, value: current.Population, Male: 0, Female: 0};
            accumulator[current.Year][current.Gender === '1' ? 'Male' : 'Female'] += current.Population;
        }
        return accumulator;
    }, {});


    const maritalStatusPopulationData = chartData.reduce<{
        [key: string]: { name: string, value: number, maleAgeRange: [number, number], femaleAgeRange: [number, number], maleCount: number, femaleCount: number }
    }>((accumulator, current) => {
        const maritalStatusMap: { [key: string]: string } = {
            'OG': 'Single',
            'G': 'Married',
            'ÄNKL': 'Widowed',
            'SK': 'Divorced'
        };

        const maritalStatus = maritalStatusMap[current.MaritalStatus];
        const currentAge = parseInt(current.Age);

        if (current.Year === selectedYear && currentAge >= 18) {
            if (accumulator[maritalStatus]) {
                accumulator[maritalStatus].value += current.Population;
                if (current.Gender === '1') {
                    accumulator[maritalStatus].maleCount += current.Population;
                    accumulator[maritalStatus].maleAgeRange[0] = Math.min(accumulator[maritalStatus].maleAgeRange[0], currentAge);
                    accumulator[maritalStatus].maleAgeRange[1] = Math.max(accumulator[maritalStatus].maleAgeRange[1], currentAge);
                } else {
                    accumulator[maritalStatus].femaleCount += current.Population;
                    accumulator[maritalStatus].femaleAgeRange[0] = Math.min(accumulator[maritalStatus].femaleAgeRange[0], currentAge);
                    accumulator[maritalStatus].femaleAgeRange[1] = Math.max(accumulator[maritalStatus].femaleAgeRange[1], currentAge);
                }
            } else {
                accumulator[maritalStatus] = {
                    name: maritalStatus,
                    value: current.Population,
                    maleAgeRange: [Infinity, -Infinity],
                    femaleAgeRange: [Infinity, -Infinity],
                    maleCount: current.Gender === '1' ? current.Population : 0,
                    femaleCount: current.Gender === '2' ? current.Population : 0
                };
            }
        }

        return accumulator;
    }, {});



    const agePopulationData = filteredData.reduce<{
        [key: string]: {
            name: string,
            value: number,
            Male: { Single: number, Married: number, Widowed: number, Divorced: number },
            Female: { Single: number, Married: number, Widowed: number, Divorced: number }
        }
    }>((accumulator, current) => {

        if (!accumulator[current.Age]) {
            accumulator[current.Age] = {
                name: current.Age,
                value: current.Population,
                Male: {Single: 0, Married: 0, Widowed: 0, Divorced: 0},
                Female: {Single: 0, Married: 0, Widowed: 0, Divorced: 0},
            };
        }

        const maritalStatus = current.MaritalStatus === 'G' ? 'Married' : (current.MaritalStatus === 'ÄNKL' ? 'Widowed' : (current.MaritalStatus === 'OG' ? 'Single' : 'Divorced'));

        if (current.Gender === '1') {
            accumulator[current.Age].Male[maritalStatus] += current.Population;
        } else {
            accumulator[current.Age].Female[maritalStatus] += current.Population;
        }

        accumulator[current.Age].value += current.Population;

        return accumulator;
    }, {});


    const genderPopulationData = filteredData.reduce<{
        [key: string]: { name: string, value: number }
    }>((accumulator, current) => {
        // Map '1' to 'Male' and '2' to 'Female'
        const gender = current.Gender === '1' ? 'Male' : 'Female';

        if (accumulator[gender]) {
            accumulator[gender].value += current.Population;
        } else {
            accumulator[gender] = {name: gender, value: current.Population};
        }
        return accumulator;
    }, {});

    const yearPopulationChartData = Object.values(yearPopulationData).map(obj => ({
        ...obj,
        name: parseInt(obj.name)
    })).sort((a, b) => a.name - b.name);
    const maritalStatusPopulationChartData = Object.values(maritalStatusPopulationData);
    const agePopulationChartData = Object.values(agePopulationData).map(obj => ({
        ...obj,
        name: parseInt(obj.name)
    })).sort((a, b) => a.name - b.name);
    const genderPopulationChartData = Object.values(genderPopulationData);
    const YEARS = Array.from({length: 2022 - 1968 + 1}, (_, i) => String(2022 - i));

    return (
        <div className="StatisticsComponent">
            <Parts selectedYear={selectedYear} setSelectedYear={setSelectedYear} YEARS={YEARS} />
            <MaritalStatusSelector selectedMaritalStatus={selectedMaritalStatus} setSelectedMaritalStatus={setSelectedMaritalStatus} maritalStatusPopulationChartData={maritalStatusPopulationChartData} />

            <div className="chart-container">
                <PopulationBarChart chartTitle={`Population by Age in ${selectedYear}`} chartData={agePopulationChartData} CustomTooltip={CustomTooltipAgeGender} />
                <PopulationBarChart chartTitle="Population by Year" chartData={yearPopulationChartData} CustomTooltip={CustomTooltipYear} />

                <PopulationPieChart chartTitle={`Population by Marital Status in ${selectedYear}`} chartData={Object.values(maritalStatusPopulationData)} CustomTooltip={CustomTooltipMaritalStatus} />
                <PopulationPieChart chartTitle={`Population by Gender in ${selectedYear}`} chartData={genderPopulationChartData} />
            </div>
        </div>
    );
}

export default StatisticsComponent;
