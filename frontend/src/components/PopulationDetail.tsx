import { PopulationCounts } from "../types/type";

interface PopulationDetailProps {
  population: PopulationCounts;
}

export const PopulationDetail: React.FC<PopulationDetailProps> = ({
  population,
}) => {
  return (
    <>
      <strong>Year: </strong>
      {population.year}
      <strong>People: </strong>
      {population.value.toLocaleString()}
    </>
  );
};
