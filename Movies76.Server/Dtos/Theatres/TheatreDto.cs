namespace Movies76.Server.Dtos.Theatres
{
    /// <summary>
    /// Defines a class representing the Dto for the Theatre.
    /// Has three properties:
    /// Id, TheatreName and Location.
    /// TheatreName for holding the name of the theatre.
    /// Location for holding the location of the theatre.
    /// </summary>
    public class TheatreDto
    {
        public int Id { get; set; }
        public string TheatreName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }
}
