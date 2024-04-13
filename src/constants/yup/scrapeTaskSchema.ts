import * as yup from 'yup';

export const scrapeTaskSchema = yup.object({
  website: yup
    .object({
      label: yup.string(),
      idValue: yup.string(),
    })
    .required('Website is required'),
  scrapeTaskType: yup.string().required('Scrape task type is required'),
});
