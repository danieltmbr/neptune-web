import React from 'react';
import { mount } from 'enzyme';
import PersistAsyncSchema from './PersistAsyncSchema';
import BasicTypeSchema from '../basicTypeSchema';

describe('Given a component for rendering persist async schemas', () => {
  let onChange;
  let onPersistAsyncStart;
  let onPersistAsyncEnd;
  let props;

  const schema = {
    type: 'string',
    title: 'Text input',
    persistAsync: {
      method: 'GET',
      url: '/v1/foobar',
      param: 'aParam',
      idProperty: 'anIdProperty',
      schema: {
        title: 'A title',
        type: 'string',
        placeholder: '1111',
        validationMessages: {
          minLength: 'Value is is too short!',
          maxLength: 'Value is too long!',
          pattern: 'Value is invalid!',
        },
        pattern: '^[0-9*]{5,10}$',
        minLength: 5,
        maxLength: 10,
      },
    },
  };

  const translations = {};
  const submitted = false;
  const host = 'http://trwi.se';

  beforeEach(() => {
    onChange = jest.fn();
    onPersistAsyncStart = jest.fn();
    onPersistAsyncEnd = jest.fn();

    props = {
      schema,
      onChange,
      onPersistAsyncStart,
      onPersistAsyncEnd,
      translations,
      submitted,
      host,
    };
  });

  describe('when the supplied props are valid', () => {
    let component;

    beforeEach(() => {
      component = mount(<PersistAsyncSchema {...props} />);
    });

    it('should render the persist async schema', () => {
      expect(component.find(PersistAsyncSchema)).toHaveLength(1);
    });

    it('should render the schema inside of the persist async object', () => {
      const basic = component.find(PersistAsyncSchema).find(BasicTypeSchema);
      expect(basic).toHaveLength(1);
      expect(basic.prop('schema').title).toBe('A title');
    });

    describe('when the field value is valid', () => {
      describe('when a persist async is triggered', () => {
        it('should trigger onPersistAsyncStart correctly', () => {

        });

        it('should trigger onPersistAsyncEnd correctly', () => {

        });

        describe('when the request is successful', () => {
          it('should make the persist async call', () => {

          });

          it('should make the persist async call with the correct request', () => {

          });

          it('should extract the value out of the response using idProperty', () => {

          });

          it('should broadcast the persist async response value', () => {

          });
        });

        describe('when the request fails with 422 error', () => {
          it('should render the error', () => {

          });
        });

        describe('when the request fails without error', () => {
          it('should render fallback error message', () => {

          });
        });

        describe('when a second request is triggered', () => {
          it('should cancel the existing request', () => {

          });

          describe('when the first request returns slower than the second request', () => {
            it('should still broadcast the result from the second request', () => {
              
            });
          });
        });
      });
    });
  });
});
