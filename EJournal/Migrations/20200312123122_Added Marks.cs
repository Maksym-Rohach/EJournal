using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EJournal.Migrations
{
    public partial class AddedMarks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MarkType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Type = table.Column<string>(maxLength: 50, nullable: false),
                    Description = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MarkType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mark",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<string>(maxLength: 3, nullable: false),
                    JournalColumnId = table.Column<int>(nullable: false),
                    MarkTypeId = table.Column<int>(nullable: false),
                    StudentId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mark", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mark_JournalColumn_JournalColumnId",
                        column: x => x.JournalColumnId,
                        principalTable: "JournalColumn",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Mark_MarkType_MarkTypeId",
                        column: x => x.MarkTypeId,
                        principalTable: "MarkType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Mark_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mark_JournalColumnId",
                table: "Mark",
                column: "JournalColumnId");

            migrationBuilder.CreateIndex(
                name: "IX_Mark_MarkTypeId",
                table: "Mark",
                column: "MarkTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Mark_StudentId",
                table: "Mark",
                column: "StudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mark");

            migrationBuilder.DropTable(
                name: "MarkType");
        }
    }
}
