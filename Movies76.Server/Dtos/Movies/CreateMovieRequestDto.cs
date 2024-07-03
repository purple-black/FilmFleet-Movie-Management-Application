namespace Movies76.Server.Dtos.Movies
{
    /// <summary>
    /// Defines the class representing the Dto for creating a movie.
    /// Three properties are defined:
    /// MovieName for holding the name of the movie.
    /// Actors for holding the names of the actors in string form.
    /// ReleaseDate of type nullable DateTime for holding the date of release of the movie.
    /// </summary>
    public class CreateMovieRequestDto
    {
        public string MovieName { get; set; } = string.Empty;
        public string Actors { get; set; } = string.Empty;

        public DateTime? ReleaseDate { get; set; }

        public string FileName { get; set; }
    }
}
