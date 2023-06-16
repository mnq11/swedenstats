// PopulationStatistics.tsx
import React, { useEffect, useState } from 'react';
import StatisticsComponent from './StatisticsComponent';
import styled from "styled-components";
const countiesData = require('./CountiesData.json') as CountiesData;

interface StatsData {
    data: {
        key: string[],
        values: string[]
    }[]
}

interface MunicipalityData {
    Code: string;
    Municipality: string;
    Area: number;
}

interface CountiesData {
    [key: string]: MunicipalityData[];
}

const PopulationStatisticsContainer = styled.div`
  width: 100%;
  height: 100%; // added to take full height
  padding: 0; // changed from 2rem
  background-color: #282c34;
  box-sizing: border-box;
  border-radius: 20px;
  transition: all 0.3s ease;
  margin: 0; // added to remove margins
`;

const PopulationStatisticsHeader = styled.header`
  text-align: center;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem; // Bigger font-size
  color: ${props => props.color || '#fff'}; // White color for title
  margin: 1rem;

  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin: 0.5rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin: 1rem;
  color: #fff; // White color for label

  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`;

//...

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem; // Increased padding for bigger select
  margin: 1rem;
  font-size: 1.5rem; // Increase font-size for bigger text
  text-align: center; // Center the text
  border-radius: 20px;
  border: 1px solid #ccc;
  appearance: none;
  background-color: #fff;
  background-image: linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    border-color: #007BFF;
  }

  &:hover {
    border-color: #007BFF;
  }

  @media (max-width: 600px) {
    margin: 0.5rem;
    padding: 0.75rem; // Decrease padding for smaller screens
    font-size: 1.25rem; // Decrease font-size for smaller screens
  }
`;



const PopulationStatistics: React.FC = () => {
    const [data, setData] = useState<StatsData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [county, setCounty] = useState(Object.keys(countiesData)[0]);
    const [municipality, setMunicipality] = useState(countiesData[Object.keys(countiesData)[0]][0].Code);
    const maritalStatus = {'OG': true, 'G': true, 'ÄNKL': true, 'SK': true};
    const ages = Array.from({length: 99}, (_, i) => String(i + 1)); // Array of ages from 1 to 99
    const gender = {'1': true, '2': true};
    const years = Array.from({length: 2022 - 1968 + 1}, (_, i) => String(1968 + i)); // Array of years from 1968 to 2022
    const [isFetching, setIsFetching] = useState(false); // New state variable

    useEffect(() => {
        if (county && municipality) {
            fetchData();
        }
    }, [county, municipality]);

    const fetchData = () => {
        setIsFetching(true); // Set fetching to true when starting the fetch

        const payload = {
            "Region": [municipality],
            "Civilstand": Object.keys(maritalStatus),
            "Alder": ages,
            "Kon": Object.keys(gender),
            "Tid": years
        };

        fetch('http://localhost:3001/stats', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch data. Please check your inputs and try again.');
            })
            .finally(() => {
                setIsFetching(false); // Set fetching to false once fetch is completed
            });
    }

    const countyOptions = Object.keys(countiesData);
    const municipalityOptions = county ? countiesData[county] : [];

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
        <PopulationStatisticsContainer>
            <PopulationStatisticsHeader>
                <Title color='#ad9696'>Sweden Population Statistics</Title>
                <Label>
                    County:
                    <Select value={county} onChange={e => {
                        setCounty(e.target.value);
                        setMunicipality(countiesData[e.target.value][0].Code);
                    }}>
                        {countyOptions.map(county => (
                            <option key={county} value={county} >
                                {county}
                            </option>
                        ))}
                    </Select>
                </Label>
                <Label>
                    Municipality:
                    <Select value={municipality} onChange={e => setMunicipality(e.target.value)}>
                        {municipalityOptions.map((item: MunicipalityData) => (
                            <option key={item.Code} value={item.Code}>
                                {item.Municipality}
                            </option>
                        ))}
                    </Select>
                </Label>
                <StatisticsComponent statsData={data} />
            </PopulationStatisticsHeader>
        </PopulationStatisticsContainer>
    );
}

export default PopulationStatistics;
