import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import styled from "styled-components";

const AppContainer = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  overflow: auto;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: calc(8px + 1.5vmin);
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 20px;
    font-size: calc(10px + 2vmin);
  }

  @media (min-width: 1025px) {
    padding: 40px;
    font-size: calc(12px + 2vmin);
  }
`;
function App() {
    return (
        <AppContainer>
            <Dashboard />
        </AppContainer>
    );
}

export default App;
