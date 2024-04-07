import './SearchPanel.css';
import { Dirent, readdirSync } from 'fs';
import path from 'path';

interface DirectoryStructure {
  directoryName: string;
  hasSkeleton: boolean;
  hasVideo: boolean;
}

function getDirectories(workingDirectory: string) {
  return readdirSync(workingDirectory, { withFileTypes: true })
    .filter((dirent: Dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function getFiles(workingDirectory: string) {
  return readdirSync(workingDirectory, { withFileTypes: true })
    .filter((dirent: Dirent) => dirent.isFile())
    .map((dirent) => dirent.name);
}

function isCorrectFileWithExtension(
  filename: string,
  desiredName: string,
  desiredExtension: string,
) {
  const filenameParts = filename.split('.');
  if (filenameParts.length !== 2) return false;
  if (filenameParts[0] !== desiredName) return false;
  if (filenameParts[1] !== desiredExtension) return false;
  return true;
}

export default function SearchPanel() {
  const recordingsPath = path.join(process.cwd(), 'recordings');
  const recordings = getDirectories(recordingsPath).map((dirName) => {
    const recordingDirContents = getFiles(path.join(recordingsPath, dirName));
    let hasCsv = false;
    let hasVid = false;
    recordingDirContents.forEach((content: string) => {
      if (isCorrectFileWithExtension(content, dirName, 'csv')) hasCsv = true;
      if (isCorrectFileWithExtension(content, dirName, 'mp4')) hasVid = true;
    });
    return {
      directoryName: dirName,
      hasSkeleton: hasCsv,
      hasVideo: hasVid,
    };
  });

  const recordingFoldersTableRows = recordings.map(
    (directory: DirectoryStructure, index: number) => {
      const isStatusOk = !!(directory.hasSkeleton && directory.hasVideo);
      return (
        <tr key={directory.directoryName}>
          {/* directory names in the same superdirectory are unique by design */}
          <td>{index}</td>
          <td>{directory.directoryName}</td>
          <td>
            <span style={{ display: isStatusOk ? 'visible' : 'none' }}>
              &#10004;
            </span>
            <span style={{ display: isStatusOk ? 'none' : 'visible' }}>
              &#10008;
            </span>
          </td>
        </tr>
      );
    },
  );
  return (
    <div id="search-panel-container">
      <div id="search-panel-title">your recordings:</div>
      <table id="search-panel-table">
        <colgroup>
          <col span={1} style={{ width: '15%' }} />
          <col span={1} style={{ width: '60%' }} />
          <col span={1} style={{ width: '25%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>{recordingFoldersTableRows}</tbody>
      </table>
    </div>
  );
}
