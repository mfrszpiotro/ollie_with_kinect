import { Link } from 'react-router-dom';
import './Browser.css';
import { useState } from 'react';
import SearchPanel from './SearchPanel';
import {
  ComparisonBuilder,
  DirectoryStructure,
} from '../comparison_interfaces';

const DEPTH_IMAGE_WIDTH = 512;
const DEPTH_IMAGE_HEIGHT = 424;

interface Props {
  // eslint-disable-next-line no-unused-vars
  onNextClicked: (comp: ComparisonBuilder) => void;
  comparisonBuilder: ComparisonBuilder;
}

export default function Browser({ comparisonBuilder, onNextClicked }: Props) {
  const [currentReference, setCurrentReference] = useState(
    {} as DirectoryStructure,
  );
  return (
    <>
      <div className="center-by-table">
        <div className="outer">
          <div className="middle">
            <div id="browser-container" className="inner">
              <div
                id="browser-grid-left"
                style={{
                  height: DEPTH_IMAGE_HEIGHT,
                }}
              >
                <SearchPanel onRowClicked={setCurrentReference} />
              </div>
              <div id="browser-grid-right">
                <h2 id="browser-title">preview:</h2>
                <video
                  src={currentReference.video}
                  style={{
                    width: DEPTH_IMAGE_WIDTH,
                    height: DEPTH_IMAGE_HEIGHT,
                  }}
                  autoPlay
                  controls
                >
                  <track kind="captions" />
                </video>
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
      <div style={{ position: 'fixed', bottom: '5px', right: '5px' }}>
        <Link
          to="/browser/recorder"
          onClick={() => {
            comparisonBuilder.isGoofyReference = true;
            comparisonBuilder.reference = currentReference;
            onNextClicked(comparisonBuilder);
          }}
        >
          <button type="button">record</button>
        </Link>
      </div>
    </>
  );
}
