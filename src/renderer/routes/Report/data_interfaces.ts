export interface HowClose {
  absolute: number;
  relative_percent: number;
  is_negative: boolean;
  context: string;
}

export interface TimeTwoEventsComparison {
  diff_name: string;
  event_a_name: string;
  event_b_name: string;
  time_diff_commit: number;
  time_diff_reference: number;
  how_close: HowClose;
  diff_description: string;
}

export interface DynamicTimeWarp {
  diff_name: string;
  stage: string;
  column_name: string;
  commit_length: number;
  reference_length: number;
  total_distance: number;
  normalized_distance: number;
  figure_name: string;
  diff_description: string;
}
