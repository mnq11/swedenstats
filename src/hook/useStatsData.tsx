// useStatsData.tsx
import { useState, useEffect } from 'react';

interface StatsData {
    data: {
        key: string[],
        values: string[]
    }[]
}

const useStatsData = (county: string, municipality: string) => {
    const [data, setData] = useState<StatsData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (county && municipality) {
            fetchData().then(r =>
                console.log(r));
        }

        async function fetchData() {
            setIsFetching(true);
            const maritalStatus = {'OG': true, 'G': true, 'ÄNKL': true, 'SK': true};
            const ages = Array.from({length: 99}, (_, i) => String(i + 1));
            const gender = {'1': true, '2': true};
            const years = Array.from({length: 2022 - 1968 + 1}, (_, i) => String(1968 + i));

            const payload = {
                "Region": [municipality],
                "Civilstand": Object.keys(maritalStatus),
                "Alder": ages,
                "Kon": Object.keys(gender),
                "Tid": years
            };

            try {
                const response = await fetch('http://localhost:3001/stats', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    },
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setData(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data. Please check your inputs and try again.');
            } finally {
                setIsFetching(false);
            }
        }
    }, [county, municipality]);

    return { data, error, isFetching };
};

export default useStatsData;
