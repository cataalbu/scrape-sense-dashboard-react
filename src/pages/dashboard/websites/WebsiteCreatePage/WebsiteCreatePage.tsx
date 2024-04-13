import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useCreateWebsiteMutation } from '@/redux/features/websites/websitesApiSlice';

import { WebsiteDto, WebsiteFormDto } from '@/constants/types';
import Paths from '@/routes/paths';
import { WebsiteForm } from '@/components/websites';
import { websiteFormSchema } from '@/constants/yup';

export default function WebsiteCreatePage() {
  const [createWebsite, { isLoading }] = useCreateWebsiteMutation();
  const navigate = useNavigate();
  const { values, handleSubmit, handleChange, isValid, isSubmitting, errors } =
    useFormik<WebsiteFormDto>({
      initialValues: {
        name: '',
        url: '',
        type: '',
      },
      onSubmit: async (values) => {
        try {
          await createWebsite(values as WebsiteDto).unwrap();
          navigate(Paths.WEBSITES);
        } catch (error: unknown) {
          console.log('Error:', error);
        }
      },
      validationSchema: websiteFormSchema,
    });
  return (
    <div>
      <h1>Create Website</h1>
      <WebsiteForm
        values={values}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isSubmitting={isSubmitting || isLoading}
        errors={errors}
        isValid={isValid}
      />
    </div>
  );
}
