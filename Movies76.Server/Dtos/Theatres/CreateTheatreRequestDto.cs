namespace Movies76.Server.Dtos.Theatres
{
    /// <summary>
    /// Defines the class representing the Dto for creating a theatre.
    /// There are two classes:
    /// TheatreName for holding the name of the theatre.
    /// Location for holding the location of the theatre. 
    /// </summary>
    public class CreateTheatreRequestDto
    {
        public string TheatreName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }
}
