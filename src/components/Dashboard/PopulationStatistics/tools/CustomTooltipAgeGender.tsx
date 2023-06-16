import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMale,
    faFemale,
    faRing,
    faHeartBroken,
    faWindowClose,
    faRibbon,
    faChartPie
} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

const TooltipContainer = styled.div`
  background-color: rgba(51,51,51,0.85);
  border-radius: 5px;
  padding: 10px;
  font-size: 1em;
  line-height: 1.2em;
  color: rgb(255,255,255);
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

const TooltipSections = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LabelStyles = styled.p`
  color: #efefef;
  font-weight: bold;
  margin-bottom: 0;
`;

const DescStyles = styled.p`
  color: #ffffff;
  margin-bottom: 0;
`;

const IconStyles = styled.div`
  margin-right: 5px;
  display: inline-block;
`;

export const CustomTooltipAgeGender = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <TooltipContainer>
                <LabelStyles>
                    <IconStyles>
                        <FontAwesomeIcon icon={faChartPie} />
                    </IconStyles>
                    {`Age : ${payload[0].payload.name}`}
                </LabelStyles>
                <DescStyles>{`Total : ${payload[0].value}`}</DescStyles>
                <TooltipSections>
                    <TooltipContainer>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faMale} style={{ color: 'lightskyblue ' }} />
                            </IconStyles>
                            {`Male : ${payload[0].payload.Male.Single + payload[0].payload.Male.Married + payload[0].payload.Male.Widowed + payload[0].payload.Male.Divorced}`}
                        </DescStyles>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faRibbon} style={{ color: 'lightskyblue ' }} />
                            </IconStyles>
                            {`Single : ${payload[0].payload.Male.Single}`}
                        </DescStyles>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faRing} style={{ color: 'lightskyblue ' }} />
                            </IconStyles>
                            {`Married : ${payload[0].payload.Male.Married}`}
                        </DescStyles>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faWindowClose} style={{ color: 'lightskyblue ' }} />
                            </IconStyles>
                            {`Widowed : ${payload[0].payload.Male.Widowed}`}
                        </DescStyles>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faHeartBroken} style={{ color: 'lightskyblue ' }} />
                            </IconStyles>
                            {`Divorced : ${payload[0].payload.Male.Divorced}`}
                        </DescStyles>
                    </TooltipContainer>
                    <TooltipContainer>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faFemale} style={{ color: 'pink ' }} />
                            </IconStyles>
                            {`Female : ${payload[0].payload.Female.Single + payload[0].payload.Female.Married + payload[0].payload.Female.Widowed + payload[0].payload.Female.Divorced}`}
                        </DescStyles>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faRibbon} style={{ color: 'pink ' }} />
                            </IconStyles>
                            {`Single : ${payload[0].payload.Female.Single}`}
                        </DescStyles>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faRing} style={{ color: 'pink ' }} />
                            </IconStyles>
                            {`Married : ${payload[0].payload.Female.Married}`}
                        </DescStyles>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faWindowClose} style={{ color: 'pink ' }} />
                            </IconStyles>
                            {`Widowed : ${payload[0].payload.Female.Widowed}`}
                        </DescStyles>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon icon={faHeartBroken} style={{ color: 'pink ' }} />
                            </IconStyles>
                            {`Divorced : ${payload[0].payload.Female.Divorced}`}
                        </DescStyles>
                    </TooltipContainer>
                </TooltipSections>
            </TooltipContainer>
        );
    }
    return null;
};
