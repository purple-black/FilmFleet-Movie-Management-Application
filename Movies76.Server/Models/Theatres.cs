using Movies76.Server.Configurations;
using System.ComponentModel.DataAnnotations;

namespace Movies76.Server.Models
{

    public class Theatres
    {
        /// <summary>
        /// Id is the primary key in the theatre table to uniquely identiify each theatre.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// TheatreName is the name of the theatre and have a char limit of 100.
        /// </summary>

        private string _theatreName = string.Empty;

        [StringLength(100)]
        public string TheatreName
        {
            get => _theatreName;
            set
            {
                _theatreName = value;
            }
        }

        /// <summary>
        /// Location will have the location of the theatre.
        /// This string has a char limit of 100. 
        /// </summary>
        private string _location = string.Empty;

        [StringLength(100)]
        public string Location
        {
            get => _location;
            set
            {
                _location = value;
            }
        }

        internal static object? ToTheatreDto()
        {
            //throw new NotImplementedException();
            return 0;
        }

    }
}
