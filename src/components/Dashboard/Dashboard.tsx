import React from 'react';
import styled from "styled-components";
import PopulationStatistics from "./PopulationStatistics/PopulationStatistics";

const DashboardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: #282c34;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif ;
  border-radius: 20px; // Added border-radius for a 'fluffy' look

  transition: all 0.3s ease; // Add a transition for smooth changes on resize

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
    return (
        <DashboardContainer>
            <PopulationStatistics />
        </DashboardContainer>
    );
};

export default Dashboard;
