namespace Movies76.Server.Dtos.Shows
{
    /// <summary>
    /// Defines the class representing the Dto for creating a show.
    /// Three properties are defined:
    /// ShowDate for holding the date of the show.
    /// TimeSlot for holding the show time slot.
    /// Movie and Theatre will hold the names of the movie and the theatre.
    /// </summary>
    public class CreateShowRequestDto
    {
        public DateTime ShowDate { get; set; }

        public string TimeSlot { get; set; } = string.Empty;

        public string Movie { get; set; } = string.Empty;

        public string Theatre { get; set; } = string.Empty;

        public string FileName { get; set; } = string.Empty;

    }
}
