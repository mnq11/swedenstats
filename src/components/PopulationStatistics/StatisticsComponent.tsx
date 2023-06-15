import React, {useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell} from 'recharts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMale, faFemale, faRing, faHeartBroken, faWindowClose, faRibbon} from '@fortawesome/free-solid-svg-icons'
import { LabelList } from 'recharts';
interface StatsData {
    data: {
        key: string[],
        values: string[]
    }[]
}

interface Props {
    statsData: StatsData;
}

const darkMode = {
    backgroundColor: "#282c34",
    axisColor: "#ccc",
    gridColor: "#666",
    primaryColor: "#10B981",
    secondaryColor: "#3B82F6",
    tertiaryColor: "#6B7280",
    quaternaryColor: "#D1D5DB",
    tooltipColor: "#000",
    tooltipBgColor: "#FFF",
    fontFamily: "Arial"
};


const CustomTooltipAgeGender = ({active, payload}: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip"
                 style={{
                     backgroundColor: darkMode.tooltipBgColor,
                     color: darkMode.tooltipColor,
                     maxWidth: '300px',
                     overflow: 'hidden'
                 }}>
                <p className="label">{`Age : ${payload[0].payload.name}`}</p>
                <p className="desc">{`Population : ${payload[0].value}`}</p>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px'}}>
                    <div>
                        <p className="desc"><FontAwesomeIcon icon={faMale} style={{color: 'lightskyblue '}} /> {`Male : ${payload[0].payload.Male.Single + payload[0].payload.Male.Married + payload[0].payload.Male.Widowed + payload[0].payload.Male.Divorced}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faRibbon} style={{color: 'lightskyblue '}} /> {`Single : ${payload[0].payload.Male.Single}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faRing} style={{color: 'lightskyblue '}} /> {`Married : ${payload[0].payload.Male.Married}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faWindowClose} style={{color: 'lightskyblue '}} /> {`Widowed : ${payload[0].payload.Male.Widowed}`}</p>
                        <p className="desc"><FontAwesomeIcon icon={faHeartBroken} style={{color: 'lightskyblue '}} /> {`Divorced : ${payload[0].payload.Male.Divorced}`}</p>
                    </div>
                    <div>
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


const CustomTooltipYear = ({active, payload = []}: any) => {
    if (active && payload[0]) {
        return (
            <div className="custom-tooltip"
                 style={{backgroundColor: darkMode.tooltipBgColor, color: darkMode.tooltipColor}}>
                <p className="label">{`Year : ${payload[0].payload.name}`}</p>
                <p className="desc">{`Population : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};


const StatisticsComponent: React.FC<Props> = ({statsData}) => {
    const [selectedYear, setSelectedYear] = useState('2022');
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('All');

    const COLORS = ['#10B981', '#3B82F6', '#6B7280', '#D1D5DB'];

    const chartData = statsData.data.map((item, index) => ({
        name: `Data ${index + 1}`,
        Region: item.key[0],
        MaritalStatus: item.key[1],
        Age: item.key[2],
        Gender: item.key[3],
        Year: item.key[4],
        Population: parseInt(item.values[0]),
    }));

    const filteredData = chartData.filter(d => (d.Year === selectedYear) && (selectedMaritalStatus === 'All' || d.MaritalStatus === selectedMaritalStatus));


    const yearPopulationData = chartData.reduce<{
        [key: string]: { name: string, value: number }
    }>((accumulator, current) => {
        if (accumulator[current.Year]) {
            accumulator[current.Year].value += current.Population;
        } else {
            accumulator[current.Year] = {name: current.Year, value: current.Population};
        }
        return accumulator;
    }, {});

    const maritalStatusPopulationData = chartData.reduce<{
        [key: string]: { name: string, value: number }
    }>((accumulator, current) => {
        const maritalStatusMap: { [key: string]: string } = {
            'OG': 'Single',
            'G': 'Married',
            'ÄNKL': 'Widowed',
            'SK': 'Divorced'
        };

        const maritalStatus = maritalStatusMap[current.MaritalStatus];

        if (accumulator[maritalStatus]) {
            accumulator[maritalStatus].value += current.Population;
        } else {
            accumulator[maritalStatus] = {name: maritalStatus, value: current.Population};
        }
        return accumulator;
    }, {});

    const agePopulationData = filteredData.reduce<{
        [key: string]: {
            name: string,
            value: number,
            Male: { Single: number, Married: number, Widowed: number, Divorced: number },
            Female: { Single: number, Married: number, Widowed: number, Divorced: number }
        }
    }>((accumulator, current) => {

        if (!accumulator[current.Age]) {
            accumulator[current.Age] = {
                name: current.Age,
                value: current.Population,
                Male: {Single: 0, Married: 0, Widowed: 0, Divorced: 0},
                Female: {Single: 0, Married: 0, Widowed: 0, Divorced: 0},
            };
        }

        const maritalStatus = current.MaritalStatus === 'G' ? 'Married' : (current.MaritalStatus === 'ÄNKL' ? 'Widowed' : (current.MaritalStatus === 'OG' ? 'Single' : 'Divorced'));

        if (current.Gender === '1') {
            accumulator[current.Age].Male[maritalStatus] += current.Population;
        } else {
            accumulator[current.Age].Female[maritalStatus] += current.Population;
        }

        accumulator[current.Age].value += current.Population;

        return accumulator;
    }, {});


    const genderPopulationData = filteredData.reduce<{
        [key: string]: { name: string, value: number }
    }>((accumulator, current) => {
        // Map '1' to 'Male' and '2' to 'Female'
        const gender = current.Gender === '1' ? 'Male' : 'Female';

        if (accumulator[gender]) {
            accumulator[gender].value += current.Population;
        } else {
            accumulator[gender] = {name: gender, value: current.Population};
        }
        return accumulator;
    }, {});

    const yearPopulationChartData = Object.values(yearPopulationData).map(obj => ({
        ...obj,
        name: parseInt(obj.name)
    })).sort((a, b) => a.name - b.name);
    const maritalStatusPopulationChartData = Object.values(maritalStatusPopulationData);
    const agePopulationChartData = Object.values(agePopulationData).map(obj => ({
        ...obj,
        name: parseInt(obj.name)
    })).sort((a, b) => a.name - b.name);
    const genderPopulationChartData = Object.values(genderPopulationData);
    const YEARS = Array.from({length: 2022 - 1968 + 1}, (_, i) => String(2022 - i));

    return (
        <div className="StatisticsComponent">
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                {YEARS.map(year => <option key={year}>{year}</option>)}
            </select>

            <label>Select Marital Status:
                <select value={selectedMaritalStatus} onChange={e => setSelectedMaritalStatus(e.target.value)}>
                    <option key="All">All</option>
                    {Object.keys(maritalStatusPopulationChartData).map(status => <option
                        key={status}>{status}</option>)}
                </select>
            </label>
            <div className="chart-container">
                <div className="chart">
                    <h2>Population by Age in {selectedYear}</h2>
                    <BarChart width={600} height={300} data={agePopulationChartData}
                              style={{backgroundColor: darkMode.backgroundColor}}>
                        <XAxis dataKey="name" stroke={darkMode.axisColor}/>
                        <YAxis stroke={darkMode.axisColor} label={{ value: 'Age', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip content={<CustomTooltipAgeGender/>}/>
                        <Legend/>
                        <CartesianGrid stroke={darkMode.gridColor}/>
                        <Bar dataKey="value" barSize={20} fill={darkMode.primaryColor}>
                            <LabelList dataKey="name" position="top" />
                        </Bar>
                    </BarChart>
                </div>
                <div className="chart">
                    <h2>Population by Year</h2>
                    <BarChart width={600} height={300} data={yearPopulationChartData}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip content={<CustomTooltipYear/>}/>
                        <Legend/>
                        <CartesianGrid stroke="#f5f5f5"/>
                        <Bar dataKey="value" barSize={20} fill="#413ea0">
                            {
                                yearPopulationChartData.map((entry, index) => <Cell key={`cell-${index}`}
                                                                                    fill={COLORS[index % COLORS.length]}/>)
                            }
                        </Bar>
                    </BarChart>

                </div>


                <div className="chart">
                    <h2>Population by Marital Status in {selectedYear}</h2>
                    <PieChart width={600} height={300} style={{margin: 'auto'}}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true} // enable animation
                            data={maritalStatusPopulationChartData}
                            cx={200}
                            cy={200}
                            outerRadius={80}
                            fill="#8884d8"
                            labelLine={true} // hide the line connecting the label to the pie
                            label={({
                                        name,
                                        percent
                                    }) => `${name}: ${(percent * 100).toFixed(0)}%`} // show percentage in labels
                        >
                            {
                                maritalStatusPopulationChartData.map((entry, index) =>
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="#fff" // add white stroke to make each cell more distinct
                                        strokeWidth={1}
                                    />)
                            }
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </div>
                <div className="chart">
                    <h2>Population by Gender in {selectedYear}</h2>
                    <PieChart width={600} height={300} style={{margin: 'auto'}}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={genderPopulationChartData}
                            cx={200}
                            cy={200}
                            outerRadius={70}
                            fill={darkMode.primaryColor}
                            labelLine={true}
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >

                            {
                                genderPopulationChartData.map((entry, index) =>
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke={darkMode.backgroundColor}
                                        strokeWidth={1}
                                    />
                                )
                            }
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </div>

            </div>
        </div>
    );
}

export default StatisticsComponent;
