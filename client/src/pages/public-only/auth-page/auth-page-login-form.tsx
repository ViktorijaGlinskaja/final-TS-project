import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { useFormik, FormikHelpers } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Crudentials from 'types/crudentials';
import AuthService from '../../../services/auth-service';
import { login } from '../../../store/auth';
import LightTextField from '../../../components/fields/light-text-field';
import AuthFormBox from '../../../components/containers/auth-page-form-box';
import BlueButton from '../../../components/buttons/blue-button';

type InitialValues = Crudentials;

type FormikOnSubmit =
  (values: InitialValues, formikHelpers: FormikHelpers<InitialValues>) => void | Promise<void>;

const validationSchema = yup.object({
  email: yup.string()
    .required('Is required')
    .email('Is not valid email'),
  password: yup.string()
    .required('Is required'),
});

const initialValues: InitialValues = {
  email: '',
  password: '',
};

const LoginForm: React.FC = () => {
  const [urlSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: FormikOnSubmit = async ({ email, password }) => {
    setError(null);
    const fetchedUser = await AuthService.login({
      email,
      password,
    });
    if (typeof fetchedUser === 'string') {
      setError(fetchedUser);
      return;
    }

    const redirectTo = urlSearchParams.get('redirectTo') ?? undefined;
    const loginSuccessAction = login({
      user: fetchedUser,
      redirectTo,
    });
    dispatch(loginSuccessAction);
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    dirty,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <AuthFormBox color="transparentLight" onSubmit={handleSubmit}>
      <Alert severity="error" sx={{ my: 2, visibility: error ? 'visible' : 'hidden' }}>
        {error}
      </Alert>
      <LightTextField
        name="email"
        label="Email"
        placeholder="Enter email"
        fullWidth
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <div style={{ color: 'red', fontSize: '11px', height: '15px' }}>{touched.email && errors.email}</div>
      <LightTextField
        label="Password"
        name="password"
        placeholder="Enter password"
        type="password"
        fullWidth
        value={values.password}
        error={touched.password && Boolean(errors.password)}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
      />
      <div style={{ color: 'red', fontSize: '11px', height: '15px' }}>{touched.password && errors.password}</div>
      <BlueButton type="submit" disabled={!dirty && !isValid} fullWidth> LogIn</BlueButton>
    </AuthFormBox>
  );
};

export default LoginForm;
