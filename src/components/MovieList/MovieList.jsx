import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    // initialize dispatch
    const dispatch = useDispatch();

    // initialize history
    const history = useHistory();

    // get movies array from the store
    const movies = useSelector(store => store.movies);

    // get detail URL from the store
    const url = useSelector(store => store.detailURL);

    // fetches the movie list
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // calls histPush when url is updated
    useEffect(() => {
        histPush();
    }, [url]);

    // function to update the detailURL in the redux store
    const detailedPage = (title) => {
        dispatch({type: 'NEW_DETAIL', payload: title});
    }

    // function to update to a detail/movie.title route
    const histPush = () => {
        history.push(`/${url}`);
    }

    return (
        <main>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3 onClick={() => detailedPage(movie.title)}>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => detailedPage(movie.title)} />
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;