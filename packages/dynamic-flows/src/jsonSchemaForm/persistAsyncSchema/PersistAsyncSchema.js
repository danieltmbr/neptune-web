import React, { useState } from 'react';
import Types from 'prop-types';
import BasicTypeSchema from '../basicTypeSchema';
import { isStatus2xx, isStatus422 } from '../../common/api/utils';

const PersistAsyncSchema = (props) => {
  const [persistAsyncModel, setPersistAsyncModel] = useState(null);
  const [persistAsyncError, setPersistAsyncError] = useState(null);
  const [fieldSubmitted, setFieldSubmitted] = useState(false);
  const [abortController, setAbortController] = useState(null);

  if (props.schema.persistAsync.schema.format === 'base64url') {
    // TODO: Add support for base64url format
    throw new Error('Not implemented');
  }

  const getPersistAsyncResponse = async (currentPersistAsyncModel, persistAsyncSpec) => {
    const signal = abortCurrentRequestAndGetNewAbortSignal();

    const requestBody = { [persistAsyncSpec.param]: currentPersistAsyncModel };
    props.onPersistAsyncStart(requestBody, persistAsyncSpec);
    setFieldSubmitted(true); // persist async initiated implied the field has been submitted

    const response = await fetch(`${props.host}${persistAsyncSpec.url}`, {
      method: persistAsyncSpec.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      signal,
    });
    const responseJson = await response.json();

    broadcast(response.status, responseJson);
    props.onPersistAsyncEnd(responseJson, persistAsyncSpec);
  };

  const abortCurrentRequestAndGetNewAbortSignal = () => {
    if (abortController) {
      abortController.abort();
    }
    const newAbortController = new AbortController();
    setAbortController(newAbortController);
    return newAbortController.signal;
  };

  const broadcast = (status, response) => {
    const { idProperty } = props.schema.persistAsync;

    if (isStatus2xx(status)) {
      const id = getIdFromResponse(idProperty, response);
      props.onChange(id, props.schema);
    } else if (isStatus422(status)) {
      const error = getErrorFromResponse(idProperty, response);
      setPersistAsyncError(error);
    } else {
      setPersistAsyncError('Something went wrong, please try again later!');
    }
  };

  const getIdFromResponse = (idProperty, response) => response[idProperty];

  const getErrorFromResponse = (errorProperty, response) => response.validation?.[errorProperty];

  const onBlur = () => {
    getPersistAsyncResponse(persistAsyncModel, props.schema.persistAsync);
  };

  const persistAsyncOnChange = (newPersistAsyncModel) => {
    // TODO: add different handling for file upload, do persist async on change instead of onblur
    setPersistAsyncError(null);
    setPersistAsyncModel(newPersistAsyncModel);
  };

  return (
    <>
      <BasicTypeSchema
        onChange={persistAsyncOnChange}
        submitted={props.submitted || fieldSubmitted}
        schema={props.schema.persistAsync.schema}
        errors={persistAsyncError}
        onBlur={onBlur}
      />
    </>
  );
};

PersistAsyncSchema.propTypes = {
  schema: Types.shape({
    type: Types.oneOf(['string', 'number', 'integer', 'boolean']),
    alert: Types.shape({
      context: Types.string,
      markdown: Types.string,
    }),
    persistAsync: Types.shape({
      method: Types.string,
      url: Types.string,
      param: Types.string,
      idProperty: Types.string,
      schema: Types.shape({
        format: Types.string,
      }),
    }),
    enum: Types.arrayOf(Types.oneOfType([Types.string, Types.number, Types.bool])),
    const: Types.oneOfType([Types.string, Types.number, Types.bool]),
    format: Types.string,
    title: Types.string,
    values: Types.arrayOf(Types.shape({})),
    default: Types.oneOfType([Types.string, Types.number, Types.bool]),
    disabled: Types.bool,
    hidden: Types.bool,
    help: Types.shape({}),
  }).isRequired,
  translations: Types.shape({}),
  onChange: Types.func.isRequired,
  submitted: Types.bool.isRequired,
  host: Types.string,
  onPersistAsyncStart: Types.func.isRequired,
  onPersistAsyncEnd: Types.func.isRequired,
};

PersistAsyncSchema.defaultProps = {
  translations: {},
  host: '',
};

export default PersistAsyncSchema;
