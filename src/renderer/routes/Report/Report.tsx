import { Link } from 'react-router-dom';
import comparison from '../../../../comparison.json';
import { TimeTwoEventsComparison } from './data_interfaces';
import TableTTE from './components/TableTTE';
import './Report.css';

export default function Report() {
  const ComparisonsTTE = comparison.TimeTwoEvents as TimeTwoEventsComparison[];
  const ComparinsonsDTW = comparison.DynamicTimeWarps as [];
  return (
    <>
      <Link to="/">
        <button className="btn-arrow" type="button">
          &larr;
        </button>
      </Link>
      <div>
        <TableTTE comparisonData={ComparisonsTTE[0]} />
        <TableTTE comparisonData={ComparisonsTTE[1]} />
      </div>
      <div>{JSON.stringify(comparison)}</div>
    </>
  );
}
