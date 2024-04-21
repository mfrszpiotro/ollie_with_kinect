export interface DirectoryStructure {
  directoryName: string;
  skeleton: string;
  video: string;
}

export interface ComparisonBuilder {
  commit: DirectoryStructure;
  reference: DirectoryStructure;
  isGoofyCommit: boolean;
  isGoofyReference: boolean;
}
