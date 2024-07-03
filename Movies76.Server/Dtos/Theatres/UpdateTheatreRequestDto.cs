namespace Movies76.Server.Dtos.Theatres
{
    /// <summary>
    /// Defines the class representing the Dto for updating Theatre details.
    /// Two properties are defined:
    /// TheatreName for holding the name of the theatre.
    /// Location for holding the location of the theatre.
    /// </summary>
    public class UpdateTheatreRequestDto
    {
        public string TheatreName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }
}
