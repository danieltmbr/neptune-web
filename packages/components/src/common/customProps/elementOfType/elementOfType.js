export const elementOfType = (allowedType) => (props, propName, componentName) => {
  if (props[propName]) {
    const { displayName } = props[propName].type;
    if (displayName && allowedType.indexOf(displayName) === -1) {
      return new Error(
        `Invalid prop ${propName} provided to ${componentName}. Only ${allowedType} allowed`,
      );
    }
  }

  return null;
};
