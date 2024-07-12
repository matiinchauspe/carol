export default (minimumSeconds, maximumSeconds) => {
  return (Math.floor(Math.random() * (maximumSeconds - minimumSeconds + 1)) + minimumSeconds) * 1000;
};
