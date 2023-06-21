import {PayloadType} from "../../types/Parts";
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMale, faFemale, faChartPie} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import {COLORS} from "../../../../../styles/styles";
import PercentageBar from "./PercentageBar";

// Constants
const DARK_BACKGROUND = 'rgba(0, 0, 0, 0.86)';

// Styled Components
const TooltipContainer = styled.div`
  background: ${DARK_BACKGROUND};
`;

const TooltipInnerContainer = styled.div`
  border-radius: 5px;
  padding: 10px;
  font-size: 1em;
  line-height: 1.2em;
  color: inherit;
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

const statusColors = {
    Single: COLORS[0],
    Married: COLORS[1],
    Widowed: COLORS[2],
    Divorced: COLORS[3]
};

const LabelStyles = styled.div<{ status: keyof typeof statusColors }>`
  color: ${props => statusColors[props.status] || 'inherit'};
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 5px;
`;

const DescStyles = styled.div`
  color: inherit;
  margin-bottom: 0;
  font-size: 1.2em;
`;

const IconStyles = styled.div`
  margin-right: 5px;
  display: inline-block;
  color: inherit;
`;

const PercentStyles = styled.span`
  font-size: 0.8em;
  color: inherit;
  font-style: italic;
  margin-left: 5px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;




const AgeGroupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-bottom: 5px;
`;

const AgeGroupDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const AgeGroupLabel = styled.div`
  font-size: 0.75em;
  font-weight: bold;
  padding-right: 5px;
`;

const AgeGroupCount = styled.div`
  font-size: 0.75em;
  padding-left: 5px;
`;
const SectionStyled = styled.div`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;

  &:last-child {
    border-bottom: 0;
  }
`;

export const CustomTooltipMaritalStatus: React.FC<{ active: boolean, payload: PayloadType[], label: string }> =
    ({active, payload}): JSX.Element | null => {
        if (active && payload && payload[0] && payload[0].payload) {
            // @ts-ignore
            const { maleAgeGroups = {}, femaleAgeGroups = {}, maleCount, femaleCount, name, value } = payload[0].payload;
            const maleAgesArray = Object.entries(maleAgeGroups);
            const femaleAgesArray = Object.entries(femaleAgeGroups);

            const malePercent = ((maleCount/value)*100).toFixed(2);
            const femalePercent = ((femaleCount/value)*100).toFixed(2);

            // @ts-ignore
            const statusColor = statusColors[name] || 'inherit';

            return (
                <TooltipContainer>
                    <TooltipInnerContainer style={{color: statusColor}}>
                        <SectionStyled>
                            <LabelStyles status={name}>
                                <IconStyles><FontAwesomeIcon icon={faChartPie} /></IconStyles>
                                {`Status: ${name}`}
                            </LabelStyles>

                            <DescStyles>{`Total: ${value}`}</DescStyles>
                        </SectionStyled>

                        <FlexContainer>
                            <SectionStyled>
                                <DescStyles>
                                    <IconStyles>
                                        <FontAwesomeIcon style={{color: 'lightskyblue'}} icon={faMale}/>
                                    </IconStyles>
                                    {`Males: ${maleCount}`}
                                    <PercentStyles>({malePercent}%)</PercentStyles>
                                </DescStyles>

                                {maleAgesArray.map(([ageRange, count], index) => {
                                    const agePercent = (((count as number) || 0) / maleCount * 100).toFixed(2);
                                    return (
                                        <AgeGroupContainer key={`${ageRange}-${index}`}>
                                            <AgeGroupDetails>
                                                <AgeGroupLabel>{`Age Range: ${ageRange}`}</AgeGroupLabel>
                                                <AgeGroupCount>{`Number of People: ${(count as number) || 'N/A'}`}</AgeGroupCount>
                                            </AgeGroupDetails>
                                            <PercentageBar percentage={parseFloat(agePercent)} />
                                        </AgeGroupContainer>
                                    );
                                })}
                            </SectionStyled>

                            <SectionStyled>
                                <DescStyles>
                                    <IconStyles>
                                        <FontAwesomeIcon style={{color: 'pink'}} icon={faFemale}/>
                                    </IconStyles>
                                    {`Females: ${femaleCount}`}
                                    <PercentStyles>({femalePercent}%)</PercentStyles>
                                </DescStyles>


                                {femaleAgesArray.map(([ageRange, count], index) => {
                                    const agePercent = (((count as number) || 0) / femaleCount * 100).toFixed(2);
                                    return (
                                        <AgeGroupContainer key={`${ageRange}-${index}`}>
                                            <AgeGroupDetails>
                                                <AgeGroupLabel>{`Age Range: ${ageRange}`}</AgeGroupLabel>
                                                <AgeGroupCount>{`Number of People: ${(count as number) || 'N/A'}`}</AgeGroupCount>
                                            </AgeGroupDetails>
                                            <PercentageBar percentage={parseFloat(agePercent)} />
                                        </AgeGroupContainer>
                                    );
                                })}
                            </SectionStyled>
                        </FlexContainer>
                    </TooltipInnerContainer>
                </TooltipContainer>
            );
        }
        return null;
    };
