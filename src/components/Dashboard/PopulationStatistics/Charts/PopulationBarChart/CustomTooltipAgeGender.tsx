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
import {colors} from "../../../../../styles/styles";

const TooltipContainer = styled.div`
  background: rgba(0, 0, 0, 0.86);
  border-radius: 10px; // Increased border radius
  background: ${colors.background};
  border-radius: 10px;
  padding: 15px;
  font-size: 1em;
  line-height: 1.4em;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 10px;
  transition: all 0.3s ease;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
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

const TooltipInnerContainer = styled.div`
  padding: 10px; // Increased padding
`;
const TooltipSections = styled.div`
  display: flex;
  justify-content: space-around; // Horizontally center the items and add equal space around them
  flex-wrap: wrap; // Sections will wrap to the next line on smaller screens
  gap: 10px; // Gap between sections for better readability
`;
const GenderInfoStyles = styled.div`
  flex: 1;
  min-width: 200px; // or any minimum width that suits your design
`;

const TotalStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1); // Slightly lighter background
  border-radius: 5px; // Rounded edges
  font-size: 1.2em;
  width: 100%; // Takes the full width of the parent container
`;


const LabelStyles = styled.p`
  color: #efefef;
  font-weight: bold;
  margin-bottom: 5px; // Reduced margin
  font-size: 1.5em;
  border-bottom: 1px solid #efefef; // Added a line for better separation
`;

const DescStyles = styled.p`
  color: #ffffff;
  margin-bottom: 0;
  font-size: 1.2em;
  margin-top: 5px; // Added top margin for better spacing
`;

const IconStyles = styled.div`
  margin-right: 8px; // Increased margin for better spacing
  display: inline-block;
  vertical-align: middle; // Icon will be vertically centered with the text
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
    total: number;
}

const statusToIcon = (status: keyof MaritalStatus) => {
    const statusMap = {
        Single: faRibbon,
        Married: faRing,
        Widowed: faWindowClose,
        Divorced: faHeartBroken,
    };
    return statusMap[status] || faChartPie;
};

const calcPercentage = (count: number, total: number) => ((count / total) * 100).toFixed(2);

const GenderInfo: React.FC<GenderInfoProps> = ({ gender, genderName, total }) => {
    const iconColor = genderName === "Male" ? "lightskyblue" : "pink";
    const icon = genderName === "Male" ? faMale : faFemale;

    const totalCount = Object.values(gender).reduce((a, b) => a + b, 0);

    return (
        <GenderInfoStyles>
            <TooltipInnerContainer>
                <TotalStyles>
                    <IconStyles>
                        <FontAwesomeIcon icon={icon} style={{ color: iconColor }} />
                    </IconStyles>
                    <DescStyles>
                        {`Total ${genderName} : ${totalCount} (${((totalCount / total) * 100).toFixed(2)}%)`}
                    </DescStyles>
                </TotalStyles>
                {Object.entries(gender).map(([status, count]) => {
                    const maritalStatus = status as keyof MaritalStatus;
                    return (
                        <DescStyles key={status}>
                            <IconStyles>
                                <FontAwesomeIcon icon={statusToIcon(maritalStatus)} style={{ color: iconColor }} />
                            </IconStyles>
                            {`${status} : ${count} (${calcPercentage(count, total)}%)`}
                        </DescStyles>
                    );
                })}
            </TooltipInnerContainer>
        </GenderInfoStyles>
    );
};

export const CustomTooltipAgeGender: React.FC<TooltipProps> = ({active, payload}) => {
    if (active && payload?.length) {
        const malePayload = payload[0].payload.Male ?? {Single: 0, Married: 0, Widowed: 0, Divorced: 0};
        const femalePayload = payload[0].payload.Female ?? {Single: 0, Married: 0, Widowed: 0, Divorced: 0};

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