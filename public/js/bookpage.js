fetch(`/api/bookpage`)
  .then((response) => {
    return response.json(); // parses response to only give use the data we want
  })
  .then((data) => {
    console.log(data);
    let content = '';
    data.map(book => content += book.data.content);
    let contentDiv = document.getElementsByClassName('content')[0];
    console.log(contentDiv);
    contentDiv.insertAdjacentHTML('beforeend', content);
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
  });