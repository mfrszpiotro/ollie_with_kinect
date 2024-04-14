import './SearchPanel.css';
import { Dirent, readdirSync } from 'fs';
import path from 'path';
import { useState } from 'react';

interface DirectoryStructure {
  directoryName: string;
  skeleton: string;
  video: string;
}

function getDirectories(workingDirectory: string): string[] {
  try {
    return readdirSync(workingDirectory, { withFileTypes: true })
      .filter((dirent: Dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (err: any) {
    if (err?.code !== 'ENOENT') {
      throw err;
    }
  }
  return [];
}

function getFiles(workingDirectory: string): string[] {
  try {
    return readdirSync(workingDirectory, { withFileTypes: true })
      .filter((dirent: Dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
  } catch (err: any) {
    if (err?.code !== 'ENOENT') {
      throw err;
    }
  }
  return [];
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

interface Props {
  // eslint-disable-next-line no-unused-vars
  onRowClicked: (filepath: string) => void;
}

export default function SearchPanel({ onRowClicked }: Props) {
  const recordingsPath = path.join(process.cwd(), 'saved', 'recordings');
  const initialRecordings = getDirectories(recordingsPath).map((dirName) => {
    const recordingDirContents = getFiles(path.join(recordingsPath, dirName));
    let csvPath = '';
    let mp4Path = '';
    recordingDirContents.forEach((filename: string) => {
      if (isCorrectFileWithExtension(filename, dirName, 'csv'))
        csvPath = path.join(recordingsPath, dirName, filename);
      if (isCorrectFileWithExtension(filename, dirName, 'mp4'))
        mp4Path = path.join(recordingsPath, dirName, filename);
    });
    return {
      directoryName: dirName,
      skeleton: csvPath,
      video: mp4Path,
    };
  });
  // todo: scan for new recordings button
  // eslint-disable-next-line no-unused-vars
  const [recordings, setRecordings] = useState(initialRecordings);

  const recordingFoldersTableRows = recordings.map(
    (directory: DirectoryStructure, index: number) => {
      const isStatusOk = !!(directory.skeleton && directory.video);
      const onVideoPreviewedChange = () => {
        onRowClicked(directory.video as string);
      };
      return (
        <tr key={directory.directoryName} onClick={onVideoPreviewedChange}>
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
