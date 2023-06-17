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
  padding: 10px;
  border-radius: 5px;
`;

const TooltipInnerContainer = styled.div`
  padding: 10px;
  font-size: 1em;
  line-height: 1.2em;
  color: ${WHITE};
  margin-bottom: 10px;
`;

const LabelStyles = styled.p`
  color: ${LIGHT_GRAY};
  font-weight: bold;
  margin-bottom: 0;
  font-size: 1.5em;
`;

const DescStyles = styled.p`
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

export const CustomTooltipYear = ({active, payload = []}: { active: boolean, payload: any[] }) => {
    if (active && payload[0]) {
        const {name, Male, Female, GrowthRate, MaleGrowthRate, FemaleGrowthRate} = payload[0].payload;

        return (
            <TooltipContainer>
                <TooltipInnerContainer>
                    <LabelStyles>
                        <IconStyles>
                            <FontAwesomeIcon icon={faChartPie}/>
                        </IconStyles>
                        {` Year : ${name}`}
                    </LabelStyles>

                    <DescStyles>{`Total : ${payload[0].value}`}</DescStyles>
                    <DescStyles>{`Total Growth Rate: ${(GrowthRate || 0).toFixed(3)}%`}</DescStyles>

                    <FlexContainer>
                        <TooltipInnerContainer>
                            <DescStyles>
                                <IconStyles>
                                    <FontAwesomeIcon style={{color: LIGHT_SKY_BLUE}} icon={faMale}/>
                                </IconStyles>
                                {`Male : ${Male}`}
                            </DescStyles>
                            <DescStyles>
                                <IconStyles>
                                    <FontAwesomeIcon style={{color: LIGHT_SKY_BLUE}} icon={faMale}/>
                                </IconStyles>
                                {`Male Growth Rate: ${(MaleGrowthRate || 0).toFixed(3)}%`}
                            </DescStyles>
                        </TooltipInnerContainer>

                        <TooltipInnerContainer>
                            <DescStyles>
                                <IconStyles>
                                    <FontAwesomeIcon style={{color: PINK}} icon={faFemale}/>
                                </IconStyles>
                                {`Female : ${Female}`}
                            </DescStyles>
                            <DescStyles>
                                <IconStyles>
                                    <FontAwesomeIcon style={{color: PINK}} icon={faFemale}/>
                                </IconStyles>
                                {`Female Growth Rate: ${(FemaleGrowthRate || 0).toFixed(3)}%`}
                            </DescStyles>
                        </TooltipInnerContainer>
                    </FlexContainer>

                </TooltipInnerContainer>
            </TooltipContainer>
        );
    }

    return null;
};
