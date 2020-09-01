- Start date: 2020-09-01
- Status: Proposed

# Summary

We have two existing RFCs attempting to solve the problem of passing translated strings to our components. There has been opposition to the way in which we pass them down - both in the naming of the prop, and how we manage passing translations down for nested props.

Passing translation strings to every component is messy and error prone, and doesn't scale well for complex composite components with many sub-components.

I propose we make use of React contexts / providers, which were designed to handle just such situations.

I did some searching, and Uber's BaseWeb handles locales in this exact manner. The examples I've shown here are based off of the way they use context to solve this problem.

# Implementation

## The Locale Provider

We define a `LocaleProvider` which will be used to provide the locale context to our components.

```js
// locale/index.js
import enGB from './en_GB';
export const LocaleContext = React.createContext(enGB);

const LocaleProvider = ({ locale, children }) => {
  return <LocaleContext.Provider value={{ ...enGB, ...locale }}>{children}</LocaleContext.Provider>;
};
```

This imports the default translations, which are comprised of locale files exposed by each component that requires translated strings:

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

Each component with required translated strings defines a locale file that sits in the same folder as the component, for example:

```js
// closebutton/locale.js
const locale = {
  close: 'Close',
};

export default locale;
```

## Using the Locale Context

To make use of a translated string, you just import the context - no need to pass in props to handle your translations.

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

## Overriding the locale

To override the locale, the consumer must pass a map of strings translated to the desired language. This will be mixed in to our locale provider, and default translations will be used where none are provided:

```js
import * as React from 'react';
import { LocaleProvider } from '@transferwise/neptune-web';
import { MoneyInput } from '@transferwise/neptune-web';

const localeOverrideEs = {
  select: {
    placeholder: 'Seleccione una opción',
    searchPlacholder: 'buscar',
  },
};

export default () => (
  <LocaleProvider locale={localeOverrideEs}>
    <MoneyInput />
  </LocaleProvider>
);
```

## Nested components

Because we've removed the need to pass these strings as props, there is no longer any need to pass in strings for sub-components. This produces a much cleaner interface.

```js
// Passing translations
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

```js
// Suggested approach - default locale
<FlowNavigation
     avatarUrl="..."
     steps={...}
     onClose={...}
     onGoBack={...}
/>
```

```js
// Suggested approach - different locale
<LocaleProvider locale={localeOverride}>
    <FlowNavigation
     avatarUrl="..."
     steps={...}
     onClose={...}
     onGoBack={...}
    />
  </LocaleProvider>
```
