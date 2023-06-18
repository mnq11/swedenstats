// App component
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import styled, { ThemeProvider } from "styled-components";
import { darkMode } from './styles/styles'; // Adjust this path to your actual file

const AppContainer = styled.div`
  text-align: center;
  background-color: ${props => props.theme.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.textColor};
  box-sizing: border-box;
  font-family: ${props => props.theme.fontFamily}, sans-serif;
  overflow: auto;
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  font-size: 16px;
`;

function App() {
    return (
        <ThemeProvider theme={darkMode}>
            <AppContainer>
                <Dashboard />
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;
