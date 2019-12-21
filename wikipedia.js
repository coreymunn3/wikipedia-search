class Wikipedia {
  constructor (){
    this.limit = '24';
  }

  async getSearchResults(searchPhrase) {
    const searchResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&list=search&srsearch=${searchPhrase}&srlimit=${this.limit}`)

    const searchResults = await searchResponse.json();

    return searchResults.query.search
  }
  

}