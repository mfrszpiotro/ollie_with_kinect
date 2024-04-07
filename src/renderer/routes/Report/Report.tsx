import { Link } from 'react-router-dom';
import comparison from './test_data/comparison.json';
import { DynamicTimeWarp, TimeTwoEventsComparison } from './data_interfaces';
import TableTTE from './components/TableTTE';
import CircleTTE from './components/CircleTTE';
import ChartDTW from './components/ChartDTW';
import './Report.css';

export interface GradientProps {
  startColor: string;
  endColor: string;
  idCSS: string;
  rotation: string;
}

function GradientSVG({ startColor, endColor, idCSS, rotation }: GradientProps) {
  const gradientTransform = `rotate(${rotation})`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Report() {
  const ComparisonsTTE = comparison.TimeTwoEvents as TimeTwoEventsComparison[];
  const ComparinsonsDTW = comparison.DynamicTimeWarps as DynamicTimeWarp[];
  const gradId = 'pink-gradient';
  return (
    <>
      <Link to="/">
        <button className="btn-arrow" type="button">
          &larr;
        </button>
      </Link>
      <div>
        <ChartDTW comparisonData={ComparinsonsDTW[0]} />
        <ChartDTW comparisonData={ComparinsonsDTW[1]} />
        <TableTTE comparisonData={ComparisonsTTE[0]} />
        <TableTTE comparisonData={ComparisonsTTE[1]} />
        <GradientSVG
          startColor="#EC85DA"
          endColor="#FDB6BF"
          idCSS={gradId}
          rotation="0"
        />
        <CircleTTE comparisonData={ComparisonsTTE[0]} idGradient={gradId} />
        <CircleTTE comparisonData={ComparisonsTTE[1]} idGradient={gradId} />
        <CircleTTE comparisonData={ComparisonsTTE[2]} idGradient={gradId} />
      </div>
      <div>{JSON.stringify(comparison)}</div>
    </>
  );
}
