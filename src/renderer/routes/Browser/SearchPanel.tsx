interface DirectoryStructure {
  directoryName: string;
  hasSkeleton: boolean;
  hasVideo: boolean;
}

export default function SearchPanel() {
  // temp
  const recordingDirectoryStructure = [
    {
      directoryName: 'test',
      hasSkeleton: true,
      hasVideo: true,
    },
    {
      directoryName: 'ollie attempt',
      hasSkeleton: true,
      hasVideo: false,
    },
  ];

  const recordingFolders = recordingDirectoryStructure.map(
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
    <table id="browser-table">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>{recordingFolders}</tbody>
    </table>
  );
}
