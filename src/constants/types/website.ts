import { WebsiteType } from '../enums';

export interface Website {
  id: string;
  name: string;
  url: string;
  type: WebsiteType;
}

export interface WebsiteDto {
  name: string;
  url: string;
  type: WebsiteType;
}
