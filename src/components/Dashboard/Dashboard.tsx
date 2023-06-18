import React, { useState } from 'react';
import styled from "styled-components";
import PopulationStatistics from "./PopulationStatistics/PopulationStatistics";
import SvgMap from "./Map/SvgMap";
import { ThemeProvider } from 'styled-components';
import {darkMode} from "../../styles/styles";

export const countiesData = require('../../Model/CountiesData.json') as CountiesData;

export interface MunicipalityData {
    Code: string;
    Municipality: string;
    Area: number;
}

export interface CountiesData {
    [key: string]: MunicipalityData[];
}

const DashboardContainer = styled.div`
  width: 100vw;
  height: 100%; // use viewport height instead of 100%
  background-color: #282c34;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  border-radius: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-evenly;
    padding: 2rem;
    width: 100vw;
    height: 100%;
  }
  @media (max-width: 600px) {
    padding: 10px;
    width: 100vw;
    height: 100%;

  }
`;



const StyledComponent = styled.div`
  margin-bottom: 20px;
  
`;

const Dashboard = () => {
    const [county, setCounty] = useState(Object.keys(countiesData)[0]);
    const [municipality, setMunicipality] = useState(countiesData[Object.keys(countiesData)[0]][0].Code);

    const handleMouseOver = (code: string) => {
        // Handle mouse over event here
    };

    const handleClick = (code: string) => {
        // setMunicipality(code);
    };

    return (
        <ThemeProvider theme={darkMode}>
            <DashboardContainer>
                    <PopulationStatistics county={county} setCounty={setCounty} municipality={municipality} setMunicipality={setMunicipality} />
                {/*<StyledComponent>*/}
                {/*    <SvgMap data={countiesData[county]} handleMouseOver={handleMouseOver} handleClick={handleClick} />*/}
                {/*</StyledComponent>*/}
            </DashboardContainer>
        </ThemeProvider>
    );
};

export default Dashboard;
