// Label.js
import React from 'react';

export default function Label({ htmlFor, text }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-5 text-gray-700"
    >
      {text}
    </label>
  );
}
