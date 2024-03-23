import React from 'react';
import { TimeTwoEventsComparison } from '../data_interfaces';
import './TableTTE.css';

export interface Props {
  comparisonData: TimeTwoEventsComparison;
}

export default function TableTTE({ comparisonData }: Props) {
  const {
    diff_name,
    event_a_name,
    event_b_name,
    time_diff_commit,
    time_diff_reference,
  } = comparisonData;
  return (
    <>
      <h4>
        {diff_name}: {event_a_name} & {event_b_name}
      </h4>
      <table className="table-tte">
        <tr>
          <th>commit</th>
          <th className="solid-black-border-left">reference</th>
        </tr>
        <tr>
          <td>{time_diff_commit}</td>
          <td className="solid-black-border-left">{time_diff_reference}</td>
        </tr>
      </table>
    </>
  );
}
