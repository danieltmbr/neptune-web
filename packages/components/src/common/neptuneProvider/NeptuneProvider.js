import React from 'react';
import Types from 'prop-types';
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl';
import messages from '../lang';

const NeptuneProvider = ({ locale, children }) => {
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale,
      defaultLocale: 'en',
      messages: messages[locale],
    },
    cache,
  );
  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
};

NeptuneProvider.propTypes = {
  locale: Types.string,
  children: Types.node,
};

NeptuneProvider.defaultProps = {
  locale: 'en',
  children: null,
};

export default NeptuneProvider;
