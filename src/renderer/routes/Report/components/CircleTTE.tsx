import React from 'react';
import { TimeTwoEventsComparison } from '../data_interfaces';

export interface Props {
  comparisonData: TimeTwoEventsComparison;
}

export default function CircleTTE({ comparisonData }: Props) {
  const { how_close } = comparisonData;
  return <div />;
}
