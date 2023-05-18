const getTodayDate = () => {
  const date = new Date();
  const futureDate = date.getDate();
  date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString('en-CA');
  return defaultValue;
};

export default getTodayDate;
