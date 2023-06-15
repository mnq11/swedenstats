// FilterComponent.tsx
import React from 'react';

interface FilterProps {
    region: string,
    maritalStatus: {[key: string]: boolean},
    age: string,
    gender: {[key: string]: boolean},
    year: string,
    setRegion: React.Dispatch<React.SetStateAction<string>>,
    setMaritalStatus: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
    setAge: React.Dispatch<React.SetStateAction<string>>,
    setGender: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
    setYear: React.Dispatch<React.SetStateAction<string>>,
    handleCheckboxChange: (setter: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>, field: string) => void,
}

const FilterComponent: React.FC<FilterProps> = (props) => {
    const { region, maritalStatus, age, gender, year, setRegion, setMaritalStatus, setAge, setGender, setYear, handleCheckboxChange } = props;

    return (
        <div className="filter-container">
            <input type="text" value={region} onChange={e => setRegion(e.target.value)} placeholder="Region" />
            <div>
                {Object.keys(maritalStatus).map(key => (
                    <label key={key}>
                        <input type="checkbox" checked={maritalStatus[key]} onChange={() => handleCheckboxChange(setMaritalStatus, key)} />
                        {key === 'OG' ? 'Unmarried' : key === 'G' ? 'Married' : key === 'ÄNKL' ? 'Widow/Widower' : 'Divorced'}
                    </label>
                ))}
            </div>
            <select value={age} onChange={e => setAge(e.target.value)}>
                {Array.from({ length: 99 }, (_, i) => i + 1).map(age => (
                    <option key={age} value={age}>{age}</option>
                ))}
            </select>
            <div>
                {Object.keys(gender).map(key => (
                    <label key={key}>
                        <input type="checkbox" checked={gender[key]} onChange={() => handleCheckboxChange(setGender, key)} />
                        {key === '1' ? 'Male' : 'Female'}
                    </label>
                ))}
            </div>
            <select value={year} onChange={e => setYear(e.target.value)}>
                {Array.from({length: 2022 - 1965 + 1}, (_, i) => 1965 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
}

export default FilterComponent;
