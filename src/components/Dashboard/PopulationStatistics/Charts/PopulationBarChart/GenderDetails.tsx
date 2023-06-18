import React, {useState, useEffect} from "react";
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
import {COLORS, darkMode,colors} from "../../../../../styles/styles";
import {Pie, PieChart, Tooltip, Cell, Legend} from "recharts";
import ReactResizeDetector from 'react-resize-detector';


const GenderDetailsContainer = styled.div`
  padding: 10px;
  border-radius: 10px;
`;

const TotalLabel = styled.h3`
  font-weight: 500;
  color: ${darkMode.textColor};
  margin-bottom: 10px;
`;

const IconContainer = styled.span`
  margin-right: 8px;
  display: inline-block;
  vertical-align: middle;
`;

const DescriptionLabel = styled.div`
  font-size: 0.9em;
  color: ${darkMode.textColor};
  margin: 0;
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

    const [chartDimension, setChartDimension] = useState<number>(200);  // Default dimension

    useEffect(() => {
        const updateChartDimension = () => {
            let dimension;
            const viewportWidth = window.innerWidth;


            if (viewportWidth <= 480) {  // mobile devices
                dimension = 50;  // Adjusted size for mobile devices
            } else if (viewportWidth <= 768) {  // tablets
                dimension = 100;  // Adjusted size for tablets
            } else {  // desktops and larger devices
                dimension = 150;  // Adjusted size for desktops
            }

            dimension = Math.max(50, dimension);  // Minimum size
            dimension = Math.min(150, dimension);  // Maximum size
            setChartDimension(dimension);
        };

        window.addEventListener("resize", updateChartDimension);
        updateChartDimension();  // Call the function once to set initial state

        // Cleanup function: remove the listener when the component is unmounted
        return () => window.removeEventListener("resize", updateChartDimension);
    }, []);  // Empty dependency array to run effect only once on mount and unmount

    return (
        <div>
            <GenderDetailsContainer>
                <TotalLabel>
                    <IconContainer>
                        <FontAwesomeIcon icon={icon} style={{color: iconColor}}/>
                    </IconContainer>
                    <DescriptionLabel>
                        {`Total ${genderName} : ${totalCount} (${percentage}%)`}
                    </DescriptionLabel>
                </TotalLabel>
                {Object.entries(gender).map(([status, count], index) => {
                    const maritalStatus = status as keyof MaritalStatus;
                    return (
                        <DescriptionLabel key={`description-${index}`}>
                            <IconContainer>
                                <FontAwesomeIcon icon={statusToIcon(maritalStatus)} style={{color: iconColor}}/>
                            </IconContainer>
                            {`${status} : ${count} (${calcPercentage(count, totalCount)}%)`}
                        </DescriptionLabel>
                    );
                })}
                <ReactResizeDetector handleWidth onResize={(width) => width && setChartDimension(width)}>
                    <PieChart width={chartDimension} height={chartDimension}>
                        <Pie
                            data={Object.entries(gender).map(([key, value]) => ({name: key, value}))}
                            cx={chartDimension / 2}
                            cy={chartDimension / 2}
                            outerRadius={chartDimension / 5}
                            fill="#8884d8"
                            dataKey="value"
                            labelLine={false}
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {
                                Object.values(gender).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                ))
                            }
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </ReactResizeDetector>
            </GenderDetailsContainer>
        </div>
    );
};

export default GenderDetails;