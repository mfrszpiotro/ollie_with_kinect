import React from 'react';
import { TimeTwoEventsComparison } from '../data_interfaces';

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
      {diff_name}: {event_a_name} & {event_b_name} time difference
      <table>
        <tr>
          <th>commit</th>
          <th>reference</th>
        </tr>
        <tr>
          <td>{time_diff_commit}</td>
          <td>{time_diff_reference}</td>
        </tr>
      </table>
    </>
  );
}
