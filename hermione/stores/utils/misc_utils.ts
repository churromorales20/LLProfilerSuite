export const monthLeadingZero = (month: number): string => {
  return month < 10 ? `0${month}` : `${month}`;
}

export const validateDates = (date1: string, date2: string): boolean => {
  // Convert the date strings into Date objects
  const [month1, year1] = date1.split('-').map(Number);
  const [month2, year2] = date2.split('-').map(Number);
  // Check if the dates are valid
  if (isNaN(month1) || isNaN(year1) || isNaN(month2) || isNaN(year2)) {
    return false; // Invalid date format
  }

  // Compare the dates
  if (year1 > year2) {
    return true;
  } else if (year1 === year2 && month1 > month2) {
    return true;
  } else {
    return false;
  }
}