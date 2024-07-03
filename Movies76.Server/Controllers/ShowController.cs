using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Movies76.Server.Data;
using Movies76.Server.Dtos.Movies;
using Movies76.Server.Dtos.Shows;
using Movies76.Server.Mappers;
using Movies76.Server.Models;
//using Movies76.Server.Models;


namespace Movies76.Server.Controllers
{
    /// <summary>
    /// set Route for the fetching, posting data from the Movies table
    /// </summary>
    [Route("Movies76.Server/Shows")]
    [ApiController]
    public class ShowController : ControllerBase
    {
        /// <summary>
        /// Defines the db context for the project and making it private and read only
        /// </summary>
        private readonly ApplicationDBContext _context;
        public ShowController(ApplicationDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get method for fetching the data from the db.
        /// Fetching from database table Shows.
        /// the method returns the variable shows which stores the content from the db table.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var shows = await _context.Shows.OrderBy(s => s.ShowDate).ThenBy(m => m.TimeSlot).ThenBy(m => m.Movie).ThenBy(t => t.Theatre).ToListAsync();
            return Ok(shows);

        }

        /// <summary>
        /// Parse Show Time
        /// </summary>
        /// <param name="showTime"></param>
        /// <returns></returns>
        private static TimeSpan ParseShowTime(Shows shows)
        {
            DateTime parsedTime = DateTime.Parse(shows.TimeSlot);
            int hour = parsedTime.Hour;
            if (shows.TimeSlot.EndsWith("pm") && hour != 12)
            {
                hour += 12;  // Adjust for PM hours
            }
            //Console.Write(new TimeSpan(hour, parsedTime.Minute, 0));
            return new TimeSpan(hour, parsedTime.Minute, 0);//.ToString("hh:mm");
        }
        

        /// <summary>
        /// Get method by id is for getting a specific item from the table by giving its id as the input.
        /// stored in variable show and given to the ToShowDto Dto and then returned.
        /// ToShowDto is present in ShowMapper.cs
        /// returns NotFound if the show by that id is not present.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var show = await _context.Shows.FindAsync(id);

            if (show == null)
            {
                return NotFound();
            }

            return Ok(show.ToShowDto());
        }

        /// <summary>
        /// Post method for adding data to the database table Shows.
        /// content to be added is taken from the body and stored in showModel.
        /// added to the db table and then changes are saved.
        /// </summary>
        /// <param name="movieDto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateShowRequestDto showDto)
        {
            var showModel = showDto.ToShowFromCreateDto();


            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.MovieName == showDto.Movie);
            var showMovieImage = movie.FileName;
            showModel.FileName = showMovieImage;

            await _context.Shows.AddAsync(showModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = showModel.Id }, showModel.ToShowDto());
        }


        /// <summary>
        /// Put method for changing a specific item by its Id.
        /// The entry with that particular id is fetched from the table and assigned to showModel.
        /// The showModel is modified using the new values. Then changes are saved. 
        /// and returns an HTTP 200 (OK) response with the data of a show entity converted to a Data Transfer Object (DTO)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updateDto"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateShowRequestDto updateShowDto)
        {
            var showModel = await _context.Shows.FirstOrDefaultAsync(x => x.Id == id);

            if (showModel == null)
            {
                return NotFound();
            }

            showModel.ShowDate = updateShowDto.ShowDate;
            showModel.TimeSlot = updateShowDto.TimeSlot;
            showModel.Movie = updateShowDto.Movie;
            showModel.Theatre = updateShowDto.Theatre;

            await _context.SaveChangesAsync();

            return Ok(showModel.ToShowDto());
        }

        [HttpDelete]
        [Route("{id}")]

        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var showModel = await _context.Shows.FirstOrDefaultAsync(x => x.Id == id);

            if (showModel == null)
            {
                return NotFound();
            }

            _context.Shows.Remove(showModel);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
