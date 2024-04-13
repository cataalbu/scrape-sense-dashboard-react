import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';

import { ScrapeTaskType } from '@/constants/enums';
import { useGetWebsitesQuery } from '@/redux/features/websites/websitesApiSlice';
import { scrapeTaskSchema } from '@/constants/yup';
import { useCreateScrapeTaskMutation } from '@/redux/features/scrapeTasks/scrapeTasksApiSlice';

interface StartScrapeTaskModalProps {
  open: boolean;
  handleModalClose: (value: boolean) => void;
}

export function StartScrapeTaskModal({
  open,
  handleModalClose,
}: StartScrapeTaskModalProps) {
  const { data: websites, isLoading: isWebsitesLoading } =
    useGetWebsitesQuery();
  const [createScrapeTask] = useCreateScrapeTaskMutation();
  const {
    values,
    setFieldValue,
    resetForm,
    errors,
    isValid,
    isSubmitting,
    handleSubmit,
  } = useFormik<{
    website: {
      label: string;
      idValue: string;
    } | null;
    scrapeTaskType: string;
  }>({
    initialValues: {
      website: null,
      scrapeTaskType: '',
    },
    validationSchema: scrapeTaskSchema,
    onSubmit: async (values) => {
      const body = {
        website: values.website!.idValue,
        type: values.scrapeTaskType as ScrapeTaskType,
      };
      try {
        await createScrapeTask(body);
        resetForm();
        handleModalClose(false);
      } catch (error) {
        console.error('Error starting scrape task', error);
      }
    },
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        handleModalClose(false);
        resetForm();
      }}
      aria-labelledby="start-scrape-task-modal"
      aria-describedby="start-scrape-task-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,

          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography id="start-scrape-task-modal-description" variant="h4">
          Start Scrape Task
        </Typography>
        {!isWebsitesLoading ? (
          <form
            style={{ marginTop: 32 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <Autocomplete
              disablePortal
              onChange={(_e, value) => {
                setFieldValue('website', value);
              }}
              value={values.website}
              id="website"
              isOptionEqualToValue={(option, value) =>
                option.idValue === value.idValue
              }
              options={
                websites!.data.map((website) => ({
                  label: website.name,
                  idValue: website.id,
                })) || []
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Website"
                  error={!!errors.website}
                  helperText={errors.website}
                />
              )}
            />
            <FormControl fullWidth sx={{ marginTop: 4 }}>
              <InputLabel id="scrape-task-type-select-label">
                Scrape task type
              </InputLabel>
              <Select
                fullWidth
                labelId="scrape-task-type-select-label"
                id="scrape-task-type-select"
                label="Scrape task type"
                value={values.scrapeTaskType}
                onChange={(e) =>
                  setFieldValue('scrapeTaskType', e.target.value)
                }
                error={!!errors.scrapeTaskType}
              >
                <MenuItem value={ScrapeTaskType.PUPPETEER}>Puppeteer</MenuItem>
                <MenuItem value={ScrapeTaskType.SCRAPY}>Scrapy</MenuItem>
              </Select>
              <FormHelperText>{errors.scrapeTaskType}</FormHelperText>
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              sx={{ marginTop: 4 }}
              fullWidth
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <CircularProgress /> : 'Start scrape task'}
            </Button>
          </form>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Modal>
  );
}
