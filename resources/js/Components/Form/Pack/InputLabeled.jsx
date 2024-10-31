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
    <div className="mt-6">
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
        <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
