var formContainerEl = document.querySelector("#form-container");
var submitButtonEl;
var queryInputEl;
var formatSelectEl;
var formEl;
var resultsEl;

var formInnerHtml = `
<h1 class="mb-4">Library of Congress Search Engine</h1>
<form id="form">
<input
  class="form-control mb-4"
  type="text"
  placeholder="Search Term"
  id="query"
/>
<select id="format" class="form-select mb-4" aria-label="Default select example">
  <option selected value="">Select a format</option>
  <option selected value="maps">Maps</option>
  <option selected value="newspapers">Newspapers</option>
</select>
<button id="submit" class="btn btn-primary">Submit</button>
</form>
`;

function getCardTemplate(item) {
  var subjects = "";
  for (var i = 0; i < item.subject.length; i++) {
    subjects = subjects + `<li>${item.subject[i]}</li>`;
  }

  return `
    <div class="card">
    <h3>${item.title}</h3>
    <dl>
    <dt>Date:</dt>
    <dd>${item.date}</dd>
    <dt>Subjects</dt>
    <dd>
        <ul>
            ${subjects}
        </ul>
    </dd>
    <dt>Description</dt>
    <dd>${item.description[0]}</dd>
    </dl>
    <button class="btn btn-primary">Read More</button>
    </div>
`;
}

function handleSearch(evt) {
  evt.preventDefault();
  window.alert("test");
  var query = queryInputEl.value;
  var format = formatSelectEl.value;
  var url = `search-results.html?q=${query}&format=${format}`;
  document.location.replace(url);
}

function handleDisplayData(data) {
  console.log(data);
  var results = data.results;
  for (var i = 0; i < results.length; i++) {
    var html = getCardTemplate(results[i]);
    var container = document.createElement("div");
    container.innerHTML = html;
    resultsEl.appendChild(container);
  }
}

function handleRequest() {
  var searchParams = new URLSearchParams(document.location.search);
  var q = searchParams.get("q");
  var format = searchParams.get("format");

  var url = format
    ? `https://www.loc.gov/${format}/?q=${q}&fo=json`
    : `https://www.loc.gov/search/?q=${q}&fo=json`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      handleDisplayData(data);
    });
}

function init() {
  formContainerEl.innerHTML = formInnerHtml;
  submitButtonEl = document.querySelector("#submit");
  queryInputEl = document.querySelector("#query");
  formatSelectEl = document.querySelector("#format");
  formEl = document.querySelector("#form");
  formEl.addEventListener("submit", handleSearch);
  resultsEl = document.querySelector("#results");
  if (document.location.search) {
    handleRequest();
  }
}

init();
