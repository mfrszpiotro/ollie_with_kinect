import React from 'react';
import path from 'path';
import './ChartDTW.css';
import { DynamicTimeWarp } from '../data_interfaces';

export interface Props {
  comparisonData: DynamicTimeWarp;
}

export default function ChartDTW({ comparisonData }: Props) {
  return (
    <div>
      <h3 className="charts-title">
        {comparisonData.stage.toLowerCase()} phase
      </h3>
      <div className="chart-dtw">
        <img
          className="img-plot"
          alt="img-plot"
          src={`${path.join(process.cwd(), comparisonData.figure_name)}.png`}
        />
      </div>
    </div>
  );
}
