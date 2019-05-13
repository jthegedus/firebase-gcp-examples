exports.helloBerglas = (req, res) => {
  let data = '<h1>Berglas Test</h1>';
  data += `<p>nsecret is ${process.env.API_KEY}</p>`;
  data += `<p>listening on port ${process.env.PORT}</p>`;
  res.send(data);
};
