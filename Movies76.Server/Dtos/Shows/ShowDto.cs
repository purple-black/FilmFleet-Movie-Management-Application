namespace Movies76.Server.Dtos.Shows
{
    // <summary>
    /// Defines a class representing the Dto for the Show.
    /// Has four properties:
    /// Id, ShowDate, TimeSlot, Movie and Theatre are the properties.
    /// Id for holding the id of the show.
    /// ShowDate for holding the date of the show.
    /// TimeSlot for holding the show time slot.
    /// Movie and Theatre will hold the names of the movie and the theatre.
    /// </summary>
    public class ShowDto
    {
        public int Id { get; set; }
        public DateTime ShowDate { get; set; }

        public string TimeSlot { get; set; } = string.Empty;

        public string Movie { get; set; } = string.Empty;

        public string Theatre { get; set; } = string.Empty;

        public string FileName { get; set; } = string.Empty;
    }
}
