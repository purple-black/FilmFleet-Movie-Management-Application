using Microsoft.EntityFrameworkCore;
using Movies76.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Movies76.Server.Data
{
    /// <summary>
    /// Adding DbContext for the application.
    /// ApplicationDBContext inherits from DbContext provided by Entity Framework Core.
    /// The constructor public ApplicationDBContext() initializes the class and the dbContextOptions are passed.
    /// which is an instance of DbContextOptions - provides configuration options for the DbContext.
    /// 
    /// DbSet<Movies> is a collection of Movies entities in the database
    /// DbSet<Theatres> is a collection of Theatres entities in the database.
    /// DbSet<Shows> is a collection of Shows entities in the database.
    /// Three tables Movies, Theatres and Shows will be created in the db through code first approach.
    /// </summary>
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Movies> Movies { get; set; }
        public DbSet<Theatres> Theatres { get; set; }

        public DbSet<Shows> Shows { get; set; }
    }
}
