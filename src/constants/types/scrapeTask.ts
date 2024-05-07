import { ScrapeTaskStatus, ScrapeTaskType } from '../enums';

export interface ScrapeTask {
  id: string;
  website: { id: string; name: string };
  type: ScrapeTaskType;
  status: ScrapeTaskStatus;
  startTime?: string;
  endTime?: string;
  scrapeCount: number;
  metrics?: {
    cpuMetric: {
      timestamps: string[];
      values: number[];
    };
    networkInMetric: {
      timestamps: string[];
      values: number[];
    };
    networkOutMetric: {
      timestamps: string[];
      values: number[];
    };
    memoryUsedPercentMetric: {
      timestamps: string[];
      values: number[];
    };
  };
}

export interface CreateScrapeTaskDto {
  website: string;
  type: ScrapeTaskType;
}

export interface ScrapeTaskListDto {
  data: ScrapeTask[];
  count: number;
  pageTotal: number;
}
