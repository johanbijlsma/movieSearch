import React from 'react';
import placeholder from './../image-placeholder.svg';

class MovieRow extends React.Component {
	viewMovie() {
		const url = 'https://www.themoviedb.org/movie/' + this.props.movie.id;
		window.location.href = url;
	}

	render() {
		return (
			<div
				className='movieCard'
				style={{ backgroundImage: 'url(' + this.props.movie.backdrop + ')' }}
			>
				{this.props.movie.poster !== 'https://image.tmdb.org/t/p/w185/null' ? (
					<img
						src={this.props.movie.poster}
						alt={this.props.movie.title}
						loading='lazy'
						width='185'
						height='287'
					/>
				) : (
					<img src={placeholder} alt={this.props.movie.title} />
				)}

				<div className='main-block'>
					<h2>
						{this.props.movie.title}
						<span className='small'> ({this.props.movie.release_date}) </span>
					</h2>
					<p className='vote'>
						{this.props.movie.vote_average === 0 ? (
							<span className='small'>This movie has no rating yet</span>
						) : (
							<span
								className={
									this.props.movie.vote_average >= 1 &&
									this.props.movie.vote_average <= 6.5
										? 'bad'
										: 'good'
								}
							>
								{this.props.movie.vote_average}
								<span className='small'>/10</span>
							</span>
						)}
					</p>
					<p className='overview'>{this.props.movie.overview}</p>
					{/* <h3>Genre:</h3>
					{this.props.movie.genre_ids.map((genre, i) => (
						<ul>
							<li key={i}>{genre}</li>
						</ul>
					))}
					<movieGenres id={movieGenre.id} name={movieGenre.name} />; */}
					<button
						value='View'
						className='btn'
						onClick={this.viewMovie.bind(this)}
					>
						Read more on <span hidden>MovieDB</span>
					</button>
				</div>
			</div>
		);
	}
}

export default MovieRow;
