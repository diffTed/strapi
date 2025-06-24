import React from 'react';
import { TextInput } from '@strapi/design-system/TextInput';
import { Field, FieldLabel, FieldHint, FieldError } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import { Badge } from '@strapi/design-system/Badge';

const ReadOnlyEnumInput = ({
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
  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'secondary';
      case 'proposed':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <Field name={name} id={name} error={error} hint={attribute?.description}>
      <Stack spacing={1}>
        <FieldLabel action={labelAction} required={required}>
          {intlLabel.defaultMessage}
        </FieldLabel>
        {value ? (
          <Badge variant={getStatusColor(value)} size="S">
            {value}
          </Badge>
        ) : (
          <TextInput
            name={name}
            value="No status"
            disabled={true}
            aria-label={intlLabel.defaultMessage}
            {...props}
          />
        )}
        <FieldHint />
        <FieldError />
      </Stack>
    </Field>
  );
};

export default ReadOnlyEnumInput;