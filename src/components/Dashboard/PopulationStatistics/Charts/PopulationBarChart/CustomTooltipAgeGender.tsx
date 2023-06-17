import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
  background: rgba(0, 0, 0, 0.86);
  border-radius: 5px;
  padding: 10px;
  font-size: 1em;
  line-height: 1.2em;
  color: rgb(255, 255, 255);
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

const TooltipInnerContainer = styled.div`
  padding: 5px;
`;

const TooltipSections = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LabelStyles = styled.p`
  color: #efefef;
  font-weight: bold;
  margin-bottom: 0;
  font-size: 1.5em;

`;

const DescStyles = styled.p`
  color: #ffffff;
  margin-bottom: 0;
  font-size: 1.2em;

`;

const IconStyles = styled.div`
  margin-right: 5px;
  display: inline-block;
`;

interface MaritalStatus {
    Single: number;
    Married: number;
    Widowed: number;
    Divorced: number;
}

interface PayloadType {
    Male: MaritalStatus;
    Female: MaritalStatus;
    name: string;
    value: number;
}

interface TooltipProps {
    active: boolean;
    payload: PayloadType[];
}

interface GenderInfoProps {
    gender: MaritalStatus;
    genderName: string;
}

const GenderInfo: React.FC<GenderInfoProps> = ({gender, genderName}) => {
    const iconColor = genderName === 'Male' ? 'lightskyblue' : 'pink';
    const icon = genderName === 'Male' ? faMale : faFemale;

    return (
        <TooltipInnerContainer>
            <DescStyles>
                <IconStyles>
                    <FontAwesomeIcon icon={icon} style={{color: iconColor}}/>
                </IconStyles>
                {`${genderName} : ${gender.Single + gender.Married + gender.Widowed + gender.Divorced}`}
            </DescStyles>
            {Object.entries(gender).map(([status, count]) => (
                <DescStyles key={status}>
                    <IconStyles>
                        <FontAwesomeIcon icon={statusToIcon(status)} style={{color: iconColor}}/>
                    </IconStyles>
                    {`${status} : ${count}`}
                </DescStyles>
            ))}
        </TooltipInnerContainer>
    );
}

const statusToIcon = (status: string) => {
    switch (status) {
        case 'Single':
            return faRibbon;
        case 'Married':
            return faRing;
        case 'Widowed':
            return faWindowClose;
        case 'Divorced':
            return faHeartBroken;
        default:
            return faChartPie;
    }
};

export const CustomTooltipAgeGender: React.FC<TooltipProps> = ({active, payload}) => {
    if (active && payload && payload.length) {
        const malePayload = payload[0].Male ?? {Single: 0, Married: 0, Widowed: 0, Divorced: 0};
        const femalePayload = payload[0].Female ?? {Single: 0, Married: 0, Widowed: 0, Divorced: 0};

        return (
            <TooltipContainer>
                <TooltipInnerContainer>
                    <LabelStyles>
                        <IconStyles>
                            <FontAwesomeIcon icon={faChartPie}/>
                        </IconStyles>
                        {`Age : ${payload[0].name}`}
                    </LabelStyles>
                    <DescStyles>{`Total : ${payload[0].value}`}</DescStyles>
                    <TooltipSections>
                        <GenderInfo gender={malePayload} genderName="Male"/>
                        <GenderInfo gender={femalePayload} genderName="Female"/>
                    </TooltipSections>
                </TooltipInnerContainer>
            </TooltipContainer>
        );
    }
    return null;
};
