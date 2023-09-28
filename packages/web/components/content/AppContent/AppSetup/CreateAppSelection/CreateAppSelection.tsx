import React, { useState } from 'react';
import { AppCreationModes } from '@core/enums/appCreationModes';
import styles from './CreateAppSelection.module.scss';
import AppCreationModeCard from './ContractTypeCard';

interface CreateAppSelectionProps {
  onSelect?: (selected: AppCreationModes) => void;
}

export default function CreateAppSelection({
  onSelect,
}: CreateAppSelectionProps) {
  const [selectedContractType, setSelectedContractType] =
    useState<AppCreationModes>();

  const handleSelect = (selected: AppCreationModes) => {
    setSelectedContractType(selected);
    onSelect && onSelect(selected);
  };

  return (
    <div className={styles.converationTypeWrapper}>
      <div className={styles.converationTypeItem}>
        <AppCreationModeCard
          appCreationMode={AppCreationModes.Template}
          selected={selectedContractType === AppCreationModes.Template}
          onSelect={() => handleSelect(AppCreationModes.Template)}
        />
      </div>
      <div className={styles.converationTypeItem}>
        <AppCreationModeCard
          appCreationMode={AppCreationModes.Custom}
          selected={selectedContractType === AppCreationModes.Custom}
          onSelect={() => handleSelect(AppCreationModes.Custom)}
        />
      </div>
      <div className={styles.converationTypeItem}>
        <AppCreationModeCard
          appCreationMode={AppCreationModes.Import}
          selected={selectedContractType === AppCreationModes.Import}
          onSelect={() => handleSelect(AppCreationModes.Import)}
        />
      </div>
    </div>
  );
}
