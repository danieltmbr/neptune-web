import React, { useState } from 'react';
import Types from 'prop-types';
import BasicTypeSchema from '../basicTypeSchema';

const ERROR_KEY = 'error';

const PersistAsyncSchema = (props) => {
  const [persistAsyncModel, setPersistAsyncModel] = useState(null);
  const [persistAsyncError, setPersistAsyncError] = useState(null);
  const [fieldSubmitted, setFieldSubmitted] = useState(false);

  const getPersistAsyncResponse = async (currentPersistAsyncModel, persistAsyncSpec) => {
    setFieldSubmitted(true); // persist async initiated implied the field has been submitted
    const requestBody = { [persistAsyncSpec.param]: currentPersistAsyncModel };
    props.onPersistAsyncStart(requestBody, persistAsyncSpec);
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
    } else if (responseJson[ERROR_KEY]) {
      setPersistAsyncError(responseJson[ERROR_KEY]);
    } else {
      setPersistAsyncError('Something went wrong, please try again later!');
    }
    props.onPersistAsyncEnd(responseJson, persistAsyncSpec);
  };

  // TODO: add onfocus

  const onBlur = () => {
    if (!props.submitted) {
      getPersistAsyncResponse(persistAsyncModel, props.schema.persistAsync);
    }
  };

  const persistAsyncOnChange = (newPersistAsyncModel, triggerSchema) => {
    console.log(newPersistAsyncModel, 'model');

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
  host: Types.string,
  onPersistAsyncStart: Types.func.isRequired,
  onPersistAsyncEnd: Types.func.isRequired,
};

PersistAsyncSchema.defaultProps = {
  translations: {},
  host: '',
};

export default PersistAsyncSchema;
