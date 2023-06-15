
export const getColor = (value: number) => {
    const hue=((1-value/100)*120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
}

