export const formatDate = (date: string) => {
  const formatDate = new Date(date);
  return formatDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
