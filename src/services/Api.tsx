const Api = () => {
  return fetch("https://front-exercise.z1.digital/evaluations", {
    method: "post",
  })
    .then((response) => response.json())
    .then((data) => {
      return data.summary.outcome;
    });
};

export default Api;
