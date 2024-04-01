import "./styles.css";

function debounce(callback, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
}

let totalNetworkRequests = 0;
function fetchData(value) {
  return new Promise(function (resolve, reject) {
    // Simulate an API call by using setTimeout to delay the resolution of the Promise
    setTimeout(function () {
      // increment network request
      totalNetworkRequests++;
      // Resolve the Promise with some data
      console.log(`searching for: ${value}`);
      console.log(`total requests: ${totalNetworkRequests}`);
      resolve(
        Array(4)
          .fill(null)
          .map((_, i) => `Result ${i + 1} for ${value}`)
      );
    }, 1000);
  });
}
// Get references to the input field and container element
const input = document.getElementById("search-input");
const resultsContainer = document.querySelector(".search-results");

// Listen for keystrokes on the input field
input.addEventListener(
  "keyup",
  debounce(function (event) {
    // Get the value of the input field
    const value = event.target.value;

    // Make an API call to get the search results
    fetchData(value).then(function (results) {
      // Clear any previous search results
      resultsContainer.innerHTML = "";

      // Add a search result element for each result
      results.forEach(function (result) {
        const resultElement = document.createElement("li");
        resultElement.innerHTML = result;
        resultElement.classList.add("search-result");
        resultsContainer.appendChild(resultElement);
      });
    });
  }, 500)
);

// Listen for clicks on the search result elements
resultsContainer.addEventListener("click", function (event) {
  // Update the value of the input field with the clicked result
  input.value = event.target.innerHTML;

  // Clear the search results list
  resultsContainer.innerHTML = "";
});

