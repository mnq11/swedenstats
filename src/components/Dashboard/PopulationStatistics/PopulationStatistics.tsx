// PopulationStatistics.tsx
import React, {useEffect, useState} from 'react';
import StatisticsComponent from './StatisticsComponent';
import styled from "styled-components";
import {countiesData, MunicipalityData} from "../Dashboard";


interface StatsData {
    data: {
        key: string[],
        values: string[]
    }[]
}


interface PopulationStatisticsProps {
    county: string;
    setCounty: (county: string) => void;
    municipality: string;
    setMunicipality: (municipality: string) => void;
}
const PopulationStatisticsContainer = styled.div`
  width: 100%;
  height: 100%; 
  padding: 0; 
  background-color: #282c34;
  box-sizing: border-box;
  border-radius: 20px;
  transition: all 0.3s ease;
  margin: 0; 
`;

const PopulationStatisticsHeader = styled.header`
  text-align: center;
  padding: 10px;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem; // Bigger font-size
  color: ${props => props.color || '#fff'};
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
  color: #fff; 

  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`;


const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem; 
  margin: 1rem;
  font-size: 1.5rem; 
  text-align: center; 
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
    padding: 0.75rem; 
    font-size: 1.25rem; 
  }
`;


const PopulationStatistics: React.FC<PopulationStatisticsProps> = ({county, setCounty, municipality, setMunicipality}) => {
    const [data, setData] = useState<StatsData | null>(null);
    const [error, setError] = useState<string | null>(null);
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
                    <StatisticsComponent statsData={data}/>

                </Label>

            </PopulationStatisticsHeader>
        </PopulationStatisticsContainer>
    );
}

export default PopulationStatistics;
