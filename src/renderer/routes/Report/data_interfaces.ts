export interface HowClose {
  absolute: number;
  absolute_percent: number;
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

export interface DynamicTimeWarp {} // todo
