import React from 'react';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import messagesEn from '../../../lang/en-GB.json';
import messagesFr from '../../../lang/fr.json';

const AppProvider = ({ locale, children }) => {
  const cache = createIntlCache();
  const messages = {
    en: {
      ...messagesEn,
    },
    fr: {
      ...messagesFr,
    },
  };

  const intl = createIntl(
    {
      locale,
      messages: messages[locale],
    },
    cache,
  );

  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
};

export default AppProvider;
