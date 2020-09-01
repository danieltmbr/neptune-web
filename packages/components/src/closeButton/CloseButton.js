import React from 'react';
import Types from 'prop-types';
import Close from '@transferwise/icons/react/close';
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

CloseButton.propTypes = {
  onClose: Types.func.isRequired,
};

export default CloseButton;
