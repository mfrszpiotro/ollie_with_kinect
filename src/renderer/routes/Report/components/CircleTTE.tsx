import { CircularProgressbar } from 'react-circular-progressbar';
import { TimeTwoEventsComparison } from '../data_interfaces';
import 'react-circular-progressbar/dist/styles.css';
import './CircleTTE.css';

export interface Props {
  comparisonData: TimeTwoEventsComparison;
  idGradient: string;
}

export default function CircleTTE({ comparisonData, idGradient }: Props) {
  const { relative_percent } = comparisonData.how_close;
  return (
    <CircularProgressbar
      value={relative_percent}
      text={relative_percent ? `${relative_percent.toFixed(0)}%` : 'N/A'}
      styles={{
        path: { stroke: `url(#${idGradient})` },
      }}
    />
  );
}
