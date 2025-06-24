import React from 'react';
import { TextInput } from '@strapi/design-system/TextInput';
import { Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';

const ReadOnlyTextInput = ({
  attribute,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  required,
  value,
  ...props
}) => {
  return (
    <Field name={name} id={name} error={error} hint={attribute?.description}>
      <Stack spacing={1}>
        <FieldLabel action={labelAction} required={required}>
          {intlLabel.defaultMessage}
        </FieldLabel>
        <TextInput
          name={name}
          value={value || ''}
          disabled={true}
          aria-label={intlLabel.defaultMessage}
          {...props}
        />
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

export default ReadOnlyTextInput;