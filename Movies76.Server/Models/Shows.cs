using Movies76.Server.Configurations;
using Movies76.Server.Dtos.Movies;
using System;
using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace Movies76.Server.Models
{
    /// <summary>
    /// contains the class Shows where the properties of the shows are defined. 
    /// Properties ==>  Id, ShowDate, TimeSlot, Movie and Theatre.
    /// </summary>
    public class Shows
    {
        /// <summary>
        /// Id is the primary key in the table "Shows" in Database "FilmFleet" to identify each show entry. 
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// ShowDate is the property in the Shows table to store the date on which the show is screened in the theatre.
        /// </summary>
        public DateTime ShowDate { get; set; }

        /// <summary>
        /// TimeSlot is the property to store the time slots of the screening show.
        /// </summary>
        public string TimeSlot { get; set; } = string.Empty;

        //public string Movie { get; set; } = string.Empty;

        /// <summary>
        /// The Movie property holds the name of the movie that is screened.
        /// </summary>
        private string _movie = string.Empty;

        /// <summary>
        /// setting the maximum limit of the Movie name to be 100.
        /// </summary>
        [StringLength(100)]
        public string Movie
        {
            get => _movie;
            set
            {
                _movie = value;
            }
        }

        //public string Theatre { get; set; } = string.Empty;

        /// <summary>
        /// The Theatre property holds the name of the theatre where the show is available.
        /// </summary>
        private string _theatre = string.Empty;

        /// <summary>
        /// setting the character limit of the theatre name to be 100.
        /// </summary>
        [StringLength(100)]
        public string Theatre
        {
            get => _theatre;
            set
            {
                _theatre = value;
            }
        }

        public string FileName { get; set; } = string.Empty;

    }
}
