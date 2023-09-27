import React from 'react';
import styles from './FlatCardItem.module.scss';
import seedColor from 'seed-color';
import classnames from 'classnames';

interface FlatCardItemProps {
  name: string;
  description?: string;
  isSelected?: boolean;
}

const FlatCardItem = ({
  name,
  description,
  isSelected = false,
}: FlatCardItemProps) => {
  const abbrev = name.slice(0, 1).toUpperCase();

  return (
    <div
      className={classnames(
        styles.wrapper,
        isSelected && styles.conversationSelected,
      )}
    >
      <span
        className={styles.avatar}
        style={{ backgroundColor: seedColor(name).toHex() }}
      >
        {abbrev}
      </span>
      <div className={styles.textWrapper}>
        <span className={styles.name}>{name}</span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};

export default FlatCardItem;
