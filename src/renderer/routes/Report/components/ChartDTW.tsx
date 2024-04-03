import React from 'react';
import './ChartDTW.css';
import { DynamicTimeWarp } from '../data_interfaces';

export interface Props {
  comparisonData: DynamicTimeWarp;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ChartDTW({ comparisonData }: Props) {
  return (
    <div className="chart-dtw">
      {/* {`./${comparisonData.html_plot}`}
      <object
        title="embedded-html"
        type="text/html"
        data={`./${comparisonData.html_plot}`}
      /> */}
    </div>
  );
}
