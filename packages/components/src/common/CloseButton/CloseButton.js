import React from 'react';
import Types from 'prop-types';
import classNames from 'classnames';

import { useIntl } from 'react-intl';

import './CloseButton.css';

export const CloseButton = ({ onClick, className }) => {
  const intl = useIntl();
  return (
    <button
      type="button"
      className={classNames('tw-close-button', 'btn-link', 'text-no-decoration', className)}
      aria-label="CLOSE"
      onClick={onClick}
    >
      {intl.formatMessage({ id: 'neptune.closeButton.close' })}
    </button>
  );
};

CloseButton.propTypes = {
  onClick: Types.func.isRequired,
  className: Types.string,
};

CloseButton.defaultProps = {
  className: null,
};

export default CloseButton;
