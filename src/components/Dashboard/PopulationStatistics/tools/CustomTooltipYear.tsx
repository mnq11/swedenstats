// Importing required libraries and modules
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale, faChartPie } from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";

// Styling for the Tooltip Container
const TooltipContainer = styled.div`
  background-color: rgba(51,51,51,0.85);
  border-radius: 5px;
  padding: 10px;
  font-size: 1em;
  line-height: 1.2em;
  color: rgb(255,255,255);
  margin-bottom: 10px;
`;

// Styling for the Labels
const LabelStyles = styled.p`
  color: #efefef;
  font-weight: bold;
  margin-bottom: 0;
`;

// Styling for the Descriptions
const DescStyles = styled.p`
  color: #ffffff;
  margin-bottom: 0;
`;

// Styling for the Icons
const IconStyles = styled.div`
  margin-right: 5px;
  display: inline-block;
`;

// Custom Tooltip Component
export const CustomTooltipYear = ({ active, payload = [] }: any) => {
    if (active && payload[0]) {
        return (
            // Main Tooltip Container
            <TooltipContainer>
                {/* Year Label */}
                <LabelStyles>
                    <IconStyles>
                        <FontAwesomeIcon icon={faChartPie} />
                    </IconStyles>
                    {` Year : ${payload[0].payload.name}`}
                </LabelStyles>

                {/* Total Count */}
                <DescStyles>{`Total : ${payload[0].value}`}</DescStyles>

                {/* Male and Female Counts */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Male Count */}
                    <TooltipContainer>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon style={{color: 'lightskyblue'}} icon={faMale} />
                            </IconStyles>
                            {`Male : ${payload[0].payload.Male}`}
                        </DescStyles>
                    </TooltipContainer>

                    {/* Female Count */}
                    <TooltipContainer>
                        <DescStyles>
                            <IconStyles>
                                <FontAwesomeIcon style={{color: 'pink'}} icon={faFemale} />
                            </IconStyles>
                            {`Female : ${payload[0].payload.Female}`}
                        </DescStyles>
                    </TooltipContainer>
                </div>
            </TooltipContainer>
        );
    }

    return null;
};
