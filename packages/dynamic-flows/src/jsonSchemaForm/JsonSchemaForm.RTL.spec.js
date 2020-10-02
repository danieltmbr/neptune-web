import React from 'react';
import { screen, render } from '@testing-library/react';

import simpleSchema from './schemas/simple.json';
import oneOfSchema from './schemas/oneOf.json';
import allOfSchema from './schemas/allOf.json';
import audRecipientSchema from './schemas/audRecipient.json';

import JsonSchemaForm from '.';

const schemaVariants = {
  simple: simpleSchema,
  oneOf: oneOfSchema,
  allOf: allOfSchema,
  'AUD Recipient': audRecipientSchema,
};

describe('Given a component for rendering a JSON schema form', () => {
  function renderComponent(partialProps) {
    const schema = {};
    const model = {};
    const onChange = jest.fn();
    const submitted = false;
    const errors = {};
    const locale = 'en-GB';
    const translations = {};

    const props = {
      schema,
      model,
      onChange,
      submitted,
      locale,
      errors,
      translations,
      ...partialProps,
    };

    return render(<JsonSchemaForm {...props} />);
  }

  Object.keys(schemaVariants).forEach((schemaKey) => {
    const schema = schemaVariants[schemaKey];
    describe(`when initialised with "${schemaKey}" schema and disabled={TRUE}`, () => {
      it(`should render all UI elements with a disabled attribute`, () => {
        renderComponent({ schema, disabled: true });

        const elements = [
          ...screen.queryAllByRole('spinbutton'),
          ...screen.queryAllByRole('radio'),
          ...screen.queryAllByRole('button'),
          ...screen.queryAllByRole('textbox'),
        ];

        elements.forEach((element) => {
          expect(element).toHaveProperty('disabled', true);
        });
      });
    });
  });
});
