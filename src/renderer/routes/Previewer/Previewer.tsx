import { Link } from 'react-router-dom';
import './Previewer.css';
import { ComparisonBuilder } from '../comparison_interfaces';
import CHANNELS from '../ipc_channels';

const DEPTH_IMAGE_WIDTH = 512;
const DEPTH_IMAGE_HEIGHT = 424;

interface Props {
  // eslint-disable-next-line no-unused-vars
  onCompareClicked: (reportFilepath: string) => void;
  comparisonBuilder: ComparisonBuilder;
}

export default function Previewer({
  onCompareClicked,
  comparisonBuilder,
}: Props) {
  return (
    <>
      <div className="center-by-table">
        <div className="outer">
          <div className="middle">
            <div id="previewer-container" className="inner">
              <div id="previewer-grid-left">
                <h2 id="previewer-title">preview:</h2>
                <video
                  src={comparisonBuilder.commit.video}
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
              <div id="previewer-grid-right">
                <ul id="previewer-list">
                  <li>
                    <Link to="/browser/recorder">
                      <button className="previewer-btn" type="button">
                        redo
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        const { run_comparison } = CHANNELS;
                        try {
                          window.electronIpc.once(
                            run_comparison,
                            (filepath) => {
                              onCompareClicked(filepath as string);
                            },
                          );
                          window.electronIpc.sendMessage(
                            run_comparison,
                            comparisonBuilder,
                          );
                        } catch (error: unknown) {
                          if (error instanceof Error) {
                            console.error(error);
                          }
                        }
                      }}
                    >
                      generate report
                    </button>
                  </li>
                  <li>
                    <Link to="/report">
                      <button className="previewer-btn" type="button">
                        go to report
                      </button>
                    </Link>
                  </li>
                  <li>
                    <div id="previewer-reference-container">
                      <h2 id="previewer-reference-text">w/ reference:</h2>
                      <div id="previewer-compare-selector">
                        <span id="previewer-compare-text">
                          {comparisonBuilder.reference.directoryName}
                        </span>
                        <button className="btn-arrow" type="button">
                          .
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/browser/recorder">
        <button className="btn-arrow" type="button">
          &larr;
        </button>
      </Link>
      <div style={{ position: 'fixed', bottom: '5px', right: '5px' }}>
        <Link to="/menu">
          <button type="button">menu</button>
        </Link>
      </div>
    </>
  );
}
