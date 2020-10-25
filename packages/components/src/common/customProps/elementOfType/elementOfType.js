import { isString } from '@transferwise/neptune-validation';

const elementOfTypeChecker = (allowedType) => (props, propName, componentName) => {
  const prop = props[propName];

  if (prop && allowedType) {
    const { type } = prop;

    if (!type) {
      return errorReturn({ propName, propToCheck: prop, componentName, allowedType });
    }
    const propToCheck = type.displayName || type;

    if (isString(propToCheck)) {
      if (allowedType.indexOf(propToCheck) === -1) {
        return errorReturn({ propName, propToCheck, componentName, allowedType });
      }
    }
  }
  // assume all ok
  return null;
};

const errorReturn = ({ propName, propToCheck, componentName, allowedType }) =>
  new Error(
    `Invalid prop ${propName} of type ${propToCheck} provided to ${componentName}. Only ${allowedType} allowed`,
  );

const createChainableTypeChecker = (validate) => (allowedType) => {
  const checkType = (isRequired, props, propName, componentName, location) => {
    const prop = props[propName];

    if (prop == null) {
      if (isRequired) {
        return new Error(`Required ${propName} was not specified in ${componentName}.`);
      }
      return null;
    }
    return validate(allowedType)(props, propName, componentName, location);
  };

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
};

export const elementOfType = createChainableTypeChecker(elementOfTypeChecker);
