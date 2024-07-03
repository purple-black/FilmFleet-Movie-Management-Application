using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Movies76.Server.Migrations
{
    /// <inheritdoc />
    public partial class added_filename_column_in_shows_table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Shows",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Shows");
        }
    }
}
