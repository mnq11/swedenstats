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

interface PayloadNestedType {
    Male: MaritalStatus;
    Female: MaritalStatus;
    name: string;
    value: number;
}

interface PayloadType {
    payload: PayloadNestedType;
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

interface GenderInfoProps {
    gender: MaritalStatus;
    genderName: string;
    total: number;
}

// Helper function to map status to corresponding icon
const statusToIcon = (status: string) => {
    switch (status) {
        case "Single":
            return faRibbon;
        case "Married":
            return faRing;
        case "Widowed":
            return faWindowClose;
        case "Divorced":
            return faHeartBroken;
        default:
            return faChartPie;
    }
};

const GenderInfo: React.FC<GenderInfoProps> = ({ gender, genderName, total }) => {
    const iconColor = genderName === "Male" ? "lightskyblue" : "pink";
    const icon = genderName === "Male" ? faMale : faFemale;

    const totalCount = Object.values(gender).reduce((a, b) => a + b, 0);

    return (
        <TooltipInnerContainer>
            <DescStyles>
                <IconStyles>
                    <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />
                </IconStyles>
                {`${genderName} : ${totalCount} (${((totalCount / total) * 100).toFixed(2)}%)`}
            </DescStyles>
            {Object.entries(gender).map(([status, count]) => (
                <DescStyles key={status}>
                    <IconStyles>
                        <FontAwesomeIcon icon={statusToIcon(status)} style={{ color: iconColor }} />
                    </IconStyles>
                    {`${status} : ${count} (${((count / totalCount) * 100).toFixed(2)}%)`}
                </DescStyles>
            ))}
        </TooltipInnerContainer>
    );
};

export const CustomTooltipAgeGender: React.FC<TooltipProps> = ({active, payload}) => {
    if (active && payload && payload.length) {
        const malePayload = payload[0].payload.Male ?? {Single: 0, Married: 0, Widowed: 0, Divorced: 0};
        const femalePayload = payload[0].payload.Female ?? {Single: 0, Married: 0, Widowed: 0, Divorced: 0};
        // Calculate total count for both genders
        const total = Object.values(malePayload).reduce((a, b) => a + b, 0) +
            Object.values(femalePayload).reduce((a, b) => a + b, 0);

        return (
            <TooltipContainer>
                <TooltipInnerContainer>
                    <LabelStyles>
                        <IconStyles>
                            <FontAwesomeIcon icon={faChartPie}/>
                        </IconStyles>
                        {`Age : ${payload[0].payload.name}`}
                    </LabelStyles>
                    <DescStyles>{`Total : ${total}`}</DescStyles>
                    <TooltipSections>
                        <GenderInfo gender={malePayload} genderName="Male" total={total}/>
                        <GenderInfo gender={femalePayload} genderName="Female" total={total}/>
                    </TooltipSections>
                </TooltipInnerContainer>
            </TooltipContainer>
        );
    }
    return null;
};
