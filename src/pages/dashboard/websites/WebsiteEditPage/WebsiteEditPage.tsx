import { useFormik } from 'formik';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import {
  useGetWebsiteByIdQuery,
  useUpdateWebsiteMutation,
} from '@/redux/features/websites/websitesApiSlice';

import { Website, WebsiteFormDto } from '@/constants/types';
import Paths from '@/routes/paths';
import { WebsiteForm } from '@/components/websites';
import { websiteFormSchema } from '@/constants/schemas';

export default function WebsiteEditPage() {
  const { id } = useParams();
  const { data: website } = useGetWebsiteByIdQuery(id || '');
  const [updateWebsite, { isLoading }] = useUpdateWebsiteMutation();
  const navigate = useNavigate();

  const { values, handleSubmit, handleChange, isValid, isSubmitting, errors } =
    useFormik<WebsiteFormDto>({
      initialValues: {
        name: website?.name || '',
        url: website?.url || '',
        type: website?.type || '',
      },
      onSubmit: async (values) => {
        try {
          await updateWebsite({
            id: website?.id,
            ...values,
          } as Website).unwrap();
          navigate(generatePath(Paths.WEBSITE_DETAILS, { id: website!.id }));
        } catch (error: unknown) {
          console.log('Error:', error);
        }
      },
      validationSchema: websiteFormSchema,
      enableReinitialize: true,
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
