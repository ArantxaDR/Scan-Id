const Api = (imgUrl: string) => {
  return fetch("https://front-exercise.z1.digital/evaluations", {
    method: "post",
    body: JSON.stringify({ img: imgUrl }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.summary.outcome;
    });
};

export default Api;
