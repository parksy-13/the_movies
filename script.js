
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWVjZjliYjcxMjhjZGZlYWI2ODg2NmNkOTc5YjU2NSIsInN1YiI6IjY1OWE0Njc5MWQxYmY0MDIwMjNkNTc2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e1y0Q0f89FWzHZbF-jZV8uShalbFnr4HKeKsJZSeGiE'
  }
};


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
        
          <img src='${img_url}' alt="" onclick="alert('이 영화의 ID: ${id}')">
         <div class="info">
          <div class= wrap>
           <h3>${movie_title}</h3>
            <p>${overview}</p>
            <p>⭐ ${vote}</p>
            </div>
        </div>
       
    </div>`;

      document.getElementById('cards-box').innerHTML = temp_html;
    });
  })

let searchBtn = () => {
  const movie_name_input = document.getElementById('movie_name_input').value;
  const card_arr = document.getElementsByClassName('col');

if(movie_name_input===""){
  alert("입력하지 않았습니다.");
  location.reload();
}

  const card_name_arr = [];
  for (let i = 0; i < card_arr.length; i++) {
    card_name_arr[i] = card_arr[i].getElementsByTagName('h3')[0].innerText;
    card_arr[i].style = 'display:none';
  }

  let movie_name = '';
  for (let i = 0; i < card_name_arr.length; i++) {
    movie_name = card_name_arr.filter(
      el => el.toUpperCase().indexOf(movie_name_input.toUpperCase()) > -1
    )[i];
    for (let i = 0; i < card_name_arr.length; i++) {
      if (movie_name === card_name_arr[i]) {
        card_arr[i].style = 'display:inline-block';
      }
    }

  }
}

let resetBtn = () => location.reload();

let gobackBtn = () => window.scrollTo(0, 0);
