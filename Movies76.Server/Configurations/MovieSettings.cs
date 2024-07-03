namespace Movies76.Server.Configurations
{
    public class MovieSettings
    {
        public int MaxMovieNameLength { get; set; }
        public int MaxActorNameLength { get; set; }

        //public int MaxDateLength { get; set; }

        public int MaxTheatreNameLength { get; set; }
        public int MaxLocationLength { get; set; }

    }

    public static class ConfigurationExtensions
    {
        public static MovieSettings GetMovieSettings(this IConfiguration configuration)
        {
            var movieSettings = new MovieSettings();
            configuration.GetSection("MovieSettings").Bind(movieSettings);
            return movieSettings;
        }

    }
}
