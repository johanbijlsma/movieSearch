import React from 'react';
import placeholder from './../image-placeholder.svg';

class MovieRow extends React.Component {
	viewMovie() {
		const url = 'https://www.themoviedb.org/movie/' + this.props.movie.id;
		window.location.href = url;
	}
	ratingScore() {
		if (
			this.props.movie.vote_average >= 1 &&
			this.props.movie.vote_average <= 5
		) {
			return 'bad';
		}
	}
	render() {
		return (
			<div
				className='movieCard'
				style={{ backgroundImage: 'url(' + this.props.movie.backdrop + ')' }}
			>
				{this.props.movie.poster !== 'https://image.tmdb.org/t/p/w185/null' ? (
					<img src={this.props.movie.poster} alt={this.props.movie.title} />
				) : (
					<img src={placeholder} alt={this.props.movie.title} />
				)}

				<div className='main-block'>
					<h2>{this.props.movie.title}</h2>
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
