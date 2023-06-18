import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartPie} from '@fortawesome/free-solid-svg-icons';
import styled from "styled-components";
import {darkMode} from "../../../../../styles/styles";
import GenderDetails from "./GenderDetails";

const TooltipWrapper  = styled.div`
  background: rgba(0, 0, 0, 0.86);
  border-radius: 10px;
  background: ${darkMode.backgroundColor};
  border-radius: 10px;
  padding: 15px;
  font-size: 1em;
  line-height: 1.4em;
  color: ${darkMode.textColor};
  margin-bottom: 10px;
  transition: all 0.3s ease;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 600px) {
  padding: 10px;
    }

  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 12px;
  }
  @media (min-width: 1025px) {
    padding: 15px;
  }
`;

const TooltipContent   = styled.div`
  padding: 10px;
`;
const TooltipSections = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 10px;
`;

const LabelStyles = styled.div`
  color: #efefef;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 1.5em;
  border-bottom: 1px solid #efefef;
`;

const DescStyles = styled.div`
  color: #ffffff;
  margin-bottom: 0;
  font-size: 1.2em;
  margin-top: 5px;
`;

const IconStyles = styled.span`
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
`;

interface MaritalStatus {
    Single: number;
    Married: number;
    Widowed: number;
    Divorced: number;
}

interface DemographicPayload {
    Male: MaritalStatus;
    Female: MaritalStatus;
    name: string;
    value: number;
}

interface TooltipPayload {
    payload: DemographicPayload;
    name: string;
    value: number;
}

interface TooltipProps {
    active: boolean;
    payload: TooltipPayload[];
}

export const CustomAgeGenderTooltip: React.FC<TooltipProps> = ({active, payload}) => {
    if (active && payload?.length) {
        const malePayload = payload[0].payload.Male ?? {Single: 0, Married: 0, Widowed: 0, Divorced: 0};
        const femalePayload = payload[0].payload.Female ?? {Single: 0, Married: 0, Widowed: 0, Divorced: 0};

        const total = Object.values(malePayload).reduce((a, b) => a + b, 0) +
            Object.values(femalePayload).reduce((a, b) => a + b, 0);

        return (
    <div>
            <TooltipWrapper>
                <TooltipContent>
                    <LabelStyles>
                        <IconStyles>
                            <FontAwesomeIcon icon={faChartPie}/>
                        </IconStyles>
                        {`Age : ${payload[0].payload.name}`}
                    </LabelStyles>
                    <DescStyles>{`Total : ${total}`}</DescStyles>
                    <TooltipSections>
                        <GenderDetails gender={malePayload} genderName="Male" total={total}/>
                        <GenderDetails gender={femalePayload} genderName="Female" total={total}/>
                    </TooltipSections>
                </TooltipContent>
            </TooltipWrapper>
    </div>
        );
    }
    return null;
};

export default CustomAgeGenderTooltip;
