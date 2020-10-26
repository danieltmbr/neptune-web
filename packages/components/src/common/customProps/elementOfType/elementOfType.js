import { isString } from '@transferwise/neptune-validation';

const elementOfTypeChecker = (allowedType) => (props, propName, componentName) => {
  const prop = props[propName];

  if (prop && allowedType) {
    const { type } = prop;

    if (!type) {
      return errorReturn({ propName, typeToCheck: prop, componentName, allowedType });
    }
    const typeToCheck = type.displayName || type;
    // This can be improved by checking against the actual component decalration but we need to investigate which way is the most performant.
    if (isString(typeToCheck)) {
      if (allowedType.indexOf(typeToCheck) === -1) {
        return errorReturn({ propName, typeToCheck, componentName, allowedType });
      }
    }
  }
  // assume all ok
  return null;
};

export const errorReturn = ({ propName, typeToCheck, componentName, allowedType }) =>
  new Error(
    `Invalid prop ${propName} of type ${typeToCheck} provided to ${componentName}. Only ${allowedType} allowed`,
  );

const createChainableTypeChecker = (validate) => (allowedType) => {
  const checkType = (isRequired, props, propName, componentName) => {
    const prop = props[propName];
    if (prop == null) {
      if (isRequired) {
        return new Error(`Required ${propName} was not specified in ${componentName}.`);
      }
      return null;
    }
    return validate(allowedType)(props, propName, componentName);
  };

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
};

export const elementOfType = createChainableTypeChecker(elementOfTypeChecker);
