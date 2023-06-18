import React from "react";
import styled from 'styled-components';
import { YearSelectorProps } from "../types/Parts";

const YearSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px;
  padding: 1rem;
  border-radius: 80px;
  background: #282c34;
  width: 90vw;
  @media (max-width: 1440px) {
    width: 100vw;
  }
  @media (max-width: 1024px) {
    width: 100vw;
  }
  @media (max-width: 768px) {
    width: 100vw;
  }
  @media (max-width: 480px) {
    width: 100vw;
  }
  @media (max-width: 320px) {
    width: 100vw;
  }
`;

const YearSelectorLabel = styled.label`
  font-size: 1.5rem;
  margin-right: 1rem;

  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 480px) {
    Font-size: 1.2rem;
  }
`;
const YearSelector = styled.select`
  padding: 0.55rem; // Reduced padding
  font-size: 1rem; // Reduced font size
  color: #333;
  border: none;
  border-radius: 5px;
  transition: all 0.8s ease;

  @media (max-width: 1440px) {
    font-size: 0.8rem;
  }
  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  &:hover, &:focus {
    background: #ffffff;
  }
`;

export const SelectYear: React.FC<YearSelectorProps> = ({selectedYear, setSelectedYear, YEARS}) => (
    <YearSelectorContainer>
        <YearSelectorLabel htmlFor="year-selector">Select Year:</YearSelectorLabel>
        <YearSelector id="year-selector" value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
            {YEARS.map(year => <option key={year}>{year}</option>)}
        </YearSelector>
    </YearSelectorContainer>
);
