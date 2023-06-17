import { PayloadType } from "../types/Parts";
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMale, faFemale, faChartPie} from '@fortawesome/free-solid-svg-icons'
import { scaleLinear } from 'd3-scale';
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

export const CustomTooltipMaritalStatus: React.FC<{ active: boolean, payload: PayloadType[], label: string }> =
    ({ active, payload}) => {
        if (active) {
            const maleAgeGroups = payload[0]?.payload?.maleAgeGroups;
            const femaleAgeGroups = payload[0]?.payload?.femaleAgeGroups;
            const maleCount = payload[0]?.payload?.maleCount;
            const femaleCount = payload[0]?.payload?.femaleCount;

            const maleAgesArray = maleAgeGroups ? Object.entries(maleAgeGroups) : [];
            const femaleAgesArray = femaleAgeGroups ? Object.entries(femaleAgeGroups) : [];
            scaleLinear<string>()
                .domain([0, 100]) // assuming age range is from 0 to 100
                .range(['green', 'red']);

            return (
                <TooltipContainer>
                    <LabelStyles><IconStyles><FontAwesomeIcon icon={faChartPie} /></IconStyles>{`Status: ${payload[0].name}`}</LabelStyles>
                    <DescStyles>{`Total: ${payload[0].value}`}</DescStyles>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TooltipContainer>
                            <DescStyles><IconStyles><FontAwesomeIcon style={{color: 'lightskyblue'}} icon={faMale} /></IconStyles>{`Males: ${maleCount}`}</DescStyles>
                            {maleAgesArray.map(([ageRange, count], index) => {
                                return (
                                    <div key={index}>
                                        <DescStyles><IconStyles><FontAwesomeIcon style={{color: 'lightskyblue'}} icon={faMale} /></IconStyles>{`(${ageRange})   ${count}`}</DescStyles>
                                    </div>
                                );
                            })}
                        </TooltipContainer>
                        <div style={{ margin: '0 20px' }}>
                            <p>  </p>
                        </div>
                        <TooltipContainer>
                            <DescStyles><IconStyles><FontAwesomeIcon style={{color: 'pink'}} icon={faFemale} /></IconStyles>{`Females: ${femaleCount}`}</DescStyles>
                            {femaleAgesArray.map(([ageRange, count], index) => {
                                return (
                                    <div key={index}>
                                        <DescStyles><IconStyles><FontAwesomeIcon style={{color: 'pink'}} icon={faFemale} /></IconStyles>{`(${ageRange})   ${count}`}</DescStyles>
                                    </div>
                                );
                            })}
                        </TooltipContainer>
                    </div>
                </TooltipContainer>
            );
        }
        return null;
    };
