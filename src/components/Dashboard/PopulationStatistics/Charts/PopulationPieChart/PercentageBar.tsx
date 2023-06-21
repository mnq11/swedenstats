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

// A helper function to calculate the luminance of the color
const getLuminance = (color: string) => {
    let c = color.substring(1);
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >>  8) & 0xff;  // extract green
    let b = (rgb >>  0) & 0xff;  // extract blue

    let luma = 0.2126*r + 0.7152*g + 0.0722*b; // per ITU-R BT.709

    return luma;
}

const ProgressBarLabel = styled.span<PercentageBarProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${props => getLuminance(props.percentage > 50 ? '#9ACD32' : '#FF6347') > 140 ? 'black' : 'white'};
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
