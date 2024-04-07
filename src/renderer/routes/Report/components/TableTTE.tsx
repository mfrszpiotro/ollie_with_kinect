import React from 'react';
import { TimeTwoEventsComparison } from '../data_interfaces';
import './TableTTE.css';

export interface Props {
  comparisonData: TimeTwoEventsComparison;
}

export default function TableTTE({ comparisonData }: Props) {
  const {
    // diff_name,
    // event_a_name,
    // event_b_name,
    time_diff_commit,
    time_diff_reference,
  } = comparisonData;
  return (
    <>
      {/* <h4>
        {diff_name}: {event_a_name} & {event_b_name}
      </h4> */}
      <table className="table-tte">
        <thead>
          <tr>
            <th>commit</th>
            <th>reference</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{time_diff_commit}</td>
            <td>{time_diff_reference}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
