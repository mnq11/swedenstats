import React, { useState } from 'react';
import styled from "styled-components";
import PopulationStatistics from "./PopulationStatistics/PopulationStatistics";

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
  width: 100%;
  max-width: 1200px;
  background-color: #282c34;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif ;
  border-radius: 20px; 

  transition: all 0.3s ease; 

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 25px;
  }

  @media (min-width: 1025px) {
    padding: 35px;
  }
`;

const Dashboard = () => {
    const [county, setCounty] = useState(Object.keys(countiesData)[0]);
    const [municipality, setMunicipality] = useState(countiesData[Object.keys(countiesData)[0]][0].Code);

    return (
        <DashboardContainer>
            <PopulationStatistics county={county} setCounty={setCounty} municipality={municipality} setMunicipality={setMunicipality} />
        </DashboardContainer>
    );
};

export default Dashboard;
