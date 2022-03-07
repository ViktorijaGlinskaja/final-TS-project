import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { TextFieldProps } from '@mui/material/TextField';
import ContentCategory from 'types/content-category';
import { FormikErrors, FormikTouched } from 'formik';
import DarkTextField from '../../../../components/fields/dark-text-field';
import API from '../../../../services/content-service';
import CreatorPatch from '../../../../types/creator-patch';

interface ContentCategorySelectProps {
  onChange: AutocompleteProps<ContentCategory, true, false, false>['onChange'],
  handleBlur: TextFieldProps['onBlur']
  touched: FormikTouched<CreatorPatch>,
  errors: FormikErrors<CreatorPatch>,
  value: ContentCategory[] | undefined,
}

const ContentCategorySelect: React.FC<ContentCategorySelectProps> = ({
  onChange, handleBlur, touched, errors, value,
}) => {
  const [contentCategory, setContentCategory] = useState<ContentCategory[]>([]);

  useEffect(() => {
    (async () => {
      const data = await API.getContentCategories();
      const categoryOptions: ContentCategory[] = [
        {
          id: '-1',
          title: 'Select option',
          createdAt: 'undefined',
          updatedAt: 'undefined',
        }, ...data,
      ];
      setContentCategory(categoryOptions);
    })();
  }, []);

  return (
    <Autocomplete
      multiple
      ChipProps={{ color: 'primary' }}
      id="tags-outlined"
      options={contentCategory}
      getOptionLabel={(option) => option.title}
      onChange={onChange}
      isOptionEqualToValue={(option, val) => option.id === val.id}
      value={value}
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
          name="content"
          onBlur={handleBlur}
          error={touched.content && Boolean(errors.content)}
          helperText={touched.content && errors.content}
          variant="filled"
          {...params}
          label="Content category"
        />
      )}
    />
  );
};

export default ContentCategorySelect;
