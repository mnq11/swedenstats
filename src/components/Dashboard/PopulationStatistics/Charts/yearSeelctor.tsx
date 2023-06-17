import React from "react";
import styled from 'styled-components';
import { YearSelectorProps } from "../types/Parts";

const YearSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
  padding: 1rem;
  border-radius: 10px;
  background: #282c34;
  color: #ad9696;
`;

const YearSelectorLabel = styled.label`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: #d3bcbc;
`;

const YearSelector = styled.select`
  padding: 0.5rem;
  font-size: 1.5rem;
  color: #333;
  background: #d3bcbc;
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover, &:focus {
    background: #bcafa9;
  }
`;

export const Parts: React.FC<YearSelectorProps> = ({selectedYear, setSelectedYear, YEARS}) => (
    <YearSelectorContainer>
        <YearSelectorLabel htmlFor="year-selector">Select Year:</YearSelectorLabel>
        <YearSelector id="year-selector" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            {YEARS.map(year => <option key={year}>{year}</option>)}
        </YearSelector>
    </YearSelectorContainer>
);
