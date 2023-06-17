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
