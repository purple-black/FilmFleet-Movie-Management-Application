namespace Movies76.Server.Dtos.Shows
{
    /// <summary>
    /// Defines the class representing the Dto for updating a show.
    /// Three properties are defined:
    /// Id for holding the id of the show.
    /// ShowDate for holding the date of the show.
    /// TimeSlot for holding the show time slot.
    /// Movie and Theatre will hold the names of the movie and the theatre.
    /// </summary>
    public class UpdateShowRequestDto
    {
        public DateTime ShowDate { get; set; }

        public string TimeSlot { get; set; } = string.Empty;

        public string Movie { get; set; } = string.Empty;

        public string Theatre { get; set; } = string.Empty;

        public string FileName { get; set; } = string.Empty;
    }
}
