// PopulationStatistics.tsx
import React, { useEffect, useState } from 'react';
import StatisticsComponent from './StatisticsComponent';
import './PopulationStatistics.css';

interface StatsData {
    data: {
        key: string[],
        values: string[]
    }[]
}

const PopulationStatistics: React.FC = () => {
    const [data, setData] = useState<StatsData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [region, setRegion] = useState('0120');
    const maritalStatus = {'OG': true, 'G': true, 'ÄNKL': true, 'SK': true};
    const ages = Array.from({length: 99}, (_, i) => String(i + 1)); // Array of ages from 1 to 99
    const gender = {'1': true, '2': true};
    const years = Array.from({length: 2022 - 1968 + 1}, (_, i) => String(1968 + i)); // Array of years from 1968 to 2022

    useEffect(() => {
        fetchData();
    }, [region]);

    const fetchData = () => {
        const payload = {
            "Region": region.split(','),
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
            });
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="PopulationStatistics">
            <header className="PopulationStatistics-header">
                <h1>Sweden Population Statistics</h1>
                <label>
                    Region:
                    <input value={region} onChange={e => setRegion(e.target.value)} />
                </label>
                <StatisticsComponent statsData={data} />
            </header>
        </div>
    );
}

export default PopulationStatistics;
