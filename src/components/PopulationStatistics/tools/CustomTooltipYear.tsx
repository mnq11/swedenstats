import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMale, faFemale, faChartPie} from '@fortawesome/free-solid-svg-icons'

export const CustomTooltipYear = ({active, payload = []}: any) => {
    if (active && payload[0]) {
        return (
            <div className="custom-tooltip">
                <div className="tooltip-section">
                    <p className="label" ><FontAwesomeIcon icon={faChartPie} /> {` Year : ${payload[0].payload.name}`}</p>
                    <p className="desc">{`Total : ${payload[0].value}`}</p>
                    <div className="tooltip-content">
                        <div className="tooltip-section">
                            <p className="desc"><FontAwesomeIcon icon={faMale} style={{color: 'lightskyblue '}} /> {`Male : ${payload[0].payload.Male}`}</p>
                        </div>
                        <div className="tooltip-section">
                            <p className="desc"><FontAwesomeIcon icon={faFemale} style={{color: 'pink '}} />{`Female : ${payload[0].payload.Female}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};
