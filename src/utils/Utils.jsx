export { formatDate };

const formatDate = () => {
  let date =
    new Date().toDateString() +
    " " +
    new Date().getHours() +
    ":" +
    new Date().getMinutes();

  let createdAt;

  if (`${date.split(" ")[0]}` == new Date().toDateString().split(" ")[0])
    createdAt = `Today at ${date.split(" ")[4]}`;
  else createdAt = `${date.split(" ")[0]} at ${date.split(" ")[4]}`;

  return createdAt;
};
