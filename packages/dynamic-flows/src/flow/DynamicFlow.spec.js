import React from 'react';
import { shallow } from 'enzyme';

import DynamicFlow from '.';
import DynamicLayout from '../layout';
import { convertStepToLayout, inlineFormSchemas } from './layoutService';
import { request } from './stepService';

jest.mock('./layoutService');
jest.mock('./stepService');

// We want to use the original implementation so everything continues to function
const layoutService = jest.requireActual('./layoutService');
convertStepToLayout.mockImplementation(layoutService.convertStepToLayout);
inlineFormSchemas.mockImplementation(layoutService.inlineFormSchemas);

describe('Given a component for rendering a dynamic flow', () => {
  let component;
  let onClose;
  let onStepChange;

  const successAction = {
    label: 'Submit',
    method: 'POST',
    url: '/success',
  };

  const failureAction = {
    label: 'Submit',
    method: 'POST',
    url: '/failure',
  };

  const skipAction = {
    label: 'Skip',
    method: 'GET',
    url: '/navigate',
  };

  const actions = [successAction, skipAction, failureAction];

  const reviewFields = {
    title: 'A thing',
    fields: [
      {
        title: 'Label for a',
        value: 'Value of a',
      },
    ],
  };

  const numberSchema = { type: 'number' };
  const stringSchema = { type: 'string', refreshRequirements: true };

  const thingSchema = {
    id: '#thing',
    type: 'object',
    properties: {
      a: numberSchema,
      b: stringSchema,
    },
    required: ['a'],
  };

  const newSchema = {};
  const newLayout = [{ type: 'form', newSchema }];
  const newStep = { type: 'form', layout: newLayout };

  const originalStep = {
    type: 'form',
    layout: [
      {
        type: 'form',
        $schema: '#thing',
      },
    ],
    schemas: [thingSchema],
    actions: [successAction, skipAction],
    model: { a: 99 },
    refreshFormUrl: '/refresh',
  };

  const flowUrl = '/load';

  request.mockImplementation((action) => {
    switch (action.url) {
      case '/load':
        return Promise.resolve(originalStep);
      case '/navigate':
        return Promise.resolve(newStep);
      case '/success':
        return Promise.resolve(newStep);
      case '/refresh':
        return Promise.resolve(newStep);
      case '/failure':
        return Promise.reject();
      default:
        return Promise.reject();
    }
  });

  function getLayout() {
    return component.find(DynamicLayout);
  }

  beforeEach(() => {
    onClose = jest.fn();
    onStepChange = jest.fn();
    convertStepToLayout.mockClear();
    inlineFormSchemas.mockClear();
    request.mockClear();
  });

  describe('when there is JS step', () => {
    it('should use the DynamicJS component', () => {
      // TODO
    });
  });

  describe('when there is a decision step with no step layout', () => {
    const decisionStep = {
      type: 'decision',
      key: 'decide-thing-type',
      title: 'Thing type',
      description: 'Please choose between types of things',
      options: [
        {
          title: 'Thing one',
          description: 'The first type of thing',
          url: 'https://...',
        },
        {
          title: 'Thing two',
          url: 'https://...',
          enabled: false,
        },
      ],
    };

    beforeEach(() => {
      component = shallow(
        <DynamicFlow
          flowUrl={flowUrl}
          specification={decisionStep}
          onClose={onClose}
          onStepChange={onStepChange}
        />,
      );
    });

    it('should first generate a layout using the layout service', () => {
      expect(convertStepToLayout).toHaveBeenCalledWith(decisionStep);
    });
  });

  describe('when there is a form step with no step layout', () => {
    const formStep = {
      type: 'form',
      key: 'create-thing', // For tracking
      title: 'Step 1',
      description: 'Please create a thing',
      refreshFormUrl: '/thing-requirements',
      actions,
      reviewFields,
      model: { a: 1 },
      schemas: [thingSchema],
    };

    beforeEach(() => {
      component = shallow(
        <DynamicFlow
          flowUrl={flowUrl}
          specification={formStep}
          onClose={onClose}
          onStepChange={onStepChange}
        />,
      );
    });

    it('should first generate a layout using the layout service', () => {
      expect(convertStepToLayout).toHaveBeenCalledWith(formStep);
    });

    it('should inline any schemas referenced by id using the layout service', () => {
      expect(inlineFormSchemas).toHaveBeenCalled();
    });
  });

  describe('when there is a final step with no step layout', () => {
    const finalStep = {
      type: 'final',
      key: 'thing-final',
      success: true,
      details: {
        image: '/images/1234.png',
        title: 'We create the thing!',
        description: 'You now do stuff with the thing',
        actionTitle: 'Continue',
      },
      result: {
        exitValue: 'value',
      },
    };

    beforeEach(() => {
      component = shallow(
        <DynamicFlow
          flowUrl={flowUrl}
          specification={finalStep}
          onClose={onClose}
          onStepChange={onStepChange}
        />,
      );
    });

    it('should first generate a layout using the layout service', () => {
      expect(convertStepToLayout).toHaveBeenCalledWith(finalStep);
    });
  });

  describe('when there is a step layout', () => {
    const inlineFormLayout = [{ type: 'form', schema: thingSchema }];

    beforeEach(() => {
      component = shallow(
        <DynamicFlow
          flowUrl={flowUrl}
          specification={originalStep}
          onClose={onClose}
          onStepChange={onStepChange}
        />,
      );
    });

    it('should use the DynamicLayout to render it', () => {
      expect(getLayout()).toBeTruthy();
    });

    it('should inline the form schema(s) and pass as the soecification as a layout', () => {
      expect(getLayout().prop('components')).toEqual(inlineFormLayout);
    });

    it('should pass the layout the step model', () => {
      expect(getLayout().prop('model')).toEqual(originalStep.model);
    });

    describe('when a model update is triggered by a schema with refreshRequirements', () => {
      const newModel = { a: 1, b: 'c' };
      const newStepWithModel = { ...newStep, model: { a: 2 } };

      beforeEach(() => {
        request.mockImplementation(() => Promise.resolve(newStepWithModel));
        getLayout().simulate('modelChange', newModel, true, stringSchema, thingSchema);
      });

      it('should use the model to request a new schema', () => {
        const fakeAction = {
          method: 'POST',
          url: '/refresh',
        };
        expect(request).toHaveBeenCalledWith(fakeAction, newModel);
      });

      it('should pass the new schema to the layout', () => {
        expect(getLayout().prop('components')).toEqual(newLayout);
      });

      it('should pass the new model to the layout', () => {
        expect(getLayout().prop('model')).toEqual(newStepWithModel.model);
      });
    });

    describe('when a refresh requirements call fails', () => {
      const errorResponse = { error: "That's not allowed" };

      beforeEach(() => {
        request.mockImplementation(() => Promise.reject(errorResponse));
        getLayout().simulate('modelChange', { a: 1, b: 'c' }, true, stringSchema, thingSchema);
      });

      it('should continue to render the original step', () => {
        expect(getLayout().prop('components')).toEqual(inlineFormLayout);
      });
    });

    describe('when the layout broadcasts a POST action and the model is valid', () => {
      beforeEach(() => {
        request.mockImplementation(() => new Promise(() => {}));
        getLayout().simulate('modelChange', { a: 1 }, true, numberSchema, thingSchema);
        getLayout().simulate('action', successAction);
      });

      it('should tell the layout the form is submitted', () => {
        expect(getLayout().prop('submitted')).toBe(true);
      });

      it('should make the corresponding request', () => {
        expect(request).toHaveBeenCalledWith(successAction, { a: 1 });
      });
    });

    describe('when the layout broadcasts a POST action and the model is invalid', () => {
      beforeEach(() => {
        request.mockImplementation(() => Promise.resolve(newStep));
        getLayout().simulate('modelChange', { a: 'invalid' }, false, numberSchema, thingSchema);
        getLayout().simulate('action', successAction);
      });

      it('should tell the layout the form is submitted', () => {
        expect(getLayout().prop('submitted')).toBe(true);
      });

      it('should not make the corresponding request', () => {
        expect(request).not.toHaveBeenCalled();
      });
    });

    describe('when the layout broadcasts a GET action and the model is invalid', () => {
      beforeEach(() => {
        request.mockImplementation(() => Promise.resolve(newStep));
        getLayout().simulate('modelChange', { a: 'invalid' }, false, numberSchema, thingSchema);
        getLayout().simulate('action', skipAction);
      });

      it('should ignore the invalid model and make the corresponding request', () => {
        expect(request).toHaveBeenCalledWith(skipAction, undefined);
      });
    });

    describe('when we submit an action but we receive a server error', () => {
      const errorResponse = { error: "That's not allowed ", validation: { b: 'We need a B!' } };

      beforeEach(() => {
        request.mockImplementation(() => Promise.reject(errorResponse));
        getLayout().simulate('modelChange', { a: 1 }, true, numberSchema, thingSchema);
        getLayout().simulate('action', failureAction);
      });

      it('should pass those errors to the layout', () => {
        expect(getLayout().prop('errors')).toBe(errorResponse.validation);
        // TODO deal with global errors
      });

      it('should not trigger onStepChange', () => {
        expect(onStepChange).not.toHaveBeenCalled();
      });
    });

    describe('when we submit an action and we receive a new step', () => {
      beforeEach(() => {
        request.mockImplementation(() => Promise.resolve(newStep));
        getLayout().simulate('modelChange', { a: 1 }, true, numberSchema, thingSchema);
        getLayout().simulate('action', successAction);
      });

      it('should update the flow to use that step', () => {
        expect(getLayout().prop('components')).toBe(newStep.layout);
      });

      it('should trigger the onStepChange callback with the new step', () => {
        expect(onStepChange).toHaveBeenCalledWith(newStep);
      });
    });

    // TODO define an exit format?
    describe('when we submit an action and do not receive an error or valid step ', () => {
      beforeEach(() => {
        request.mockImplementation(() => Promise.resolve({}));
        getLayout().simulate('modelChange', { a: 1 }, true, numberSchema, thingSchema);
        getLayout().simulate('action', successAction);
      });

      it('should exit the flow', () => {
        expect(onClose).toHaveBeenCalled();
      });

      it('should not trigger onStepChange', () => {
        expect(onStepChange).not.toHaveBeenCalled();
      });
    });

    describe('when we submit an action with additional data', () => {
      const dataAction = { ...successAction, data: { a: 2, c: true } };

      beforeEach(() => {
        request.mockImplementation(() => Promise.resolve(newStep));
        getLayout().simulate('modelChange', { a: 1 }, true, numberSchema, thingSchema);
        getLayout().simulate('action', dataAction);
      });

      it('should submit the latest model combined with the action data', () => {
        expect(request).toHaveBeenCalledWith(dataAction, { a: 1, c: true });
      });
    });

    // No such thing at the moment
    // describe('when we recieve a flow termination', () => {
    //   beforeEach(() => {
    //     stepResolve({ exit: true }); // TODO what is the format for exit?
    //   });
    //
    //   it('should exit the flow', () => {
    //     expect(onClose).toHaveBeenCalled();
    //   });
    //
    //   it('should not trigger onStepChange', () => {
    //     expect(onStepChange).not.toHaveBeenCalled();
    //   });
    // });

    describe('when the layout triggers an exit action', () => {
      const exitAction = {
        title: 'Exit',
        type: 'delete',
        exit: true,
        data: {
          exitValue: 'value',
        },
      };

      beforeEach(() => {
        getLayout().simulate('action', exitAction);
      });

      it('should trigger the onClose callback with exit data', () => {
        expect(onClose).toHaveBeenCalledWith(exitAction.data);
      });
    });
  });
});

// const finalStepProposed = {
//   type: 'final',
//   key: 'thing-final',
//   title: 'We create the thing!',
//   description: 'You now do stuff with the thing',
//   image: '/images/1234.png',
//   success: true,
//   action: exitAction,
// };

/**
action: { id, label, url, method, data, disabled, schemaId? error, loading? }

<DynamicFlow
  firstStepAction={action} // Use this to fetch first step, can then be used for refresh
  onClose=(exitData)
  onStepChange=(newStep, oldStep, action, data)

  onStepChangeFail=(newStep, oldStep, action, data) // ???
/>

<DynamicLayout
  onModelChange(model, isValid, triggerSchema, modelSchema)
  onAction(action)
  components={layout}
  errors={schemaId: {}}
  submitted=[schemaId]
  schemas=[{id: }]
  actions=[{id}]
  model!!!!
  loading
  />


* */