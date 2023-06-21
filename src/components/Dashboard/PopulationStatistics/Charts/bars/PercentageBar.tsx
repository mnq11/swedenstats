import styled from "styled-components";
import React from "react";

interface PercentageBarProps {
    percentage: number;
}

const ProgressBarContainer = styled.div`
  position: relative;
  height: 20px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #BBBBBB;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ProgressBarFill = styled.div<PercentageBarProps>`
  position: relative;
  height: 100%;
  width: ${props => props.percentage}%;
  background: linear-gradient(90deg, #FF6347 0%, #FFA500 50%, #9ACD32 100%);
  transition: width 0.3s ease-in-out;
`;

const ProgressBarLabel = styled.span<PercentageBarProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
`;

const PercentageBar: React.FC<PercentageBarProps> = ({ percentage }) => (
    <ProgressBarContainer>
        <ProgressBarFill percentage={percentage} />
        <ProgressBarLabel percentage={percentage}>
            {`${percentage}%`}
        </ProgressBarLabel>
    </ProgressBarContainer>
);

export default PercentageBar;
