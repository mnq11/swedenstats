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
import {darkMode, colors} from "../../../../../styles/styles";
import PercentageBar from "../bars/PercentageBar";

const GenderDetailsContainer = styled.div`
  flex: 1;
  min-width: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: ${darkMode.backgroundColor};
  box-sizing: border-box;
  margin: 10px;
`;


const TotalLabel = styled.h3`
  font-weight: 500;
  color: ${darkMode.textColor};
  margin-bottom: 20px;
`;

const TotalLabelPercentage = styled.span`
  font-size: 1.2em;
  font-weight: 700;
  color: ${props => props.color};
`;

const TotalLabelGenderAndTotal = styled.span`
  font-size: 1.2em;
  font-weight: 700;
  color: ${props => props.color};
`;

const IconContainer = styled.span`
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
`;

const DescriptionLabel = styled.div`
  font-size: 1em;
  color: ${darkMode.textColor};
  margin: 10px 0;
`;

interface MaritalStatus {
    Single: number;
    Married: number;
    Widowed: number;
    Divorced: number;
}

interface GenderDetailsProps {
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

const calcPercentage = (count: number, total: number) => total !== 0 ? ((count / total) * 100).toFixed(2) : 0;

const GenderDetails: React.FC<GenderDetailsProps> = ({gender, genderName, total}) => {
    const iconColor = genderName === "Male" ? colors.blue : colors.pink;
    const icon = genderName === "Male" ? faMale : faFemale;

    const totalCount = Object.values(gender).reduce((a, b) => a + b, 0);
    const percentage = calcPercentage(totalCount, total);

    return (
        <GenderDetailsContainer>
            <TotalLabel>
                <IconContainer>
                    <FontAwesomeIcon icon={icon} style={{color: iconColor}}/>
                </IconContainer>
                <TotalLabelGenderAndTotal color={iconColor}>
                    {`Total ${genderName} : ${totalCount} `}
                </TotalLabelGenderAndTotal>

                <TotalLabelPercentage color={iconColor}>
                    {`(${percentage}%)`}
                </TotalLabelPercentage>
            </TotalLabel>
            {Object.entries(gender).map(([status, count]) => {
                const maritalStatus = status as keyof MaritalStatus;
                return (
                    <div key={maritalStatus}>
                        <DescriptionLabel>
                            <IconContainer>
                                <FontAwesomeIcon icon={statusToIcon(maritalStatus)} style={{color: iconColor}}/>
                            </IconContainer>
                            {`${status} : ${count} `}
                        </DescriptionLabel>
                        <PercentageBar percentage={Number(calcPercentage(count, totalCount))}/>
                    </div>
                );
            })}
        </GenderDetailsContainer>
    );
};

export default GenderDetails;
