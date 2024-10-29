import cuevana3 from 'cuevana3'


function getContent() {
   const movies = cuevana3.getMovies()
    .then((res) => console.log(res))
    .catch((err)=> console.log(err))
    
    
    return movies
}

getContent()