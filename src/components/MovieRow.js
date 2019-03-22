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
        className="movieCard"
        style={{ backgroundImage: 'url(' + this.props.movie.backdrop + ')' }}
      >
        {this.props.movie.poster !== 'https://image.tmdb.org/t/p/w185/null' ? (
          <img src={this.props.movie.poster} alt={this.props.movie.title} />
        ) : (
          <img src={placeholder} alt={this.props.movie.title} />
        )}
        <div className="main-block">
          <h2>{this.props.movie.title}</h2>
          <p className="overview">{this.props.movie.overview}</p>
          <input
            type="button"
            value="View"
            onClick={this.viewMovie.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default MovieRow;
