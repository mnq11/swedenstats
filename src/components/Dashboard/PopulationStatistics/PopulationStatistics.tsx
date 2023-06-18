import React, {useState} from 'react';
import StatisticsComponent from './StatisticsComponent';
import styled from "styled-components";
import {countiesData, MunicipalityData} from "../Dashboard";
import useStatsData from '../../../hook/useStatsData';
import {SelectYear} from "./Charts/yearSeelctor";
import {ThemeProvider} from 'styled-components';
import {darkMode} from "../../../styles/styles";

interface PopulationStatisticsProps {
    county: string;
    setCounty: (county: string) => void;
    municipality: string;
    setMunicipality: (municipality: string) => void;
}



const PopulationStatisticsHeader = styled.header`
  text-align: center;
  padding: 10px;
  color: ${() => darkMode.textColor};

  @media (max-width: 600px) {
    padding: 5px;
  }
  @media (min-width: 1024px) {
    padding: 5px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.textColor};
  margin: 1rem;

  @media (max-width: 400px) {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
    margin: 0.5rem;
  }
  @media (min-width: 601px) and (max-width: 768px) {
    font-size: 2.2rem;
    margin: 0.5rem;
  }
  @media (min-width: 1024px) {
    font-size: 3.5rem;
    margin: 1.5rem;
  }
  @media (min-width: 1200px) {
    font-size: 4rem;
    margin: 2rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin: 1rem;
`;

const Select = styled.select`
  display: block;
  width: 40%;
  padding: 0.5rem;
  margin: auto;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 15px;
  border: 1px solid ${props => darkMode.axisColor};
  background-color: ${props => darkMode.tooltipBgColor};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  background-repeat: no-repeat;
  background-position: right center;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${props => darkMode.tooltipBgColor};
  }

  &:hover {
    border-color: ${props => darkMode.tooltipBgColor};
  }
`;

const PopulationStatistics: React.FC<PopulationStatisticsProps> = ({
                                                                       county,
                                                                       setCounty,
                                                                       municipality,
                                                                       setMunicipality
                                                                   }) => {
    const {data, error, isFetching} = useStatsData(county, municipality);
    const countyOptions = Object.keys(countiesData);
    const municipalityOptions = county ? countiesData[county] : [];
    const YEARS = Array.from({length: 2022 - 1968 + 1}, (_, i) => String(2022 - i));
    const [selectedYear, setSelectedYear] = useState(YEARS[0]);

    if (error) {
        return <div>Error: {error}</div>;
    }
    if (isFetching) {
        return <div>Loading...</div>;
    }
    if (!data) {
        return <div>Loading data...</div>;
    }

    return (
        <ThemeProvider theme={darkMode}>
                <PopulationStatisticsHeader>
                    <Title>Sweden Population Statistics</Title>
                    <Label>
                        <h1>County</h1>
                        <Select value={county} onChange={e => {
                            setCounty(e.target.value);
                            setMunicipality(countiesData[e.target.value][0].Code);
                        }}>
                            {countyOptions.map(county => (
                                <option key={county} value={county}>
                                    {county}
                                </option>
                            ))}
                        </Select>
                    </Label>
                    <Label>
                        <h1>Municipality</h1>
                        <Select value={municipality} onChange={e => setMunicipality(e.target.value)}>
                            {municipalityOptions.map((item: MunicipalityData) => (
                                <option key={item.Code} value={item.Code}>
                                    {item.Municipality}
                                </option>
                            ))}
                        </Select>
                    </Label>
                    <Label>
                        <SelectYear selectedYear={selectedYear} setSelectedYear={setSelectedYear} YEARS={YEARS}/>
                    </Label>
                    <Label>
                        <StatisticsComponent statsData={data} selectedYear={selectedYear}/>
                    </Label>
                </PopulationStatisticsHeader>
        </ThemeProvider>

    );
}

export default PopulationStatistics;
