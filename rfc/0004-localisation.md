- Start date: 2020-09-01
- Status: Proposed

# Summary

Passing translation strings to every component is inconvenient and error prone, and doesn't scale well for complex composite components with many sub-components.

I propose we make use of React contexts / providers, which were designed to handle just such situations.

I did some searching, and Uber's [BaseWeb](https://github.com/uber/baseweb) handles locales in this exact manner. The examples I've shown here are based off of the way they use context to solve this problem.

# What needs localising?

The first thing to clear up, is what we need translations for and what we don't.

**Needs translations**

Text that will never change, and is not customisable. Optional text that has a default value, and does not have to be provided by the client. For example:

- The aria label on a close button ("close")
- The aria label on the previous and next buttons in a pagination component ("previous" and "next")
- The placeholder text of a search box

**Does not need translations**

Text that comprises the content of a component, that is required, has no default value or is not displayed if not provided. Text we cannot anticipate.

- The text in a button
- The options in a select
- The step labels in a stepper

**The full list of required translations for Neptune Web is likely to be short, although it may grow over time.**

# Background

If you aren't familiar with [React Context](https://reactjs.org/docs/context.html), it may help to familiarise yourself with the concept first.

# Proposal

I propose that we expose a locale provider from Neptune Web, which consumers would use to wrap their application, passing in the required translations. This would then allow them to use all Neptune Web components without having to explicitly pass in translations. This is in contrast to an alternative approach that does not use a context, and instead requires consumers to always pass in the translated string, every time they use the component.

Pros

- The consumer only has to consider translations in one place - once done, they don't need to remember to pass in translations anywhere else
- The consumer can use the same component many times, without having to retrieve / pass in a translation every time they use it
- We can simplify the API of our components by removing translations from the API

Cons

- Every consumer must wrap their application in a provider, and must construct and pass the required map of translations

# Implementation

## The Provider

We define a `LocaleProvider` which will be used to provide the translated strings to our components. We expose this from Neptune Web, and it is what we will expect our consumers to wrap their application with.

```js
// locale/index.js
import enGB from './en_GB';
export const LocaleContext = React.createContext(enGB);

// Consumers can provide a locale object, that contains required translations
const LocaleProvider = ({ locale, children }) => {
  // We will have a fallback in our codebase (enGB), but all TransferWise consumers should provide the locale object to ensure correct i18n
  return <LocaleContext.Provider value={{ ...enGB, ...locale }}>{children}</LocaleContext.Provider>;
};
```

### Defining Component Requirements

Each component which requires translated strings will define a `locale.js` file that sits in the same folder as the component, for example:

```js
// closebutton/locale.js
const locale = {
  ariaDescription: 'Close',
};

export default locale;
```

We compose these together into a single file that will act both as documentation of the full set of translations that Neptune Web requires, and as a fallback for people using Neptune Web without providing their own locale (something we would not condone inside TransferWise):

```js
// locale/en_GB.js
import closebutton from '../closeButton/locale';
import select from '../select/locale';

const enGB = {
  closebutton,
  select,
};

export default enGB;
```

## Using the Locale Context

### Within Neptune Web

To make use of a translated string within the implementation of a component, you just import the context - no need to pass in props to handle your translations.

```js
// closebutton/CloseButton.js (truncated)
import { LocaleContext } from '../locale/index';

const CloseButton = ({ onClose }) => {
  return (
    <LocaleContext.Consumer>
      {(locale) => (
        <button
          type="button"
          onClick={onClose}
          className="close"
          aria-label={locale.closebutton.close}
        >
          <Close />
        </button>
      )}
    </LocaleContext.Consumer>
  );
};
```

### As a Consumer

Consumers must wrap their application in the locale provider, and pass a map of strings translated to the desired language. This will be mixed in to our locale provider, and default translations will be used where none are provided (though I recommend that consumers just provide the full list - it won't be long). For example:

```js
import * as React from 'react';
import { Drawer, LocaleProvider, Select } from '@transferwise/components';
// ...

const localeObject = {
  closeButton: {
    close: 'Cerrar',
  },
  select: {
    placeholder: 'Seleccione una opción',
    searchPlacholder: 'Buscar...',
  },
};

export default () => (
  <LocaleProvider locale={localeObject}>
    // All Neptune Web components inside here are translated
    <Head>
      <title>la i18n es divertida</title>
    </Head>
    <Layout>
      <Drawer>
        <div>también lo es seleccionar cosas</div>
        <Select />
      </Drawer>
    </Layout>
  </LocaleProvider>
);
```

## Overriding translated strings

Some components such as the select have translated defaults that in some instances the consumer may wish to customise. In these cases we would both utilise the locale context and leave them exposed as props in the component API. For example (presuming the app has been wrapped with the provider):

```js
// Use with default translated values - placeholder props are optional
<Select
  onChange={() => {}}
  options={[...]}
/>

// Provide custom values
<Select
  onChange={() => {}}
  options={[...]}
  placeholder={'Select a country'}
  searchPlaceholder={'Search for a country'}
/>
```

## Nested components

Because we've removed the need to pass these strings as props, there is no longer any need to pass in strings for sub-components. This produces a much cleaner interface.

**Passing translations**
Note that this is only one approach to passing in translations - others suggest not wrapping it in a translations prop, but rather passing in the strings directly as separate props.

```js
<Drawer
     translations={{
         closeButton: { ariaLabel: 'close' },
     }}
     onClose={...}
/>

<FlowNavigation
     translations={{
         avatar: { ariaLabel: 'avatar' },
         closeButton: { ariaLabel: 'close' },
     }}
     avatarUrl="..."
     steps={...}
     onClose={...}
     onGoBack={...}
/>
```

**Suggested approach**
Note that this presumes the consumer has set up the provider at the app level.

```js

<Drawer onClose={...}/>

<FlowNavigation
     avatarUrl="..."
     steps={...}
     onClose={...}
     onGoBack={...}
/>
```
