import { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { useGetScrapeTasksQuery } from '@/redux/features/scrapeTasks/scrapeTasksApiSlice';
import ScrapeTasksTable from '@/components/scrapeTasks/ScrapeTasksTable/ScrapeTasksTable';
import { StartScrapeTaskModal } from '@/components/scrapeTasks/StartScrapeTaskModal/StartScrapeTaskModal';
import { ScrapeTaskType } from '@/constants/enums';
import { useGetWebsitesQuery } from '@/redux/features/websites/websitesApiSlice';

export default function ScrapeTasksListPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [startScrapeTaskModalOpen, setStartScrapeTaskModalOpen] =
    useState(false);

  const [type, setType] = useState('');
  const handlTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const [website, setWebsite] = useState('');
  const handleWebsiteChange = (event: SelectChangeEvent) => {
    setWebsite(event.target.value as string);
  };

  const { data: websites } = useGetWebsitesQuery();

  const [sort, setSort] = useState<
    { field: string; order: 'asc' | 'desc' } | undefined
  >({
    field: 'startTime',
    order: 'desc',
  });

  const {
    data: scrapeTasks,
    isLoading,
    isSuccess,
    error,
  } = useGetScrapeTasksQuery({
    skip: page * rowsPerPage,
    limit: rowsPerPage,
    website: website !== '' ? website : undefined,
    type: type !== '' ? type : undefined,
    sort,
  });

  return (
    <div style={{ width: '100%' }}>
      <h1>Scrape tasks</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <Button
          variant="outlined"
          sx={{ borderRadius: '8px' }}
          onClick={() => setStartScrapeTaskModalOpen(true)}
        >
          Start scrape task
        </Button>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 0,
          }}
        >
          <FormControl variant="outlined" sx={{ width: '8rem', mr: 2 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={handlTypeChange}
            >
              <MenuItem value={''}>All</MenuItem>
              <MenuItem value={ScrapeTaskType.PUPPETEER}>Puppeteer</MenuItem>
              <MenuItem value={ScrapeTaskType.SCRAPY}>Scrapy</MenuItem>
            </Select>
          </FormControl>
          {websites && (
            <FormControl variant="outlined" sx={{ width: '8rem' }}>
              <InputLabel id="demo-simple-select-label">Website</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={website}
                label="Type"
                onChange={handleWebsiteChange}
              >
                <MenuItem value={''}>All</MenuItem>
                {websites.data.map((website) => (
                  <MenuItem key={website.id} value={website.id}>
                    {website.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
      </div>

      <ScrapeTasksTable
        scrapeTasks={scrapeTasks?.data || []}
        isLoading={isLoading}
        isSuccess={isSuccess}
        error={error?.toString() || ''}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        count={scrapeTasks?.count || 0}
        sort={sort}
        setSort={setSort}
      />
      <StartScrapeTaskModal
        open={startScrapeTaskModalOpen}
        handleModalClose={setStartScrapeTaskModalOpen}
      />
    </div>
  );
}
