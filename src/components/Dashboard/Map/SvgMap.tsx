import React from 'react';
import {MunicipalityData} from "../Dashboard";

interface SvgMapProps {
    data: MunicipalityData[];
    handleMouseOver: (code: string) => void;
    handleClick: (code: string) => void;
}

const SvgMap: React.FC<SvgMapProps> = ({ data, handleMouseOver, handleClick }) => {
    return (
        <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
        >
            {data.map((m: MunicipalityData) => (
                <polygon
                    key={m.Code}
                    // points={m.points} // you need to have polygon points for each municipality in the municipality object
                    onMouseOver={() => handleMouseOver(m.Code)}
                    onClick={() => handleClick(m.Code)}
                    style={{ fill: '#282c34', stroke: 'white', strokeWidth: 2 }}
                />
            ))}
        </svg>
    );
};

export default SvgMap;
