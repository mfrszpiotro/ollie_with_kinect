import React from 'react';
import './ChartDTW.css';
import { DynamicTimeWarp } from '../data_interfaces';
import rising_img from '../test_data/Rising.png';
import falling_img from '../test_data/Falling.png';

export interface Props {
  comparisonData: DynamicTimeWarp;
}

export default function ChartDTW({ comparisonData }: Props) {
  return (
    <div>
      {comparisonData.stage}
      <div className="chart-dtw">
        {/* Temporary solution for dummy images */}
        <img
          className="img-plot"
          alt="img-plot"
          src={comparisonData.stage === 'Rising' ? rising_img : falling_img}
        />
      </div>
    </div>
  );
}
