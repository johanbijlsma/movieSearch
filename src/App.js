import React, { Component } from 'react';
import logo from './logo.svg';
// import placeholder from './image-placeholder.svg';
import './App.css';
import MovieRow from './components/MovieRow';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // const movies = [
    //   {
    //     id: 0,
    //     poster: '',
    //     title: 'Avengers: Infinity War',
    //     overview:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dicta eos itaque laudantium eum architecto pariatur esse. Reiciendis rem nulla quos, consequatur sunt porro molestias magnam iure eligendi non molestiae. '
    //   },
    //   {
    //     id: 2,
    //     poster: '',
    //     title: 'Avengers: Infinity War 2',
    //     overview:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dicta eos itaque laudantium eum architecto pariatur esse. Reiciendis rem nulla quos, consequatur sunt porro molestias magnam iure eligendi non molestiae. '
    //   },
    //   {
    //     id: 3,
    //     poster: '',
    //     title: 'Avengers: Infinity War 3',
    //     overview:
    //       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet dicta eos itaque laudantium eum architecto pariatur esse. Reiciendis rem nulla quos, consequatur sunt porro molestias magnam iure eligendi non molestiae. '
    //   }
    // ];
    // var movieRows = [];
    // movies.forEach(movie => {
    //   const movieRow = <MovieRow movie={movie} key={movie.id} />;
    //   movieRows.push(movieRow);
    // });
    // this.state = { rows: movieRows };
    this.performSearch('Wallace');
  }

  performSearch(searchTerm) {
    console.log('Perform search using movieDB');
    const movieSearchAPIstring =
      'https://api.themoviedb.org/3/search/movie?api_key=23c5356f958b1e94833e90b920184182&query=' +
      searchTerm;
    const genreSearchAPIstring =
      'https://api.themoviedb.org/3/genre/movie/list?api_key=23c5356f958b1e94833e90b920184182&language=en-US';
    axios.get(movieSearchAPIstring).then(res => {
      const results = res.data.results;
      console.log(results);
      var movieRows = [];
      results.forEach(movie => {
        movie.poster = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;
        movie.backdrop =
          'https://image.tmdb.org/t/p/w1400_and_h450_face/' +
          movie.backdrop_path;
        movie.genres = movie.genre_ids;
        const movieRow = (
          <MovieRow
            movie={movie}
            key={movie.id}
            backdrop={movie.backdrop}
            genres={movie.genres}
          />
        );
        movieRows.push(movieRow);
      });
      this.setState({ rows: movieRows });
    });
    axios.get(genreSearchAPIstring).then(res => {
      const genreResults = res.data.results;
      var genreNames = [];
      genreResults.forEach(genre => {
        const generatedGenre = (
          <li id={genre.id} name={genre.name}>
            {genre.name}
          </li>
        );
        genreNames.push(generatedGenre);
      });
      this.setState({ genre: genreNames });
      // var retrievedGenres = [];
      // genreResults.forEach(genre => {
      //   genre.poster = 'https://image.tmdb.org/t/p/w185/' + genre.poster_path;
      //   genre.backdrop =
      //     'https://image.tmdb.org/t/p/w1400_and_h450_face/' +
      //     genre.backdrop_path;
      //   genre.genres = genre.genre_ids;
      //   const movieRow = (
      //     <MovieRow
      //       movie={movie}
      //       key={movie.id}
      //       backdrop={movie.backdrop}
      //       genres={movie.genres}
      //     />
      //   );
      //   movieRows.push(movieRow);
      // });
    });
  }

  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>
            <img src={logo} alt="logo" width="50px" />
            React MovieDB Search
          </h1>
        </header>
        <section>
          <input
            type="search"
            name="movieSearch"
            id="movieSearch"
            placeholder="Enter search term..."
            className="searchMovie"
            onChange={this.searchChangeHandler.bind(this)}
          />
          <div className="filterBar">Filter Results: genre rating Year</div>
          {/* <MovieRow props={this.state.rows} /> */}
          <div className="cardContainer">{this.state.rows}</div>
        </section>
      </div>
    );
  }
}

export default App;
