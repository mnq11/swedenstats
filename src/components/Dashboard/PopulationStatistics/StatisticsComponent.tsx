// StatisticsComponent

import React, { useState } from 'react';
import { Props } from "./types/types";
import { CustomTooltipAgeGender } from "./Charts/PopulationBarChart/CustomTooltipAgeGender";
import { CustomTooltipYear } from "./Charts/PopulationLineChart/CustomTooltipYear";
import {CustomTooltipMaritalStatus} from "./Charts/PopulationPieChart/CustomTooltipMaritalStatus";
import {PopulationBarChart} from "./Charts/PopulationBarChart/PopulationBarChart";
import {PopulationLineChart} from "./Charts/PopulationLineChart/PopulationLineChart";
import {PopulationPieChart} from "./Charts/PopulationPieChart/PopulationPieChart";
import {Parts} from "./Charts/yearSeelctor";
import styled from "styled-components";



const StatisticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1px;
  gap: 5px; // provide space between child components
`;

const StatisticsComponent: React.FC<Props> = ({statsData}) => {
    const [selectedYear, setSelectedYear] = useState('2022');
    const selectedMaritalStatus = 'All';

    const chartData = statsData.data.map((item, index) => ({
        name: `Data ${index + 1}`,
        Region: item.key[0],
        MaritalStatus: item.key[1],
        Age: item.key[2],
        Gender: item.key[3] || '1', // providing default value as Male
        Year: item.key[4],
        Population: parseInt(item.values[0]) || 0,
    }));

    const filteredData = chartData.filter(d => (d.Year === selectedYear) && (selectedMaritalStatus === 'All' || d.MaritalStatus === selectedMaritalStatus));


    const yearPopulationData = chartData.reduce<{
        [key: string]: { name: string, value: number, Male: number, Female: number, GrowthRate: number, MaleGrowthRate: number, FemaleGrowthRate: number }
    }>((accumulator, current) => {
        if (accumulator[current.Year]) {
            accumulator[current.Year].value += current.Population;
            accumulator[current.Year][current.Gender === '1' ? 'Male' : 'Female'] += current.Population;
        } else {
            accumulator[current.Year] = {
                name: current.Year,
                value: current.Population,
                Male: current.Gender === '1' ? current.Population : 0,
                Female: current.Gender === '2' ? current.Population : 0,
                GrowthRate: 0,
                MaleGrowthRate: 0,
                FemaleGrowthRate: 0
            };
        }
        return accumulator;
    }, {});

    const yearPopulationDataSorted = Object.values(yearPopulationData).sort((a, b) => parseInt(a.name) - parseInt(b.name));

    for (let i = 0; i < yearPopulationDataSorted.length; i++) {
        if (i > 0) {
            yearPopulationDataSorted[i].GrowthRate = ((yearPopulationDataSorted[i].value - yearPopulationDataSorted[i - 1].value) / yearPopulationDataSorted[i - 1].value) * 100;
            yearPopulationDataSorted[i].MaleGrowthRate = ((yearPopulationDataSorted[i].Male - yearPopulationDataSorted[i - 1].Male) / yearPopulationDataSorted[i - 1].Male) * 100;
            yearPopulationDataSorted[i].FemaleGrowthRate = ((yearPopulationDataSorted[i].Female - yearPopulationDataSorted[i - 1].Female) / yearPopulationDataSorted[i - 1].Female) * 100;
        } else {
            yearPopulationDataSorted[i].GrowthRate = 0;
            yearPopulationDataSorted[i].MaleGrowthRate = 0;
            yearPopulationDataSorted[i].FemaleGrowthRate = 0;
        }
    }




    const maritalStatusPopulationData = chartData.reduce<{
        [key: string]: { name: string, value: number, maleAgeGroups: { [key: string]: number }, femaleAgeGroups: { [key: string]: number }, maleCount: number, femaleCount: number }
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
            let ageGroup;
            if (currentAge < 20) {
                ageGroup = '18 - 19';
            } else {
                // Calculate the age group by 10 year intervals starting from 20
                ageGroup = `${Math.floor(currentAge / 10) * 10} - ${Math.floor(currentAge / 10) * 10 + 9}`;
            }

            if (accumulator[maritalStatus]) {
                accumulator[maritalStatus].value += current.Population;

                if (current.Gender === '1') {
                    accumulator[maritalStatus].maleCount += current.Population;
                    accumulator[maritalStatus].maleAgeGroups[ageGroup] = (accumulator[maritalStatus].maleAgeGroups[ageGroup] || 0) + current.Population;
                } else {
                    accumulator[maritalStatus].femaleCount += current.Population;
                    accumulator[maritalStatus].femaleAgeGroups[ageGroup] = (accumulator[maritalStatus].femaleAgeGroups[ageGroup] || 0) + current.Population;
                }
            } else {
                accumulator[maritalStatus] = {
                    name: maritalStatus,
                    value: current.Population,
                    maleAgeGroups: {},
                    femaleAgeGroups: {},
                    maleCount: current.Gender === '1' ? current.Population : 0,
                    femaleCount: current.Gender === '2' ? current.Population : 0
                };

                if (current.Gender === '1') {
                    accumulator[maritalStatus].maleAgeGroups[ageGroup] = current.Population;
                } else {
                    accumulator[maritalStatus].femaleAgeGroups[ageGroup] = current.Population;
                }
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
                value: current.Population || 0, // providing default value as 0
                Male: {Single: 0, Married: 0, Widowed: 0, Divorced: 0},
                Female: {Single: 0, Married: 0, Widowed: 0, Divorced: 0},
            };
        }

        const maritalStatus = current.MaritalStatus === 'G' ? 'Married' : (current.MaritalStatus === 'ÄNKL' ? 'Widowed' : (current.MaritalStatus === 'OG' ? 'Single' : 'Divorced'));

        const population = current.Population || 0; // providing default value as 0

        if (current.Gender === '1') {
            accumulator[current.Age].Male[maritalStatus] += population;
        } else {
            accumulator[current.Age].Female[maritalStatus] += population;
        }

        accumulator[current.Age].value += population;

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

    const yearPopulationChartData = yearPopulationDataSorted.map(obj => ({
        ...obj,
        name: parseInt(obj.name),
        GrowthRate: obj.GrowthRate
    }));

    const agePopulationChartData = Object.values(agePopulationData).map(obj => ({
        ...obj,
        name: parseInt(obj.name)
    })).sort((a, b) => a.name - b.name);
    Object.values(genderPopulationData);
    const YEARS = Array.from({length: 2022 - 1968 + 1}, (_, i) => String(2022 - i));

    return (
        <StatisticsWrapper>
            <Parts selectedYear={selectedYear} setSelectedYear={setSelectedYear} YEARS={YEARS} />
            <PopulationBarChart
                chartTitle={`Population by Age in ${selectedYear}`}
                chartData={agePopulationChartData}
                CustomTooltip={CustomTooltipAgeGender}
            />
            <PopulationLineChart
                chartTitle="Population by Year"
                chartData={yearPopulationChartData}
                CustomTooltip={CustomTooltipYear}
            />
            <PopulationPieChart
                chartTitle={`Population by Marital Status in ${selectedYear}`}
                chartData={Object.values(maritalStatusPopulationData)}
                CustomTooltip={CustomTooltipMaritalStatus}
            />
        </StatisticsWrapper>
    );
}

export default StatisticsComponent;
