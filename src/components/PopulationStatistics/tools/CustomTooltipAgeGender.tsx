import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faMale,
    faFemale,
    faRing,
    faHeartBroken,
    faWindowClose,
    faRibbon,
    faChartPie
} from '@fortawesome/free-solid-svg-icons'

export const CustomTooltipAgeGender = ({active, payload}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label" ><FontAwesomeIcon icon={faChartPie} />{`Age : ${payload[0].payload.name}`}</p>
                <p className="desc">{`Total : ${payload[0].value}`}</p>
                <div className="tooltip-content">
                    <div className="tooltip-section">
                        <p className="desc"><FontAwesomeIcon icon={faMale} style={{color: 'lightskyblue '}} /> {`Male : ${payload[0].payload.Male.Single + payload[0].payload.Male.Married + payload[0].payload.Male.Widowed + payload[0].payload.Male.Divorced}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faRibbon} style={{color: 'lightskyblue '}} /> {`Single : ${payload[0].payload.Male.Single}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faRing} style={{color: 'lightskyblue '}} /> {`Married : ${payload[0].payload.Male.Married}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faWindowClose} style={{color: 'lightskyblue '}} /> {`Widowed : ${payload[0].payload.Male.Widowed}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faHeartBroken} style={{color: 'lightskyblue '}} /> {`Divorced : ${payload[0].payload.Male.Divorced}`}</p>
                    </div>
                    <div className="tooltip-section">
                        <p className="desc"><FontAwesomeIcon icon={faFemale} style={{color: 'pink '}} />{`Female : ${payload[0].payload.Female.Single + payload[0].payload.Female.Married + payload[0].payload.Female.Widowed + payload[0].payload.Female.Divorced}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faRibbon} style={{color: 'pink '}} /> {`Single : ${payload[0].payload.Female.Single}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faRing} style={{color: 'pink '}} /> {`Married : ${payload[0].payload.Female.Married}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faWindowClose} style={{color: 'pink '}} /> {`Widowed : ${payload[0].payload.Female.Widowed}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faHeartBroken} style={{color: 'pink '}} /> {`Divorced : ${payload[0].payload.Female.Divorced}`}</p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};


