import React, { Component } from 'react';
import _ from 'lodash';
import { getMovies } from '../services/movieService';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import SearchBar from './common/searchBar';
import { paginate } from '../utils/paginate';
import { Link } from 'react-router-dom';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' },
    searchQuery: ''
  };

  async componentDidMount() {
    const { data: genresData } = await getGenres();
    const { data: moviesData } = await getMovies();
    const genres = [{ _id: '', name: 'All Genres' }, ...genresData];

    this.setState({ movies: moviesData, genres });
    this.setState({ selectedGenre: genres[0] });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };

    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    if (this.state.currentPage !== page) {
      this.setState({ currentPage: page });
    }
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;

    if (searchQuery !== '') {
      filtered = allMovies.filter(m => {
        return (
          m.title
            .toString()
            .toLowerCase()
            .indexOf(searchQuery.toString().toLowerCase()) !== -1
        );
      });
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
    }

    if (filtered.length === 0 || !filtered)
      return { totalCount: 0, data: null };

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the database. </p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          {user && (
            <Link className='btn btn-primary mb-3' to='/movies/new'>
              New Movie
            </Link>
          )}
          <SearchBar value={searchQuery} onChange={this.handleSearch} />
          {movies ? (
            <React.Fragment>
              <p>Showing {totalCount} movies in the database.</p>
              <MoviesTable
                sortColumn={sortColumn}
                movies={movies}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </React.Fragment>
          ) : (
            <p>There are no movies with this title</p>
          )}
        </div>
      </div>
    );
  }
}

export default Movies;
