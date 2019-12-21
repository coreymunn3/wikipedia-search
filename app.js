// Initialize Wikipedia
const wikipedia = new Wikipedia();

// UI Elements
const searchBtn = document.getElementById('searchButton');
const userInput = document.getElementById('userInput');
const resultDiv = document.getElementById('searchResults')

// Search Event
searchBtn.addEventListener('click', (e) => {
  searchPhrase = userInput.value

  // clear previous search results
  resultDiv.innerHTML = '';
  // show the loader
  loadingDisplay('block');
  
  // REQUEST
  // make the request if search was entered
  if (searchPhrase !== ''){
    wikipedia.getSearchResults(searchPhrase)
      .then(data => {
        console.log(data);
        showResult(data);
        clearSearch();
      })
  } else {
    // remove loader
    loadingDisplay('none');
    // display quick error message
    showError('alert alert-danger text-center','Please Enter a Search Term');
    
  }
})

// UI functions
function showResult(results) {
  let output = '';
  results.forEach((result) => {
    // console.log(result);
    output += `
    <div class="col-md-6 col-lg-4">
      <div class="card bg-light mb-4">
        <div class="card-header bg-secondary text-white">${result.title}</div>
        <div class="card-body">
          <p class="card-text">${result.snippet}</p>
          <a href="https://en.wikipedia.org/?curid=${result.pageid}" class="btn btn-success" target="_blank" >View Article</a>
        </div>
      </div>
    </div>
    `
  })
  // after we have the results, remove the loader
  loadingDisplay('none');

  // show data
  resultDiv.innerHTML = output;
}

function showError(style, message) {
  // insert location
  errorArea = document.getElementById('errorArea');
  // creating the error element
  error = document.createElement('div');
  error.className = style;
  inner = document.createElement('strong');
  inner.appendChild(document.createTextNode(message));
  error.appendChild(inner);
  // insert element
  errorArea.appendChild(error);
  
  // set timeout
  setTimeout(()=> removeError(),1000);
}

function removeError(){
  error = document.querySelector('.alert');
  if (error){
    error.remove()
  }
}

function loadingDisplay(displaySetting) {
  loading = document.getElementById('loading');
  loading.style.display = displaySetting;
}

function clearSearch(){
  userInput.value = '';
}