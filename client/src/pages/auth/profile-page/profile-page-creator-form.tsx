/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import CreatorPatch from 'types/creator-patch';
import User from 'types/user';
import BlueButton from '../../../components/buttons/blue-button';
import CountrySelect from './components/country-selector';
import ContentCategorySelect from './components/content-category-selector';
import DarkTextField from '../../../components/fields/dark-text-field';
import ProfilePageAlert from './components/profile-page-alert';
import ProfileService from '../../../services/profile-service';
import { userSelector } from '../../../store/auth';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  gap: '5px',
  flexDirection: 'column',
})) as React.FC<BoxProps<'form'>>;

const validationSchema = yup.object({
  country: yup.string()
    .required('Is required'),
  content: yup.array()
    .min(1, 'At least one content Category'),
  page: yup.string()
    .required('Is required')
    .min(2, 'At least 2 letters')
    .max(44, 'Most 44 letters'),
  about: yup.string()
    .required('Is required')
    .min(30, 'At least 30 letters'),
});

export type ProfilePageCreatorFormProps = {
  user: User | null,
};

type InitialValues = CreatorPatch;

type FormikOnSubmit =
  (values: InitialValues, formikHelpers: FormikHelpers<InitialValues>) => void | Promise<void>;

const ProfilePageCreatorForm: React.FC<ProfilePageCreatorFormProps> = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const user = useSelector(userSelector);

  const initialValues: InitialValues = useMemo(() => ({
    country: user?.country ?? '',
    content: user?.content ?? [],
    page: user?.page ?? '',
    about: user?.about ?? '',
  }), [user]);

  const onSubmit: FormikOnSubmit = async (values) => {
    await ProfileService.updateUserData(values);
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

  const handleCountryChange = (_event: any, value: any) => {
    setFieldValue('country', value, true);
  };

  const handleCategoryChange = (_event: any, value: any) => {
    setFieldValue('content', value, true);
  };

  return (
    <StyledBox
      onSubmit={handleSubmit}
      component="form"
      color="transparentLight"
    >
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
      <BlueButton type="submit" disabled={!dirty || !isValid} onClick={handleClick} sx={{ backgroundColor: 'secondary.main' }}> SAVE</BlueButton>
      <ProfilePageAlert open={open} handleClose={handleClose} />
    </StyledBox>
  );
};

export default ProfilePageCreatorForm;
