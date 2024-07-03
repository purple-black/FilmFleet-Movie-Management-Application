using Movies76.Server.Dtos.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Movies76.Server.Models;


namespace Movies76.Server.Mappers
{
    /// <summary>
    ///  Defines a static class representing a mapper for movies.
    ///  Define a static method to convert a movie entity to a movie DTO.
    ///  the ToMovieDto is called from the MovieController and an instance of the Movies table is passed as argument
    ///  This returns a new Dto representation of the entity with its values to the method in the Controller class.
    /// </summary>
    public static class MovieMapper
    {
        public static MovieDto ToMovieDto(this Movies movieModel)
        {
            return new MovieDto
            {
                Id = movieModel.Id,
                MovieName = movieModel.MovieName,
                Actors = movieModel.Actors,
                ReleaseDate = movieModel.ReleaseDate,
                FileName = movieModel.FileName
            };
        }

        /// <summary>
        ///  Defines a static class representing a mapper for creating movies.
        ///  Define a static method to convert a movie entity to a movie DTO.
        ///  the ToMovieFromCreateDto is called from the MovieController and the new instance of the Movies which is added
        ///  to the table is passed as argument
        ///  This returns a new Dto representation of the entity with its values to the method in the Controller class.
        /// </summary>
        public static Movies ToMovieFromCreateDto(this CreateMovieRequestDto movieDto)
        {
            return new Movies
            {
                MovieName = movieDto.MovieName,
                Actors = movieDto.Actors,
                ReleaseDate = movieDto.ReleaseDate,
                FileName = movieDto.FileName
            };
        }
    }
}
