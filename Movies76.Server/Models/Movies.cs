using Movies76.Server.Configurations;
using Movies76.Server.Dtos.Movies;
using System;
using System.ComponentModel.DataAnnotations;
using System.Configuration;


namespace Movies76.Server.Models
{

    /// <summary>
    /// contains the class Movies where the properties of the movies are defined. 
    /// Properties ==>  Id, MovieName, Actors and ReleaseDate.
    /// </summary>
    public class Movies
    {

        /// <summary>
        /// Id is the primary key in the table "Movies" in Database "FilmFleet" to identify each movie entry. 
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// MovieName is the second property and is the name of the movie.
        /// A character limit of 100 is set for the MovieName.
        /// limit is set by checking if condition.
        /// </summary>
        
        private string _movieName = string.Empty;

        [StringLength(100)]
        public string MovieName
        {
            get => _movieName;
            set
            {
                _movieName = value;
            }
        }

        /// <summary>
        /// The third property Actors will have the name of Actors in the movie seperated by commas.
        /// The character limit is set to be 250.
        /// </summary>
        private string _actors = string.Empty;

        [StringLength(250)]
        public string Actors
        {
            get => _actors;
            set
            {
                _actors = value;
            }
        }

        /// <summary>
        /// ReleaseDate is the fourth property and is the date on which the movie is released.
        /// </summary>
        public DateTime? ReleaseDate { get; set; }

        /// <summary>
        /// FILE UPLOAD
        /// </summary>
        public string FileName { get; set; } = string.Empty;

        /// <summary>
        /// ToMovieDto returns a 0 
        /// </summary>
        /// <returns></returns>
        internal static object? ToMovieDto()
        {
            //throw new NotImplementedException();
            return 0;
        }


    }
}
