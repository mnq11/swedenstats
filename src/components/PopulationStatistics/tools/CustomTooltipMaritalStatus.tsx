import {PayloadType} from "../Charts/Parts";

export const CustomTooltipMaritalStatus: React.FC<{ active: boolean, payload: PayloadType[], label: string }> =
    ({active, payload, label}) => {
        if (active) {
            let maleAgeRange;
            if (payload[0].payload.maleAgeRange[0] === Infinity) {
                maleAgeRange = 'Not available';
            } else if (payload[0].payload.maleAgeRange[0] === payload[0].payload.maleAgeRange[1]) {
                maleAgeRange = `Age: ${payload[0].payload.maleAgeRange[0]}`;
            } else {
                maleAgeRange = `Age: ${payload[0].payload.maleAgeRange[0]} - ${payload[0].payload.maleAgeRange[1]}`;
            }

            let femaleAgeRange;
            if (payload[0].payload.femaleAgeRange[0] === Infinity) {
                femaleAgeRange = 'Not available';
            } else if (payload[0].payload.femaleAgeRange[0] === payload[0].payload.femaleAgeRange[1]) {
                femaleAgeRange = `Age: ${payload[0].payload.femaleAgeRange[0]}`;
            } else {
                femaleAgeRange = `Age: ${payload[0].payload.femaleAgeRange[0]} - ${payload[0].payload.femaleAgeRange[1]}`;
            }

            return (
                <div className="custom-tooltip">
                    <p>{`Status: ${payload[0].name}`}</p>
                    <p>{`Total: ${payload[0].value}`}</p>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <p>{`Males: ${payload[0].payload.maleCount}`}</p>
                            <p>{maleAgeRange}</p>
                        </div>
                        <div style={{margin: '0 20px'}}>
                            <p>|</p>
                        </div>
                        <div>
                            <p>{`Females: ${payload[0].payload.femaleCount}`}</p>
                            <p>{femaleAgeRange}</p>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };
