let Main = document.getElementById("main")
let wMain = document.getElementById("wmain")
let searchBtn = document.querySelector(".btn")
let inputField = document.getElementById("input")
let apiKey = "7000c1a5"
let html = ""
let watchlisthtml = ""
let moviesArr = []
let watchlistArr = []
let watchliststore = []

watchliststore = JSON.parse(localStorage.getItem("watchlistArr"))

if(watchliststore){
  watchlistArr = watchliststore
  console.log(watchlistArr)
  renderWatchlist(watchlistArr)
}else{
  if(wMain){
    emptyWatchlist()
  }
  console.log("not stored in localStorage")
}

if(wMain){
  if(watchlistArr.length <= 0 ){
     emptyWatchlist() 
  }
}


if(Main){
  searchBtn.addEventListener("click",  function(event){
    event.preventDefault()
    moviesArr = []
    Main.innerHTML = ''
    return getMovie().catch(err => {
      console.log(err.TypeError)
    })
  })
  
}


 async function getMovie(){
  let response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${inputField.value}`)
  let data = await response.json()
  console.log(data)
  if(data.Response === "False"){
    Main.innerHTML = `
    <div class = "movie-box-div">
      <h3 class = "movie-box-div-text">Unable to find what you are looking for</h3>
     </div>
    `
  }else if(data.Response === "True"){
    revealMovie(data)
    addWatchlistBtn()
  }
  return data

}

function revealMovie(data){
  data.Search.map( async (item) => {
     let response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${item.Title}`)
     let val = await response.json()
     moviesArr.push(val)
     displayMovies(moviesArr)

      })
  
}

function addWatchlistBtn(){
  let icons = document.querySelectorAll(".genre-icon")
  console.log(icons)
  let icon = ""
  for(let i = 0; i < icons.length; i++){
   icon = icons[i]  
   icon.addEventListener("click", function(){
    icons[i].style.backgroundImage = "url(./images/marklistIcon.png)"
    watchlistArr.unshift(moviesArr[i])  
    localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr))
    })
  }
}

function removeWatchlistBtn(){
  let removeIcons = document.querySelectorAll(".list-icon")
  let removeIcon = ''
  for(let i = 0; i < removeIcons.length; i++){
    removeIcon = removeIcons[i]
    removeIcon.addEventListener("click", function(){
      watchlistArr.splice(i, 1) 
      console.log(watchlistArr)
      localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr))
      watchliststore = JSON.parse(localStorage.getItem("watchlistArr"))
      window.location.reload()
      watchlistArr = watchliststore
       renderWatchlist(watchlistArr)
    })
  }
}

function displayMovies(arr){
  let movies = ""
  for(let i = 0; i < arr.length; i++){
     movies = arr[i]
     html = `
    <div class = "movie-Kit">
      <div class = "movie-container">
        <div class = "film-img-div">
            <img class = "film" src = "${movies.Poster}" alt = "Blade runner movie thumbnail"/>
        </div>
    
        <div class = "film-text-div">
          <h3 class = "film-title">${movies.Title} <img class = "rating-img" src = "./images/star icon.png" alt = "rating star image"/> <span class = "rate-text">${movies.imdbRating}</span></h3>
          <p class = "film-text-one"> 
            <span class = "genre-time">${movies.Runtime}</span> 
            <span class = "genre-text">${movies.Genre}</span>
            <div class = "genre-icon" aria-label = "add to watchlist icon">
           
            </div> 
            <span>Watchlist</span>
          </p>
        </div>
      </div>

      <p class = "film-text-two">
          ${movies.Plot}
      </p>
    </div>   `
  }
  if(Main){
    Main.innerHTML += html
    addWatchlistBtn()
  }
}

function renderWatchlist(arr){
  let list = ""
  for(let i = 0; i < arr.length; i++){
    list = arr[i]
    watchlisthtml = `
    <div class = "movie-Kit">
      <div class = "movie-container">
        <div class = "film-img-div">
            <img class = "film" src = "${list.Poster}" alt = "Blade runner movie thumbnail"/>
        </div>
    
        <div class = "film-text-div">
          <h3 class = "film-title">${list.Title} <img class = "rating-img" src = "./images/star icon.png" alt = "rating star image"/> <span class = "rate-text">${list.imdbRating}</span></h3>
          <p class = "film-text-one"> 
            <span class = "genre-time">${list.Runtime}</span> 
            <span class = "genre-text">${list.Genre}</span>
            <div class = "list-icon" aria-label = "remove from watchlist icon">
           
            </div> 
            <span>Remove watchlist</span>
          </p>
        </div>
      </div>

      <p class = "film-text-two">
          ${list.Plot}
      </p>
    </div>         
    `
    if(wMain){
      wMain.innerHTML += watchlisthtml
      removeWatchlistBtn()
    }
  }
}

function emptyWatchlist(){
  let emptyHtml =  `
  <div class = "movie-box-div">
        <p class = "movie-box-div-text">Your watchlist is looking pretty empty</p>
        <div class = "flex-text">
          <a href = "index.html"><img src = "./images/watchlist icon.png"
          class = "link-icon" alt = "add to watchlist"/></a>
          <p class = "list-text">Let add some movies</p>
        </div>
  </div>    
  `

  wMain.innerHTML = emptyHtml
}






/**
 *  //Value = inputField.value
 * moviesArr.splice(i, 1)
  window.location.reload()
  <img id = "watchlistBtn" class = "watchlist-icon" src = "./images/watchlist icon.png" alt = "Watchlist icon"/>
backgroundImage: 'url(./images/watchlist icon.png)'
 */

// watchlistIcon.addEventListener("click", function(){
//   console.log("Icon")
// })


//  title = val.Title
    //  console.log( val.Title.replace(":", " "))
      //   html = `
      //   <div class = "movie-container">
      //     <div class = "film-img-div">
      //       <img class = "film" src = "${moviesArr.Poster}" alt = "Blade runner movie thumbnail"/>
      //   </div>
    
      //     <div class = "film-text-div">
      //       <h3 class = "film-title">${moviesArr.Title} <img class = "rating-img" src = "./images/star icon.png" alt = "rating star image"/> <span class = "rate-text">${moviesArr.imdbRating}</span></h3>
      //       <p class = "film-text-one"> 
      //         <span class = "genre-time">${moviesArr.Runtime}</span> 
      //         <span class = "genre-text">${moviesArr.Genre}</span>
      //         <span class = "genre-icon"><img class = "watchlist-icon" src = "./images/watchlist icon.png" alt = "Watchlist icon"/></span> <span>Watchlist</span>
      //       </p>
    
      //       <p class = "film-text-two">
      //       ${moviesArr.Plot}
      //       </p>
      //     </div>
      // </div>
      //           `
      // // console.log(Value)
      // Main.innerHTML += html
    
  // let response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${inputField.value}`)
  // let data = await response.json()
  // console.log(data)
  // Main.innerHTML  =   revealMovie(data)
  