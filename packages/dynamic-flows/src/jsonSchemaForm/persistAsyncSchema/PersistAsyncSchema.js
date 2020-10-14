import React, { useEffect, useState } from 'react';
import Types from 'prop-types';
import { Alert } from '@transferwise/components';
import BasicTypeSchema from '../basicTypeSchema';
import { getValidationFailures } from '../../common/validation/validation-failures';

const ERROR_KEY = 'error';

const PersistAsyncSchema = (props) => {
  const [model, setModel] = useState(props.model);
  const [persistAsyncInProgress, setPersistAsyncInProgress] = useState(false);
  const [persistAsyncModel, setPersistAsyncModel] = useState(null);
  const [persistAsyncError, setPersistAsyncError] = useState(null);
  const [fallbackError, setFallbackError] = useState(false);

  const getPersistAsyncResponse = async (currentPersistAsyncModel, persistAsyncSpec) => {
    setPersistAsyncInProgress(true);
    const requestBody = { [persistAsyncSpec.param]: currentPersistAsyncModel };
    const response = await fetch(`${props.host}${persistAsyncSpec.url}`, {
      method: persistAsyncSpec.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const responseJson = await response.json();
    const idPropertyValue = responseJson[props.schema.persistAsync.idProperty];
    if (idPropertyValue) {
      setModel(idPropertyValue);
      props.onChange(idPropertyValue, props.schema);
    } else if (responseJson[ERROR_KEY]) {
      setPersistAsyncError(responseJson[ERROR_KEY]);
    } else {
      setFallbackError(true);
    }
  };

  useEffect(() => {
    const validationFailures = getValidationFailures(model, props.schema, props.required);
    if (props.submitted && validationFailures.length > 0 && !persistAsyncInProgress) {
      getPersistAsyncResponse(persistAsyncModel, props.schema.persistAsync);
    }
  }, [props.submitted]);

  const onBlur = () => {
    if (!props.submitted && !persistAsyncInProgress) {
      getPersistAsyncResponse(persistAsyncModel, props.schema.persistAsync);
    }
  };

  const persistAsyncOnChange = (newPersistAsyncModel) => {
    setFallbackError(false);
    setPersistAsyncError(null);
    setPersistAsyncModel(newPersistAsyncModel);
  };

  return (
    <>
      <BasicTypeSchema
        onChange={persistAsyncOnChange}
        submitted={props.submitted}
        schema={props.schema.persistAsync.schema}
        errors={persistAsyncError}
        onBlur={onBlur}
      />
      {fallbackError && <Alert type="error">Something went wrong, please try again later!</Alert>}
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
      schema: Types.object,
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
  model: Types.oneOfType([Types.string, Types.number, Types.bool]),
  host: Types.string,
  required: Types.bool,
};

PersistAsyncSchema.defaultProps = {
  model: null,
  translations: {},
  host: '',
  required: false,
};

export default PersistAsyncSchema;
