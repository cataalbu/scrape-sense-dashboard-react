import React from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { WebsiteFormDto } from '@/constants/types';
import { WebsiteType } from '@/constants/enums';

interface WebsiteFormProps {
  values: WebsiteFormDto;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: unknown) => void;
  isSubmitting: boolean;
  errors?: {
    name?: string;
    url?: string;
    type?: string;
  };
  isValid: boolean;
}

export function WebsiteForm({
  values,
  handleSubmit,
  handleChange,
  isSubmitting,
  errors,
  isValid,
}: WebsiteFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <TextField
        value={values.name}
        onChange={handleChange}
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors?.name}
        helperText={errors?.name}
      />
      <TextField
        value={values.url}
        onChange={handleChange}
        name="url"
        label="URL"
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors?.url}
        helperText={errors?.url}
      />
      <FormControl
        variant="outlined"
        fullWidth
        margin="normal"
        error={!!errors?.type}
      >
        <InputLabel id="type-label">Website Type</InputLabel>
        <Select
          value={values.type}
          onChange={handleChange}
          name="type"
          label="Website Type"
          labelId="type-label"
        >
          <MenuItem value={WebsiteType.SSR}>Server-side rendered</MenuItem>
          <MenuItem value={WebsiteType.CSR}>Client-side rendered</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ mt: 4, p: 1, fontSize: 18 }}
        disabled={!isValid}
        type="submit"
      >
        {isSubmitting ? <CircularProgress sx={{ color: 'white' }} /> : 'Submit'}
      </Button>
    </form>
  );
}
