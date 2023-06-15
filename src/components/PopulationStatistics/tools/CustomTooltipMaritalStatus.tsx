import { AgeRange, PayloadType } from "../Charts/Parts";
import React from "react";

export const CustomTooltipMaritalStatus: React.FC<{ active: boolean, payload: PayloadType[], label: string }> =
    ({ active, payload, label }) => {
        if (active) {
            const maleAgeGroups = payload[0]?.payload?.maleAgeGroups;
            const femaleAgeGroups = payload[0]?.payload?.femaleAgeGroups;
            const maleCount = payload[0]?.payload?.maleCount;
            const femaleCount = payload[0]?.payload?.femaleCount;

            const maleAgesArray = maleAgeGroups ? Object.entries(maleAgeGroups) : [];
            const femaleAgesArray = femaleAgeGroups ? Object.entries(femaleAgeGroups) : [];

            return (
                <div className="custom-tooltip">
                    <p>{`Status: ${payload[0].name}`}</p>
                    <p>{`Total: ${payload[0].value}`}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p>{`Males: ${maleCount}`}</p>
                            {maleAgesArray.map(([ageRange, count], index) => (
                                <div key={index}>
                                    <p>{`(${ageRange}) : ${count}`}</p>
                                </div>
                            ))}
                        </div>
                        <div style={{ margin: '0 20px' }}>
                            <p>|</p>
                        </div>
                        <div>
                            <p>{`Females: ${femaleCount}`}</p>
                            {femaleAgesArray.map(([ageRange, count], index) => (
                                <div key={index}>
                                    <p>{`(${ageRange}) : ${count}`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };
