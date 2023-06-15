import { PayloadType } from "../Charts/Parts";
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMale, faFemale, faChartPie} from '@fortawesome/free-solid-svg-icons'
import { scaleLinear } from 'd3-scale';

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
                <div className="custom-tooltip">
                    <p><FontAwesomeIcon icon={faChartPie} /> {`Status: ${payload[0].name}`}</p>
                    <p>{`Total: ${payload[0].value}`}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p><FontAwesomeIcon icon={faMale} style={{color: 'lightskyblue '}}/> {`Males: ${maleCount}`}</p>
                            {maleAgesArray.map(([ageRange, count], index) => {
                                return (
                                    <div key={index}>
                                        <p><FontAwesomeIcon icon={faMale} style={{color: 'lightskyblue '}} /> {`(${ageRange}) : ${count}`}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ margin: '0 20px' }}>
                            <p>|</p>
                        </div>
                        <div>
                            <p><FontAwesomeIcon icon={faFemale} style={{color: 'pink '}} /> {`Females: ${femaleCount}`}</p>
                            {femaleAgesArray.map(([ageRange, count], index) => {
                                return (
                                    <div key={index}>
                                        <p><FontAwesomeIcon icon={faFemale} style={{color: 'pink '}} /> {`(${ageRange}) : ${count}`}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };
