using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Movies76.Server.Dtos.Movies
{
    /// <summary>
    /// Defines a class representing the Dto for the Movie.
    /// Has four properties:
    /// Id, MovieName, Actors and ReleaseDate.
    /// MovieName for holding the name of the movie.
    /// Actors for holding the names of the actors in string form.
    /// ReleaseDate of type nullable DateTime for holding the date of release of the movie
    /// </summary>
    public class MovieDto
    {
        public int Id { get; set; }
        public string MovieName { get; set; } = string.Empty;
        public string Actors { get; set; } = string.Empty;

        public DateTime? ReleaseDate { get; set; }

        public string FileName { get; set; } = string.Empty;

    }
}
