import React, { Component } from 'react';
import logo from './tmdb.svg';
import Loader from './loader.svg';
import './App.scss';
import MovieRow from './components/MovieRow';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			rows: [],
			error: null,
			query: null
		};
		// this.performSearch('star wars');
	}

	performSearch(searchTerm) {
		console.log('Perform search using movieDB');
		const APIstringMovie =
			'https://api.themoviedb.org/3/search/movie?api_key=23c5356f958b1e94833e90b920184182&query=' +
			searchTerm;
		this.setState({ isLoading: true, query: searchTerm });
		axios
			.get(APIstringMovie)
			.then(res => {
				const results = res.data.results;
				console.log(results);
				var movieRows = [];
				results.forEach(movie => {
					movie.poster = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;
					movie.backdrop =
						'https://image.tmdb.org/t/p/w1400_and_h450_face/' +
						movie.backdrop_path;
					const movieRow = (
						<MovieRow movie={movie} key={movie.id} backdrop={movie.backdrop} />
					);
					movieRows.push(movieRow);
				});
				this.setState({ rows: movieRows, isLoading: false });
			})
			.catch(error => this.setState({ error, isLoading: false }));
	}

	SearchGenre() {
		console.log('Get genres using movieDB');
		const APIstringGenre =
			'https://api.themoviedb.org/3/genre/movie/list?api_key=23c5356f958b1e94833e90b920184182&language=en-US';
		axios
			.get(APIstringGenre)
			.then(res => {
				const genreList = res.data.genres;
				console.log(genreList);
				var movieGenres = [];
				genreList.forEach(genres => {
					// 	.poster = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path;
					// 	movie.backdrop =
					// 		'https://image.tmdb.org/t/p/w1400_and_h450_face/' +
					// 		movie.backdrop_path;
					// 	const movieRow = (
					// 		<MovieRow movie={movie} key={movie.id} backdrop={movie.backdrop} />
					// 	);
					const movieGenre = <movieGenre id={genres.id} name={genres.name} />;
					movieGenres.push(movieGenre);
				});
				this.setState({ genres: movieGenres });
			})
			.catch(error => this.setState({ error, isLoading: false }));
	}

	searchChangeHandler(event) {
		console.log(event.target.value);
		const boundObject = this;
		const searchTerm = event.target.value;
		boundObject.performSearch(searchTerm);
		boundObject.SearchGenre();
	}

	render() {
		const { isLoading, error } = this.state;
		return (
			<div className={`App ${isLoading ? 'loading' : ''}`}>
				<header>
					<h1>
						<img src={logo} alt='logo' width='50px' />
						React MovieDB Search
					</h1>
				</header>
				<section>
					<input
						type='search'
						name='movieSearch'
						id='movieSearch'
						placeholder='Enter search term...'
						className='searchMovie'
						onChange={this.searchChangeHandler.bind(this)}
					/>

					{error ? <p className='alert'>{error.message}</p> : null}
					{this.state.rows.length === 0 ? (
						<div>
							<p className='instructions'>
								To start using this site, please enter a search query to look
								for Movie titles.
							</p>
							Or as a start; try one off these searches:
							<span className='search-suggestions'>Star Wars</span>
							<span className='search-suggestions'>James Bond</span>
							<span className='search-suggestions'>Disney</span>
						</div>
					) : null}
					{!isLoading ? (
						<div className='cardContainer'>{this.state.rows}</div>
					) : (
						<div className='loadingContainer'>
							<img className='loader' src={Loader} alt='loading...' />
						</div>
					)}
				</section>
			</div>
		);
	}
}

export default App;
