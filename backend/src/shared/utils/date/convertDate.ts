export const convertToIsoString = (data: string) => {
  const isoFormat = data.split('-').reverse().join('-');
  return new Date(isoFormat).toISOString();
};
