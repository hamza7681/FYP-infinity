const getRatingAverage = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i].rating;
  }
  return sum / arr.length;
};

module.exports = getRatingAverage;
