/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState, useEffect } from 'react';
import {
  Box, Typography, Autocomplete,
} from '@mui/material';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import SeekerPatch from 'types/seeker-patch';
import User from 'types/user';
import BusinessCategory from 'types/business-category';
import BlueButton from '../../../components/buttons/blue-button';
import CountrySelect from './components/country-selector';
import ContentCategorySelect from './components/content-category-selector';
import DarkTextField from '../../../components/fields/dark-text-field';
import ProfileService from '../../../services/profile-service';
import ProfilePageAlert from './components/profile-page-alert';
import { userSelector } from '../../../store/auth';
import API from '../../../services/business-service';

const validationSchema = yup.object({
  country: yup.string()
    .required('Is required'),
  business: yup.array()
    .min(1, 'At least one business Category'),
  content: yup.array()
    .min(1, 'At least one content Category'),
  page: yup.string()
    .required('Is required')
    .min(2, 'At least 2 letters')
    .max(32, 'Most 32 letters'),
  about: yup.string()
    .required('Is required')
    .min(30, 'At least 30 letters'),
});

export type ProfilePageSeekerFormProps = {
  user: User | null,
};

type FormikOnSubmit =
  (values: SeekerPatch, formikHelpers: FormikHelpers<SeekerPatch>) => void | Promise<void>;

const ProfilePageSeekerForm: React.FC<ProfilePageSeekerFormProps> = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const user = useSelector(userSelector);
  const [businessCategory, setBusinessCategory] = useState<BusinessCategory[]>([]);

  useEffect(() => {
    (async () => {
      const data = await API.getBusinessCategories();
      const categoryOptions: BusinessCategory[] = [
        {
          id: '-1',
          title: 'Select option',
          createdAt: 'undefined',
          updatedAt: 'undefined',
        }, ...data,
      ];
      setBusinessCategory(categoryOptions);
    })();
  }, []);

  const initialValues: SeekerPatch = useMemo(() => ({
    business: user?.business ?? [],
    country: user?.country ?? '',
    content: user?.content ?? [],
    page: user?.page ?? '',
    about: user?.about ?? '',
  }), [user]);

  const onSubmit: FormikOnSubmit = async (values) => {
    await ProfileService.updateUserData(values);
    setOpen(true);
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    dirty,
    setFieldValue,
    isValid,
    isSubmitting,
    values,
  } = useFormik({
    validateOnMount: true,
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const handleBusinessChange = (_event: any, value: any) => {
    setFieldValue('business', value, true);
  };

  const handleCountryChange = (_event: any, value: any) => {
    setFieldValue('country', value, true);
  };

  const handleCategoryChange = (_event: any, value: any) => {
    setFieldValue('content', value, true);
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      color="transparentLight"
      sx={{
        display: 'flex',
        gap: '5px',
        flexDirection: 'column',
      }}
    >
      <Autocomplete
        multiple
        ChipProps={{ color: 'primary' }}
        id="tags-outlined"
        options={businessCategory}
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={handleBusinessChange}
        value={values.business}
        onBlur={handleBlur}
        renderOption={(props, option) => (
          <span {...props}>
            <Typography sx={{ color: 'black' }}>
              {option.title}
              {' '}
            </Typography>
          </span>
        )}
        renderInput={({ disabled, ...params }) => (
          <DarkTextField
            name="business"
            disabled={isSubmitting}
            variant="filled"
            error={touched.business && Boolean(errors.business)}
            helperText={touched.business && errors.business}
            {...params}
            label="Your business category"
          />
        )}
      />
      <CountrySelect
        value={values.country}
        onChange={handleCountryChange}
        touched={touched}
        errors={errors}
        isSubmitting={isSubmitting}
        handleBlur={handleBlur}
      />
      <ContentCategorySelect
        value={values.content}
        onChange={handleCategoryChange}
        touched={touched}
        errors={errors}
        handleBlur={handleBlur}
      />
      <DarkTextField
        label="Social media page/website"
        placeholder="Insert link"
        variant="filled"
        name="page"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.page && Boolean(errors.page)}
        helperText={touched.page && errors.page}
        disabled={isSubmitting}
        value={values.page}
        fullWidth
      />
      <DarkTextField
        label="About your project"
        variant="filled"
        name="about"
        multiline
        minRows={3}
        maxRows={3}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.about && Boolean(errors.about)}
        helperText={touched.about && errors.about}
        disabled={isSubmitting}
        value={values.about}
      />
      <BlueButton type="submit" disabled={!dirty || !isValid} sx={{ backgroundColor: 'secondary.main' }}> SAVE</BlueButton>
      <ProfilePageAlert open={open} handleClose={handleClose} />
    </Box>
  );
};

export default ProfilePageSeekerForm;
