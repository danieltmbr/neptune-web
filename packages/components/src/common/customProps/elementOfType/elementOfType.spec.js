import { elementOfType, errorReturn } from './elementOfType';

describe('elementOfType', () => {
  it('returns null if prop is not defined', () => {
    const props = {
      myProp: {},
    };
    const propName = ' A Prop';
    const componentName = 'MyComponent';

    expect(elementOfType(['MyComponent'])(props, propName, componentName)).toBeNull();
  });

  it('returns null if allowedType is not defined', () => {
    const props = {
      myProp: {},
    };
    const propName = 'myProp';
    const componentName = 'MyComponent';

    expect(elementOfType()(props, propName, componentName)).toBeNull();
  });

  it('returns null type provided is allowed', () => {
    const allowedType = 'allowedType';
    const props = {
      myProp: {
        type: allowedType,
      },
    };
    const propName = 'myProp';
    const componentName = 'MyComponent';

    expect(elementOfType(allowedType)(props, propName, componentName)).toBeNull();
  });

  it('returns an error if type is not defined', () => {
    const allowedType = 'allowedType';

    const props = {
      myProp: {},
    };
    const propName = 'myProp';
    const componentName = 'MyComponent';

    expect(elementOfType(allowedType)(props, propName, componentName)).toEqual(
      errorReturn({ propName, typeToCheck: {}, componentName, allowedType }),
    );
  });

  it('returns an error if type is not allowed', () => {
    const allowedType = 'allowedType';

    const props = {
      myProp: { type: 'notAllowedtype' },
    };
    const propName = 'myProp';
    const componentName = 'MyComponent';

    expect(elementOfType(allowedType)(props, propName, componentName)).toEqual(
      errorReturn({ propName, typeToCheck: props[propName].type, componentName, allowedType }),
    );
  });

  // it('returns an error if props is null and required', () => {
  //    Test required props
  // });
});
