using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Movies76.Server.Data;
using Movies76.Server.Dtos.Theatres;
using Movies76.Server.Mappers;

namespace Movies76.Server.Controllers
{
    /// <summary>
    /// specifies the route for all endpoints within the controller.
    /// The TheatreController class inherits from ControllerBase.
    /// The context - an instance of ApplicationDbContext is passed on to the TheatreController and assigned to private _context.
    /// </summary>
    [Route("Movies76.Server/Theatres")]
    [ApiController]
    public class TheatreController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public TheatreController(ApplicationDBContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Http Get method for fetching the data from the Database.
        /// The contents in the Theatres table of the db is stored in the variable theatres. 
        /// and is returned with an Ok method.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var theatres = await _context.Theatres.OrderBy(s => s.TheatreName).ThenBy(m => m.Location).ToListAsync();
            return Ok(theatres);
        }

        /// <summary>
        /// Http Get by id is for getting a particular item from the table,
        /// when its id is given as input. The contents corresponding to that d is found using the FindAsync method
        /// and stored in theatre.
        /// if an item with that id is not present, notFound is returned.
        /// if it is present, returns a successful response (HTTP 200),
        /// containing the DTO representation of the theatre entity instance.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var theatre = await _context.Theatres.FindAsync(id);

            if (theatre == null)
            {
                return NotFound();
            }

            return Ok(theatre.ToTheatreDto());
        }


        /// <summary>
        /// Http Post saves the data given by users to the database.
        /// The contents from the body, theatreDto is given to the ToTheatreFromCreateDto method in the TheatreMapper class,
        /// which returns the content after mapping and is stored in variable theatreModel.
        /// 
        /// The theatreModel is added to the Theatres table. Changes are saved.
        /// theatreModel is given to ToTheatreDto method in TheatreMapper class,
        /// which returns the content after mapping.
        /// 
        /// CreatedAtAction method -> used to return a response indicating that a resource has been successfully created
        /// </summary>
        /// <param name="theatreDto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTheatreRequestDto theatreDto)
        {
            var theatreModel = theatreDto.ToTheatreFromCreateDto();
            await _context.Theatres.AddAsync(theatreModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = theatreModel.Id }, theatreModel.ToTheatreDto());
        }


        /// <summary>
        /// Http put is for updating a particular entry in the table by giving id as in the input.
        /// The changes we make in the values will be saved for that entry corresponding to the id.
        /// 
        /// First we find if the entry with that id is present in the table using the FirstOrDefaultMethod.
        /// If not present, returns NotFound.
        /// If it is present, it is stored in the variable theatreModel. This variable is then modified using the new values.
        /// The changes are made in the db table.
        ///  and returns an HTTP 200 (OK) response with the data of a theatre entity converted to a Data Transfer Object (DTO)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatetheatreDto"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateTheatreRequestDto updatetheatreDto)
        {
            var theatreModel = await _context.Theatres.FirstOrDefaultAsync(x => x.Id == id);

            if (theatreModel == null)
            {
                return NotFound();
            }

            theatreModel.TheatreName = updatetheatreDto.TheatreName;
            theatreModel.Location = updatetheatreDto.Location;
            

            await _context.SaveChangesAsync();

            return Ok(theatreModel.ToTheatreDto());
        }


        [HttpDelete]
        [Route("{id}")]

        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var theatreModel = await _context.Theatres.FirstOrDefaultAsync(x => x.Id == id);

            if (theatreModel == null)
            {
                return NotFound();
            }

            _context.Theatres.Remove(theatreModel);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}
