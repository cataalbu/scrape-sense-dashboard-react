export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export enum WebsiteType {
  CSR = 'csr',
  SSR = 'ssr',
}

export enum ScrapeTaskType {
  SCRAPY = 'scrapy',
  PUPPETEER = 'puppeteer',
}

export enum ScrapeTaskStatus {
  RUNNING = 'running',
  FINISHED = 'finished',
  CRASHED = 'crashed',
  CANCELED = 'canceled',
}
