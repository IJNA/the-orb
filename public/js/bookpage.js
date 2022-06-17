fetch(`/api/bookpage`)
  .then((response) => {
    return response.json(); // parses response to only give use the data we want
  })
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
  });