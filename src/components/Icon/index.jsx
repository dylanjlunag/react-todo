import cs from 'classnames';
import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

function Icon({ className, type }) {
  return <i className={cs(className, styles.icon, styles[type])} />;
}

Icon.propTypes = {
  type: PropTypes.oneOf(['check', 'delete', 'plus']).isRequired
};

export default memo(Icon);
