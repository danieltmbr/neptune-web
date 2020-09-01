import * as React from 'react';
import enGB from './en_GB';

export const LocaleContext = React.createContext(enGB);

const LocaleProvider = (props) => {
  const { locale, children } = props;

  return <LocaleContext.Provider value={{ ...enGB, ...locale }}>{children}</LocaleContext.Provider>;
};

export default LocaleProvider;
