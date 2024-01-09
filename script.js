const options = config;
console.log(options);


fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    let movie_list = response['results'];

    let temp_html = ``;
    movie_list.forEach(i => {
      let img_url = 'https://image.tmdb.org/t/p/w500' + i['backdrop_path'];
      let movie_title = i['title'];
      let overview = i['overview'];
      let vote = i['vote_average'];
      let id = i['id'];

      temp_html += `
      <div class="col">
        
          <img src='${img_url}' alt="" style="width:90%;height:50%;border:auto;" onclick="alert('이 영화의 ID: ${id}')">
         <div class="info">
          <div class= wrap>
           <h2>${movie_title}</h2>
            <p>${overview}</p>
            <p>⭐ ${vote}</p>
            </div>
        </div>
       
    </div>`;

      document.getElementById('cards-box').innerHTML = temp_html;
    });
  })

let searchBtn = () => {
  const movieNameInput = document.getElementById('movieNameInput').value;
  const cardArr = document.getElementsByClassName('col');

if(movieNameInput===""){
  alert("입력하지 않았습니다.");
  location.reload();
}

  const cardNameArr = [];
  for (let i = 0; i < cardArr.length; i++) {
    cardNameArr[i] = cardArr[i].getElementsByTagName('h2')[0].innerText;
    cardArr[i].style = 'display:none';
  }

  let movieName = '';
  for (let i = 0; i < cardNameArr.length; i++) {
    movieName = cardNameArr.filter(
      el => el.toUpperCase().indexOf(movieNameInput.toUpperCase()) > -1
    )[i];
    for (let i = 0; i < cardNameArr.length; i++) {
      if (movieName === cardNameArr[i]) {
        cardArr[i].style = 'display:inline-block';
      }
    }

  }
}

let resetBtn = () => location.reload();

let gobackBtn = () => window.scrollTo(0, 0);
