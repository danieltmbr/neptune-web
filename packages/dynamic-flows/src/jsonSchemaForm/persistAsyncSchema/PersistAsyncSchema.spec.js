import React from 'react';
import { mount } from 'enzyme';
import PersistAsyncSchema from './PersistAsyncSchema';
import BasicTypeSchema from '../basicTypeSchema';
import SchemaFormControl from '../schemaFormControl';

describe('Given a component for rendering persist async schemas', () => {
  let onChange;
  let onPersistAsyncStart;
  let onPersistAsyncEnd;
  let props;

  const param = 'aParam';
  const schema = {
    type: 'string',
    title: 'Text input',
    persistAsync: {
      method: 'GET',
      url: '/v1/foobar',
      param,
      idProperty: 'anIdProperty',
      schema: {
        title: 'A title',
        type: 'string',
      },
    },
  };

  const translations = {};
  const submitted = false;
  const host = 'http://trwi.se';

  const getMockFetchPromise = (status, mockResponse) => {
    return Promise.resolve({
      status,
      json: () => Promise.resolve(mockResponse),
    });
  };

  const initialiseMockPersistAsyncEndpoint = () => {
    jest.spyOn(global, 'fetch').mockImplementation((input, init) => {
      let response;
      let delay = 0;
      switch (JSON.parse(init.body)[param]) {
        case '777777':
          response = getMockFetchPromise(200, { anIdProperty: 'some-resp-12345' });
          delay = 5;
          break;
        case '888888':
          response = getMockFetchPromise(200, { anIdProperty: 'other-resp-54321' });
          delay = 10;
          break;
        case '666666':
          response = getMockFetchPromise(422, { anIdProperty: 'Invalid param!' });
          delay = 5;
          break;
        default:
          response = getMockFetchPromise(500, {});
      }
      jest.advanceTimersByTime(delay);
      return response;
    });
  };

  beforeEach(() => {
    jest.useFakeTimers();
    initialiseMockPersistAsyncEndpoint();

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

  afterEach(() => {
    jest.useRealTimers();
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
        beforeEach(() => {
          const formControl = component
            .find(PersistAsyncSchema)
            .find(BasicTypeSchema)
            .find(SchemaFormControl);
          formControl.simulate('change', { target: { value: '777777' } });
          formControl.simulate('blur');
        });

        it('should trigger onPersistAsyncStart correctly', () => {
          expect(onPersistAsyncStart).toHaveBeenCalledTimes(1);
          expect(onPersistAsyncStart).toHaveBeenCalledWith(
            { aParam: '777777' },
            schema.persistAsync,
          );
        });

        it('should trigger onPersistAsyncEnd correctly', () => {
          expect(onPersistAsyncEnd).toHaveBeenCalledTimes(1);
          expect(onPersistAsyncEnd).toHaveBeenCalledWith(
            { anIdProperty: 'some-resp-12345' },
            schema.persistAsync,
          );
        });

        describe('when the request is successful', () => {
          it('should make the persist async call', () => {});

          it('should make the persist async call with the correct request', () => {});

          it('should extract the value out of the response using idProperty', () => {});

          it('should broadcast the persist async response value', () => {});
        });

        describe('when the request fails with 422 error', () => {
          it('should render the error', () => {});
        });

        describe('when the request fails without error', () => {
          it('should render fallback error message', () => {});
        });

        describe('when a second request is triggered', () => {
          it('should cancel the existing request', () => {});

          describe('when the first request returns slower than the second request', () => {
            it('should still broadcast the result from the second request', () => {});
          });
        });
      });
    });
  });
});
