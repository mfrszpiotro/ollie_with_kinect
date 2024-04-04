import React from 'react';
import './ChartDTW.css';
import { DynamicTimeWarp } from '../data_interfaces';
import rising_img from './Rising.png';
import falling_img from './Falling.png';

export interface Props {
  comparisonData: DynamicTimeWarp;
}

export default function ChartDTW({ comparisonData }: Props) {
  return (
    <>
      {comparisonData.stage}
      <div className="chart-dtw">
        {/* Temporary solution for dummy images */}
        <img
          className="img-plot"
          alt="img-plot"
          src={comparisonData.stage === 'Rising' ? rising_img : falling_img}
        />
      </div>
    </>
  );
}
