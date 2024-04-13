import * as yup from 'yup';

export const websiteFormSchema = yup.object({
  name: yup.string().required('Name is required.'),
  url: yup.string().url('Must be an URL.').required('URL is required'),
  type: yup.string().required('Website type is required'),
});
