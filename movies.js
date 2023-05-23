let listNumber = 0;
let moviesRanked = [];

$(function() {
  $("#add-movie").on("submit", function(evt) {
    evt.preventDefault();
    let title = $("#title").val();
    let rating = $("#rating").val();

    let movieData = { title, rating, listNumber };
    const HTMLtoAppend = createMovieDataHTML(movieData);

    listNumber++
    moviesRanked.push(movieData);

    $("#movie-table").append(HTMLtoAppend);
    $("#add-movie").trigger("reset");
  });

  $("tbody").on("click", ".btn.btn-danger", function(evt) {
    let movieToDelete = moviesRanked.findIndex(movie => movie.listNumber === +$(evt.target).data("deleteId"))
    
    moviesRanked.splice(movieToDelete, 1)

    $(evt.target)
      .closest("tr")
      .remove();

  });

  $(".fas").on("click", function(evt) {
    
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesRanked, keyToSortBy, direction);
    
    $("#movie-table").empty();

    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table").append(HTMLtoAppend);
    }

    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
  });
});


function sortBy(array, keyToSortBy, direction) {
  return array.sort(function(a, b) {

    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}



function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.listNumber}>
          Delete
        </button>
      </td>
    <tr>
  `;
}

// Code Referenced:
// https://medium.com/@divyamcm/movie-app-using-html-css-and-javascript-e85f24b1d084
// https://www.w3schools.com/bootstrap/bootstrap_buttons.asp