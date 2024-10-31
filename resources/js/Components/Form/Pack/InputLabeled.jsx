// InputLabeled.js
import React from 'react';
import Label from '../Labels/Label';
import Input from '../Inputs/Input';

export default function InputLabeled({
  label,
  id,
  name,
  placeholder,
  type = 'text',
  required = false,
  ...props
}) {
  return (
    <div>
      <Label htmlFor={id} text={label} />
      <div className="mt-1 relative rounded-md shadow-sm">
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          required={required}
          {...props}
        />
      </div>
    </div>
  );
}
