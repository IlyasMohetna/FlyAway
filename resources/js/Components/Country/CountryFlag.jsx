import Flag from "react-world-flags";

const CountryFlag = ({ iso2, height, width }) => (
    <Flag code={iso2.toUpperCase()} height={height} width={width} />
);
export default CountryFlag;
