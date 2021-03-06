﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Octogami.LunchTracker.Api.Migrations
{
    public partial class AddDateToLunch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                schema: "lt",
                table: "Lunch",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                schema: "lt",
                table: "Lunch");
        }
    }
}
