
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const formatDateTime = (dateTimeStr: string) => {
  const date = new Date(dateTimeStr);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const getDayFromDateTime = (dateTimeStr: string) => {
  const date = new Date(dateTimeStr);
  return daysOfWeek[date.getDay() - 1]; // getDay() returns 0 for Sunday, so we adjust to get Monday as 0
};

export { daysOfWeek };
