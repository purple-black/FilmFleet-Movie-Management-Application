using Movies76.Server.Dtos.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Movies76.Server.Models;
using Movies76.Server.Dtos.Shows;


namespace Movies76.Server.Mappers
{
    /// <summary>
    ///  Defines a static class representing a mapper for shows.
    ///  Define a static method to convert a show entity to a show DTO.
    ///  the ToShowDto is called from the ShowController and an instance of the Shows table is passed as argument
    ///  This returns a new Dto representation of the entity with its values to the method in the Controller class.
    /// </summary>
    public static class ShowMapper
    {
        public static ShowDto ToShowDto(this Shows showModel)
        {
            return new ShowDto
            {
                Id = showModel.Id,
                ShowDate = showModel.ShowDate,
                TimeSlot = showModel.TimeSlot,
                Movie = showModel.Movie,
                Theatre = showModel.Theatre,
                FileName = showModel.FileName
            };
        }

        /// <summary>
        ///  Defines a static class representing a mapper for creating shows.
        ///  Define a static method to convert a show entity to a show DTO.
        ///  the ToShowFromCreateDto is called from the ShowController and the new instance of the Shows which is added
        ///  to the table is passed as argument
        ///  This returns a new Dto representation of the entity with its values to the method in the Controller class.
        /// </summary>
        public static Shows ToShowFromCreateDto(this CreateShowRequestDto showDto)
        {
            return new Shows
            {
                ShowDate = showDto.ShowDate,
                TimeSlot = showDto.TimeSlot,
                Movie = showDto.Movie,
                Theatre = showDto.Theatre,
                FileName = showDto.FileName
            };
        }
    }
}
