using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Movies76.Server.Data;
using Movies76.Server.Dtos.Movies;
using Movies76.Server.Mappers;
using System.Net;
using System.Net.Http;
using System.Web;
using Movies76.Server.Models;
using System.Web.Http;
//using Movies76.Server.Models;


namespace Movies76.Server.Controllers
{
    /// <summary>
    /// set Route for the fetching, posting data from the Movies table
    /// </summary>
    [Route("Movies76.Server/Movies")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        /// <summary>
        /// Defines the db context for the project and making it private and read only
        /// </summary>
        //private readonly IWebHostEnvironment _environment;

        private readonly string _fileuploadPath = "C:\\Users\\aswathy.j\\source\\repos\\Movies76\\movies76.client\\src\\assets\\FileUpload\\Files";
        private readonly string _fileUploadPathOriginal = "C:\\Users\\aswathy.j\\source\\repos\\Movies76\\movies76.client\\src\\assets\\FileUpload\\OriginalPath";
        private readonly ApplicationDBContext _context;
        public MovieController(ApplicationDBContext context) {
            _context = context;
        }

        /// <summary>
        /// Get method for fetching the data from the db.
        /// Fetching from database table Movies.
        /// the method returns the variable movies which stores the content from the db table.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var movies = await _context.Movies.OrderBy(s => s.ReleaseDate).ThenBy(m => m.MovieName).ThenBy(t => t.Actors).ToListAsync();
            
            return Ok(movies);
            
        }

        /// <summary>
        /// Get method by id is for getting a specific item from the table by giving its id as the input.
        /// stored in variable movies and given to the ToMovieDto Dto and then returned.
        /// ToMovieDto is present in MovieMapper.cs
        /// returns NotFound if the movie by that id is not present.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id) {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null) {
                return NotFound();
            }

            return Ok(movie.ToMovieDto());
        }

        /// <summary>
        /// Post method for adding data to the database table Movies.
        /// content to be added is taken from the body and stored in movieModel.
        /// added to the db table and then changes are saved.
        /// </summary>
        /// <param name="movieDto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMovieRequestDto movieDto)
        {


            //var fileuploadPath = "C:\\Users\\aswathy.j\\source\\repos\\Movies76\\FileUpload\\Files";
            //var fileUploadPathOriginal = "C:\\Users\\aswathy.j\\source\\repos\\Movies76\\FileUpload\\OriginalPath";
            //var provider = new MultipartFormDataStreamProvider(fileuploadPath);


            var movieModel = movieDto.ToMovieFromCreateDto();

            
            
            var tempFile = _fileuploadPath + "\\" + movieModel.FileName;
            var orgFile = _fileUploadPathOriginal + "\\" + movieModel.FileName;
            System.IO.File.Move(tempFile, orgFile);
            await _context.Movies.AddAsync(movieModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = movieModel.Id }, movieModel.ToMovieDto());


        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {

            //var fileuploadPath = "C:\Users\aswathy.j\source\repos\Movies76\movies76.client\src\assets\FileUpload\\Files";
            //var fileUploadPathOriginal = "C:\\Users\\aswathy.j\\source\\repos\\Movies76\\movies76.client\\src\\assets\\FileUpload\\OriginalPath";

            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            if (!Directory.Exists(_fileuploadPath))
            {
                Directory.CreateDirectory(_fileuploadPath);
            }

            var filePath = Path.Combine(_fileuploadPath, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(filePath);
        }

        
        /////////////


        /// <summary>
        /// Put method for changing a specific item by its Id.
        /// The entry with that particular id is fetched from the table and assigned to movieModel.
        /// The movieModel is modified using the new values. Then changes are saved. 
        /// and returns an HTTP 200 (OK) response with the data of a movie entity converted to a Data Transfer Object (DTO)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updateDto"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMovieRequestDto updateDto)
        {
            var movieModel = await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);

            if (movieModel == null)
            {
                return NotFound();
            }

            movieModel.MovieName = updateDto.MovieName;
            movieModel.Actors = updateDto.Actors;
            movieModel.ReleaseDate = updateDto.ReleaseDate;

            await _context.SaveChangesAsync();

            return Ok(movieModel.ToMovieDto());
        }

        [HttpDelete]
        [Route("{id}")]

        public async Task<ActionResult> Delete([FromRoute] int id)
        {
            var movieModel = await _context.Movies.FirstOrDefaultAsync(x => x.Id == id);

            if (movieModel == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movieModel);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }

}


/*
var movieModel = movieDto.ToMovieFromCreateDto();
await _context.Movies.AddAsync(movieModel);
await _context.SaveChangesAsync();
return CreatedAtAction(nameof(GetById), new { id = movieModel.Id }, movieModel.ToMovieDto());
*/