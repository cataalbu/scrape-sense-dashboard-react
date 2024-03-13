import { ScrapeTaskStatus, ScrapeTaskType } from '../enums';

export interface ScrapeTask {
  id: string;
  website: { id: string; name: string };
  type: ScrapeTaskType;
  status: ScrapeTaskStatus;
  startTime?: string;
  endTime?: string;
  scrapeCount: number;
}

export interface CreateScrapeTaskDto {
  website: string;
  type: ScrapeTaskType;
}
