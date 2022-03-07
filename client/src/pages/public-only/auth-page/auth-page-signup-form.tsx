import React, { useState } from 'react';
import {
  Typography, FormControlLabel, Radio, RadioGroup, InputAdornment, CircularProgress, TextFieldProps,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import * as yup from 'yup';
import UserRegistration from 'types/user-registration';
import { useFormik, FormikHelpers } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/auth';
import BlueButton from '../../../components/buttons/blue-button';
import AuthService from '../../../services/auth-service';
import LightTextField from '../../../components/fields/light-text-field';
import AuthFormBox from '../../../components/containers/auth-page-form-box';

type InitialValues = UserRegistration;

type FormikOnSubmit =
  (values: InitialValues, formikHelpers: FormikHelpers<InitialValues>) => void | Promise<void>;

const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'At least 2 letters')
    .max(32, 'Most 32 letters')
    .required('Is required'),
  email: yup
    .string()
    .email('Is not valid email')
    .required('Is required')
    .test('email-validator', 'Email unavailable', (_, context) => {
      const { emailChecked, emailAvailable } = context.parent;
      if (!emailChecked) return true;
      return emailAvailable;
    }),
  password: yup
    .string()
    .min(6, 'At least 6 symbols')
    .max(32, 'Most 32 symbols')
    .matches(/^.*[A-ZĄČĘĖĮŠŲŪŽ]+.*$/, 'Atleast one capital letter')
    .matches(/^.*\d+.*$/, 'Atleast one number')
    .required('Is required'),
  repeatPassword: yup.string()
    .required('Is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  emailChecked: yup.boolean().oneOf([true]),
  emailAvailable: yup.boolean().oneOf([true]),
});

const initialValues: InitialValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  role: 'SEEKER',
  emailChecked: false,
  emailAvailable: false,
};

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);

  const onSubmit: FormikOnSubmit = async ({
    email, name, role, password, repeatPassword, emailChecked, emailAvailable,
  }) => {
    const fetchedUser = await AuthService.register({
      email,
      name,
      role,
      password,
      repeatPassword,
      emailChecked,
      emailAvailable,
    });

    if (typeof fetchedUser === 'string') {
      // eslint-disable-next-line no-console
      console.error(fetchedUser);
    } else {
      dispatch(login({ user: fetchedUser }));
    }
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    values,
    isSubmitting,
    isValid,
    setFieldValue,
    setValues,
  } = useFormik({
    validateOnMount: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleEmailChange: TextFieldProps['onChange'] = (e) => {
    if (values.emailChecked) {
      setValues({
        ...values,
        email: e.target.value,
        emailChecked: false,
        emailAvailable: false,
      }, true);
    } else {
      handleChange(e);
    }
  };

  const handleEmailBlur: TextFieldProps['onBlur'] = (e) => {
    handleBlur(e);
    if (!errors.email) {
      (async () => {
        try {
          setEmailCheckLoading(true);
          const emailAvailable = await AuthService.checkEmail(values.email);
          setFieldValue('emailAvailable', emailAvailable);
        } catch (error) {
          setFieldValue('emailAvailable', false);
        } finally {
          setFieldValue('emailChecked', true, true);
          setEmailCheckLoading(false);
        }
      })();
    }
  };

  let emailEndornment;
  if (emailCheckLoading) {
    emailEndornment = <CircularProgress size={24} />;
  } else if (!values.emailChecked) {
    emailEndornment = null;
  } else if (values.emailAvailable) {
    emailEndornment = <CheckCircleIcon color="success" />;
  } else {
    emailEndornment = <ErrorIcon color="error" />;
  }

  return (
    <AuthFormBox
      onSubmit={handleSubmit}
      component="form"
      color="transparentLight"
      sx={{ mt: '15px' }}
    >
      <LightTextField
        label="Name"
        placeholder="Enter name"
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        error={touched.name && Boolean(errors.name)}
        disabled={isSubmitting}
      />
      <div style={{ color: 'red', fontSize: '11px', height: '15px' }}>{touched.name && errors.name}</div>
      <LightTextField
        label="Email"
        placeholder="Enter email"
        name="email"
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        disabled={isSubmitting}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {emailEndornment}
            </InputAdornment>
          ),
        }}
      />
      <div style={{ color: 'red', fontSize: '11px', height: '15px' }}>{touched.email && errors.email}</div>
      <LightTextField
        label="Password"
        placeholder="Enter password"
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
        error={touched.password && Boolean(errors.password)}
        disabled={isSubmitting}
      />
      <div style={{ color: 'red', fontSize: '11px', height: '15px' }}>{touched.password && errors.password}</div>
      <LightTextField
        label="Repeat password"
        placeholder="Repeat password"
        type="password"
        name="repeatPassword"
        onChange={handleChange}
        disabled={isSubmitting}
        onBlur={handleBlur}
        value={values.repeatPassword}
        error={touched.repeatPassword && Boolean(errors.repeatPassword)}
      />
      <div style={{ color: 'red', fontSize: '11px', height: '15px' }}>{touched.repeatPassword && errors.repeatPassword}</div>
      <Typography component="legend" sx={{ display: 'flex', flexDirection: 'row' }}>I am</Typography>
      <RadioGroup value={values.role} onChange={handleChange} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <FormControlLabel
          control={<Radio size="small" sx={{ p: 0, pr: 1.65 }} />}
          name="role"
          onChange={handleChange}
          disabled={isSubmitting}
          value="SEEKER"
          label="Content Seeker"
        />
        <FormControlLabel
          control={<Radio size="small" sx={{ p: 0, pr: 1, pl: 1 }} />}
          name="role"
          onChange={handleChange}
          disabled={isSubmitting}
          value="CREATOR"
          label="Content Creator"
        />
      </RadioGroup>
      <BlueButton type="submit" disabled={!isValid} fullWidth> SignUp</BlueButton>
    </AuthFormBox>
  );
};

export default SignupForm;
