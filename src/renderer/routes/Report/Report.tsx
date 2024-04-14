import { Link } from 'react-router-dom';
import { useState } from 'react';
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
  const [expandSidePanel, setExpandSidePanel] = useState(false);
  return (
    <>
      <div
        id="report-side-panel"
        className={expandSidePanel ? 'expanded' : 'folded'}
      >
        <div>
          <Link to="/">
            <button className="btn-arrow" type="button">
              &larr;
            </button>
          </Link>
          <button
            className="btn-arrow"
            type="button"
            onClick={() => setExpandSidePanel(!expandSidePanel)}
          >
            ex
          </button>
        </div>
        <div className="report-side-panel-section">
          <CircleTTE comparisonData={ComparisonsTTE[0]} idGradient={gradId} />
          <span style={{ display: expandSidePanel ? 'block' : 'none' }}>
            <TableTTE comparisonData={ComparisonsTTE[0]} />
          </span>
        </div>
        <div className="report-side-panel-section">
          <CircleTTE comparisonData={ComparisonsTTE[1]} idGradient={gradId} />
          <span style={{ display: expandSidePanel ? 'block' : 'none' }}>
            <TableTTE comparisonData={ComparisonsTTE[1]} />
          </span>
        </div>
        <div className="report-side-panel-section">
          <CircleTTE comparisonData={ComparisonsTTE[2]} idGradient={gradId} />
          <span style={{ display: expandSidePanel ? 'block' : 'none' }}>
            <TableTTE comparisonData={ComparisonsTTE[2]} />
          </span>
        </div>
        <GradientSVG
          startColor="#EC85DA"
          endColor="#FDB6BF"
          idCSS={gradId}
          rotation="0"
        />
      </div>
      <div id="report-main-panel">
        <div className="report-section">
          <div />
          <div>
            <h2>Recordings</h2>
            <div className="split-evenly">
              <div>
                <h3>commit</h3>
                <video autoPlay controls style={{ width: '100%' }}>
                  <track kind="captions" />
                </video>
              </div>
              <div>
                <h3>reference</h3>
                <video autoPlay controls style={{ width: '100%' }}>
                  <track kind="captions" />
                </video>
              </div>
            </div>
          </div>
        </div>
        <div className="report-section">
          <div />
          <div>
            <h2>Trajectories</h2>
            <div className="split-evenly">
              <ChartDTW comparisonData={ComparinsonsDTW[0]} />
              <ChartDTW comparisonData={ComparinsonsDTW[1]} />
            </div>
          </div>
        </div>
        <div className="report-section">
          <div />
          <div className="split-1-2">
            <div>
              <h2>Did I lift my back foot immediately after the pop?</h2>
            </div>
            <TableTTE comparisonData={ComparisonsTTE[0]} />
          </div>
        </div>
        <div className="report-section">
          <div />
          <div className="split-2-1">
            <TableTTE comparisonData={ComparisonsTTE[1]} />
            <div>
              <h2>How far did I land from the starting point?</h2>
            </div>
          </div>
        </div>
        {/* <div>{JSON.stringify(comparison)}</div> */}
      </div>
    </>
  );
}
