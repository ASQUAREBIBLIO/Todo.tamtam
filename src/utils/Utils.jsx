export { formatDate };

const formatDate = () => {
  let date =
    new Date().toDateString() +
    " " +
    new Date().getHours() +
    ":" +
    new Date().getMinutes();

  if (`${date.split(" ")[0]}` == new Date().toDateString().split(" ")[0])
    return `Today at ${date.split(" ")[4]}`;
  else return `${date.split(" ")[0]} at ${date.split(" ")[4]}`;
};
