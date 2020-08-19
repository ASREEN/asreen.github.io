//ex25
/**{Title: "Guardians of the Galaxy Vol. 2", Year: "2017", Rated: "PG-13", Released: "05 May 2017", Runtime: "136 min", …}
Actors: "Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel"
Awards: "Nominated for 1 Oscar. Another 15 wins & 56 nominations."
BoxOffice: "$389,804,217"
Country: "USA"
DVD: "22 Aug 2017"
Director: "James Gunn"
Genre: "Action, Adventure, Comedy, Sci-Fi"
Language: "English"
Metascore: "67"
Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego."
Poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
Production: "Walt Disney Pictures"
Rated: "PG-13"
Ratings: (3) [{…}, {…}, {…}]
Released: "05 May 2017"
Response: "True"
Runtime: "136 min"
Title: "Guardians of the Galaxy Vol. 2"
Type: "movie"
Website: "N/A"
Writer: "James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)"
Year: "2017"
imdbID: "tt3896198"
imdbRating: "7.6"
imdbVotes: "542,063" */
// create a new account in this site link below
// find out relative API link on that site and call it using fecth()
// show list of movies based on your search, movie search
// show list of tv shows, tv show search
// show only one specific movie data
let url2 = 'http://www.omdbapi.com/?t=Game of Thrones&Season=1';
let s = 'http://www.omdbapi.com/?t=s';
let url = 'http://www.omdbapi.com/?i=tt3896198&apikey=60863c81';
fetch(url)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {
        console.log(data);
        showInfo(data);
        showMore(data);
    })
    .catch(function () {
        // catch any errors
    });


function reseveInfo(moviName) {
    console.log(moviName)
    fetch(`http://www.omdbapi.com/?t=${moviName}&apikey=60863c81`)
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            console.log(data);
            showInfo(data);
            console.log(data.Poster)
            document.getElementById('imgID').setAttribute('src', data.Poster)
        })
        .catch(function () {
            // catch any errors
        });



}
function showInfo(data) {
    moviName.innerHTML = `<h5 class="text-light">Movi-Name:${data.Title}</h5><h5 class="card-text">Year:${data.Year}</h5>`;
    moviInfo.innerHTML = ` <li class="card-title">${data.Director}</li>
    <h5 class="card-text">${data.Type}</h5>
    <h5 class="card-text">${data.imdbID}</h5>
    <h5 class="card-text">${data.Genre}</h5>
    <h5 class="card-text">${data.imdbRating}</h5>`
    document.getElementById('imgID').setAttribute('src', data.Poster);
}
function showMore(moviName1) {
    console.log(moviName1)
    fetch(`http://www.omdbapi.com/?t=${moviName1}&apikey=60863c81`)
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            console.log(data);
            modalIDbtn.innerHTML = `<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
          <img src=${data.Posetr} style="width:100px;height:100px;border-raduis:10%;" alt="picture">
            <ul><li>Title:${data.Title}</li>
            <li>Year:${data.Year}</li>  
            <li>Genre:${data.Genre}</li>
            <li>Langauge:${data.Langauge}</li>  
            <li>ImdbRating:${data.imdbRating}</li>
            <li>Runtime:${data.Runtime}</li>  
            </ul>
          </div>
        </div>
      </div>`
        })
        .catch(function () {
            // catch any errors
        });

}
function showOthers(moviName) {
    fetch(`http://www.omdbapi.com/?apikey=60863c81&s=${moviName}`)
        .then(response => response.json())
        .then(data => {
            movieDataAll.innerHTML = ' ';
            console.log(data.Search)
            data.Search.map(function (movie) {
                console.log(movie.Title);
                movieDataAll.innerHTML +=
                    `
                <div class="col-md-3 col-lg-3" >
                 <div class="card" style="width: 18rem;height:400px;">
                  <img src="${movie.Poster}" class="card-img-top" alt="pic" class="w-100" style="height:200px;">
                  <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <h5 class="card-text">${movie.Type}</h5>
                    <h5 class="card-text">${movie.imdbID}</h5>
                    <p class="card-text">${movie.Year}</p>
                  </div>
                  <button onclick="reseveInfo(${movie.Title})" class="btn btn-primary">More Info</button>
                </div>
            </div>
            `;
            });
        });

}


// function showMovieDetails(x) {
//     console.log(x)
//     var link = `http://www.omdbapi.com/?apikey=60863c81&t=${x}`;
//     console.log(link)
//     fetch(link)
//         .then(response => response.json())
//         .then(item => {
//             console.log(item);
//             movieDataAll.innerHTML =`
//             <div class="col-md-3 my-4">
//                 <img src="${item.Poster}" class="card-img myImg2" title="${item.Title}">
//             </div>
//             <div class="col-md-9 my-4">
//                 <h2>${item.Title}</h2>
//                 <div class="row">
//                     <div class="col-md-5">
//                         <h4 class="my-3">Type: ${item.Type}</h4>
//                         <h4 class="my-3">Genre: ${item.Genre}</h4>
//                     </div>  

//                     <div class="col-md-7">
//                         <h4 class="my-3">Released: ${item.Released}</h4>
//                         <h4 class="my-3">Runtime: ${item.Runtime}</h4>
//                     </div>
//                 </div>
//                 <h4 class="my-3">Director: ${item.Director}</h4>
//                 <h4 class="my-3">Writer: ${item.Writer}</h4>
//                 <h4>Language: ${item.Language}</h4>
//                 <h4 class="my-3">Country: ${item.Country}</h4>
//                 <h4 class="my-3">Actors: ${item.Actors}</h4>
//                 <h4 class="mt-2">Plot: ${item.Plot}</h4>
//             </div>`;                  
//         });
// }