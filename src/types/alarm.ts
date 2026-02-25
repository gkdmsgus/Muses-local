import { type ApiResponse } from '../api/auth';

export type Alarm = {
  memberAlarmId: number;
  content: string;
  alarmTime: string;
  template: string | null;
  alarmParams: Record<string, unknown> | null;
};

export type AlarmListResponse = ApiResponse<Alarm[]>;

export type AlarmCountResponse = ApiResponse<number>;
