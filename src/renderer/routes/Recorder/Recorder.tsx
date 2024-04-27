import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Recorder.css';
import KinectCanvas from './KinectCanvas';
import {
  ComparisonBuilder,
  DirectoryStructure,
} from '../comparison_interfaces';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onNextClicked: (comp: ComparisonBuilder) => void;
  comparisonBuilder: ComparisonBuilder;
}

export default function Recorder({ comparisonBuilder, onNextClicked }: Props) {
  const [currentCommit, setCurrentCommit] = useState({} as DirectoryStructure);
  return (
    <>
      <div className="center-by-table">
        <div className="outer">
          <div className="middle">
            <div id="recorder-container" className="inner">
              <h2 id="recorder-title">kinect output:</h2>
              <div>
                <KinectCanvas onRecordingStop={setCurrentCommit} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/menu">
        <button className="btn-arrow" type="button">
          &larr;
        </button>
      </Link>
      <div
        style={{
          position: 'fixed',
          bottom: '5px',
          right: '5px',
          display: comparisonBuilder.reference ? 'block' : 'none',
        }}
      >
        <Link
          to="/browser/recorder/previewer"
          onClick={() => {
            comparisonBuilder.isGoofyCommit = true;
            comparisonBuilder.commit = currentCommit;
            onNextClicked(comparisonBuilder);
          }}
        >
          <button type="button">next</button>
        </Link>
      </div>
    </>
  );
}
