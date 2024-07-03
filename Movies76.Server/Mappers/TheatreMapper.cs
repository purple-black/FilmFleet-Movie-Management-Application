using Movies76.Server.Dtos.Movies;
using Movies76.Server.Dtos.Theatres;
using Movies76.Server.Models;

namespace Movies76.Server.Mappers
{
    /// <summary>
    ///  Defines a static class representing a mapper for theatres.
    ///  Define a static method to convert a theatre entity to a theatre DTO.
    ///  the ToTheatreDto is called from the TheatreController and an instance of the Theatre table is passed as argument
    ///  This returns a new Dto representation of the entity with its values to the method in the Controller class.
    /// </summary>
    public static class TheatreMapper
    {
        public static TheatreDto ToTheatreDto(this Theatres theatreModel)
        {
            return new TheatreDto
            {
                Id = theatreModel.Id,
                TheatreName = theatreModel.TheatreName,
                Location = theatreModel.Location,
                
            };
        }

        /// <summary>
        ///  Defines a static class representing a mapper for creating theatres.
        ///  Define a static method to convert a theatre entity to a theatre DTO.
        ///  the ToTheatreFromCreateDto is called from the TheatreController and the new instance of the Theatres which is added
        ///  to the table is passed as argument
        ///  This returns a new Dto representation of the entity with its values to the method in the Controller class.
        /// </summary>
        public static Theatres ToTheatreFromCreateDto(this CreateTheatreRequestDto theatreDto)
        {
            return new Theatres
            {
                TheatreName = theatreDto.TheatreName,
                Location = theatreDto.Location,
            };
        }
    }
}
