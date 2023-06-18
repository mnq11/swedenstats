import {PayloadType} from "../../types/Parts";
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMale, faFemale, faChartPie} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

// Constants
const DARK_BACKGROUND = 'rgba(0, 0, 0, 0.86)';
const LIGHT_GRAY = '#efefef';
const WHITE = '#ffffff';
const LIGHT_SKY_BLUE = 'lightskyblue';
const PINK = 'pink';

// Styled Components
const TooltipContainer = styled.div`
  background: ${DARK_BACKGROUND};
`;

const TooltipInnerContainer = styled.div`
  border-radius: 5px;
  padding: 10px;
  font-size: 1em;
  line-height: 1.2em;
  color: ${WHITE};
  margin-bottom: 10px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 5px;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 10px;
  }

  @media (min-width: 1025px) {
    padding: 15px;
  }
`;

const LabelStyles = styled.div`
  color: ${LIGHT_GRAY};
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 5px; // adjust this as necessary

`;

const DescStyles = styled.div`
  color: ${WHITE};
  margin-bottom: 0;
  font-size: 1.2em;

`;

const IconStyles = styled.div`
  margin-right: 5px;
  display: inline-block;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CustomTooltipMaritalStatus: React.FC<{ active: boolean, payload: PayloadType[], label: string }> =
    ({active, payload}): JSX.Element | null => {
        if (active && payload[0]) {
            // @ts-ignore
            const { maleAgeGroups = {}, femaleAgeGroups = {}, maleCount, femaleCount, name, value } = payload[0].payload;
            const maleAgesArray = Object.entries(maleAgeGroups);
            const femaleAgesArray = Object.entries(femaleAgeGroups);

            return (
                <TooltipContainer>
                    <TooltipInnerContainer>
                        <LabelStyles>
                            <IconStyles><FontAwesomeIcon icon={faChartPie} /></IconStyles>
                            {`Status: ${name}`}
                        </LabelStyles>
                        <DescStyles>{`Total: ${value}`}</DescStyles>
                        <FlexContainer>
                            <TooltipInnerContainer>
                                <DescStyles>
                                    <IconStyles>
                                        <FontAwesomeIcon style={{color: LIGHT_SKY_BLUE}} icon={faMale}/>
                                    </IconStyles>
                                    {`Males: ${maleCount}`}
                                </DescStyles>
                                {maleAgesArray.map(([ageRange, count], index) => (
                                    <div key={index}>
                                        <DescStyles>
                                            <IconStyles><FontAwesomeIcon style={{color: LIGHT_SKY_BLUE}} icon={faMale}/></IconStyles>
                                            {`(${ageRange})   ${count}`}
                                        </DescStyles>
                                    </div>
                                ))}
                            </TooltipInnerContainer>
                            <TooltipInnerContainer>
                                <DescStyles>
                                    <IconStyles>
                                        <FontAwesomeIcon style={{color: PINK}} icon={faFemale}/>
                                    </IconStyles>
                                    {`Females: ${femaleCount}`}
                                </DescStyles>
                                {femaleAgesArray.map(([ageRange, count], index) => (
                                    <div key={index}>
                                        <DescStyles>
                                            <IconStyles><FontAwesomeIcon style={{color: PINK}} icon={faFemale}/></IconStyles>
                                            {`(${ageRange})   ${count}`}
                                        </DescStyles>
                                    </div>
                                ))}
                            </TooltipInnerContainer>
                        </FlexContainer>
                    </TooltipInnerContainer>
                </TooltipContainer>
            );
        }
        return null;
    };
