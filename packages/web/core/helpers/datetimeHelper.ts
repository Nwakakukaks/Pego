export const formatTime = (datetime?: Date): string => {
  if (datetime) {
    return datetime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  } else {
    return '';
  }
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  // JavaScript starts counting months from 0, so we add 1 to get the correct month number.
  // Also padStart is used to add a leading 0 for single digit months.
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatFullDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleString('en-US', options);
};

export const getCurrentTimestamp = (): number => {
  return new Date().getTime();
};
