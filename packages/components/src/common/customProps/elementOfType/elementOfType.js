import { isString } from '@transferwise/neptune-validation';

export const elementOfType = (allowedType) => (props, propName, componentName) => {
  if (props[propName]) {
    const { type } = props[propName];

    if (!type) {
      return null;
    }
    const propToCheck = type.displayName || type;
    if (isString(propToCheck)) {
      if (allowedType.indexOf(propToCheck) === -1) {
        return new Error(
          `Invalid prop ${propName} of type ${propToCheck} provided to ${componentName}. Only ${allowedType} allowed`,
        );
      }
    }
  }
  return null;
};
