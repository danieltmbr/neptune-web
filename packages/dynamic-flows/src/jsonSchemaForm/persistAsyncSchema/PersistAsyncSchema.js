import React, { useEffect, useState } from 'react';
import Types from 'prop-types';
import { Alert } from '@transferwise/components';
import BasicTypeSchema from '../basicTypeSchema';

const PersistAsyncSchema = (props) => {
  const [persistAsyncModel, setPersistAsyncModel] = useState(null);
  const [persistAsyncError, setPersistAsyncError] = useState(false);
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const getPersistAsyncResponse = async (currentPersistAsyncModel, persistAsyncSpec) => {
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
        props.onChange(idPropertyValue, props.schema);
      } else {
        setPersistAsyncError(true);
      }
    };

    if (blurred) {
      getPersistAsyncResponse(persistAsyncModel, props.schema.persistAsync);
    } else {
      setPersistAsyncError(false);
    }
  }, [blurred]);

  const persistAsyncOnChange = (newPersistAsyncModel) => {
    setPersistAsyncError(false);
    setPersistAsyncModel(newPersistAsyncModel);
    setBlurred(false);
  };

  return (
    <>
      <BasicTypeSchema
        onChange={persistAsyncOnChange}
        submitted={props.submitted}
        schema={props.schema.persistAsync.schema}
        setBlurred={setBlurred}
      />
      {persistAsyncError && (
        <Alert type="error">Something went wrong, please try again later!</Alert>
      )}
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
};

PersistAsyncSchema.defaultProps = {
  translations: {},
  host: '',
};

export default PersistAsyncSchema;
