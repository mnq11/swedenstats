import {PayloadType} from "../../types/Parts";
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMale, faFemale, faChartPie} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import {COLORS} from "../../../../../styles/styles";

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
  margin-bottom: 5px; // adjust this as necessary
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

const AgeGroupStyles = styled.div`
  font-size: 0.9em;
  color: inherit;
  margin: 3px 0;
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

            const malePercent = ((maleCount/value)*100).toFixed(2);
            const femalePercent = ((femaleCount/value)*100).toFixed(2);

            // @ts-ignore
            const statusColor = statusColors[name] || 'inherit';

            return (
                <TooltipContainer>
                    <TooltipInnerContainer style={{color: statusColor}}>
                        <LabelStyles status={name}>
                            <IconStyles><FontAwesomeIcon icon={faChartPie} /></IconStyles>
                            {`Status: ${name}`}
                        </LabelStyles>

                        <DescStyles>{`Total: ${value}`}</DescStyles>
                        <FlexContainer>
                            <TooltipInnerContainer style={{color: statusColor}}>
                                <DescStyles>
                                    <IconStyles>
                                        <FontAwesomeIcon style={{color: 'lightskyblue'}} icon={faMale}/>
                                    </IconStyles>
                                    {`Males: ${maleCount}`}
                                    <PercentStyles>({malePercent}%)</PercentStyles>
                                </DescStyles>
                                {maleAgesArray.map(([ageRange, count], index) => {
                                    // @ts-ignore
                                    const ageGroupPercent = ((count/maleCount)*100).toFixed(2);
                                    return (
                                        <AgeGroupStyles key={index}>
                                            <DescStyles>
                                                <IconStyles><FontAwesomeIcon style={{color: 'lightskyblue'}} icon={faMale}/></IconStyles>
                                                {`(${ageRange})   ${count}`}
                                                <PercentStyles>({ageGroupPercent}%)</PercentStyles>
                                            </DescStyles>
                                        </AgeGroupStyles>
                                    )
                                })}
                            </TooltipInnerContainer>
                            <TooltipInnerContainer style={{color: statusColor}}>
                                <DescStyles>
                                    <IconStyles>
                                        <FontAwesomeIcon style={{color: 'pink'}} icon={faFemale}/>
                                    </IconStyles>
                                    {`Females: ${femaleCount}`}
                                    <PercentStyles>({femalePercent}%)</PercentStyles>
                                </DescStyles>
                                {femaleAgesArray.map(([ageRange, count], index) => {
                                    // @ts-ignore
                                    const ageGroupPercent = ((count/femaleCount)*100).toFixed(2);
                                    return (
                                        <AgeGroupStyles key={index}>
                                            <DescStyles>
                                                <IconStyles><FontAwesomeIcon style={{color: 'pink'}} icon={faFemale}/></IconStyles>
                                                {`(${ageRange})   ${count}`}
                                                <PercentStyles>({ageGroupPercent}%)</PercentStyles>
                                            </DescStyles>
                                        </AgeGroupStyles>
                                    )
                                })}
                            </TooltipInnerContainer>
                        </FlexContainer>
                    </TooltipInnerContainer>
                </TooltipContainer>
            );
        }
        return null;
    };
