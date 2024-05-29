using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Tabloid.Migrations
{
    /// <inheritdoc />
    public partial class newCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c99cd945-fe78-41ba-bba0-8c08765aaa3e", "AQAAAAIAAYagAAAAENIbEAzCtLt40KJNta9EBrE16BjT/wOmTqn5AA8nc6BW/a14OUh8Y989j6k+L8wawA==", "a68cdb0c-7ece-4635-a4fd-1ff9af7d71b7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "98dce6dc-52ee-4540-bdf8-f9855e524709", "AQAAAAIAAYagAAAAEELMT2jc27I81Zl6YEVjyykRglfGiTPJYIBllUMqUHpiGKb1RpiakdrvUlKQBRmcNQ==", "a52bb3fb-3942-477b-90e1-c793021f1047" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c9014332-56cc-4851-8bf0-8b406bf817f0", "AQAAAAIAAYagAAAAECh+uwaRCkz4RENEz9Z6I7gX7OwgkthBg1gzAtsieFCsrm1P2jrOkmGIqZhe63V52w==", "ef7527a5-dfc9-413c-aa56-713879ed8be4" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0c9f40af-1321-4c53-95c6-794d1785322f", "AQAAAAIAAYagAAAAEKB+nDl/J3vhHFATifBuYromriKs8Y3P8PSSC7tmvyittyvlO+nNkzC/OgHG+qAstA==", "59b2bc0c-837b-4aed-9694-27482b8b8dde" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "844c2016-a70a-4520-b567-159f00e60c96", "AQAAAAIAAYagAAAAELim+aKso5EzGSbuR3xt+uq2CilHvrJu5UQU1r1T2uTINRbvMrF4sCJ6/1Ph5nX4oQ==", "98e4a856-c76a-4c8b-ad3c-b854cdd30203" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "e130cd22-aa1c-4512-ad9f-ea6b63352a49", "AQAAAAIAAYagAAAAEAywj09yz8XgNnZlpBcBeIETlVSTx/TKUACZpsVeGHUaL0+472LoHjt6LviAJfctMw==", "c9282250-e3eb-4aab-871b-549c3f0c3645" });

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(8962));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(8973));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(8990));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(9001));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(9006));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(9013));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "PublicationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(8711));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "PublicationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(8812));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3,
                column: "PublicationDate",
                value: new DateTime(2024, 5, 29, 9, 36, 15, 2, DateTimeKind.Local).AddTicks(8820));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d380feca-0ad9-4691-9e07-554ad95e352d", "AQAAAAIAAYagAAAAEL0Jrw6x69HklpFTCg3J9Cuqc1NKxHOo/YDBp4fPH2d1HPmPtpNGK379EOZP2AwayA==", "004b5f3c-98eb-4f24-9f38-446fb40f60ab" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a7d21fac-3b21-454a-a747-075f072d0cf3",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "6986f2a6-aa2a-4d3a-aeda-038aeee2b959", "AQAAAAIAAYagAAAAELDO0QyvxyjneXyvIxT1uXZf+zfzkJ36bz8EvOpjfwtdMmDfau5d5Cq6UgwZmygztQ==", "bc72d42b-bb91-4b63-8e8a-743231700c58" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "991672f0-f060-4e8c-87a1-3eec9ae44dc4", "AQAAAAIAAYagAAAAEG6Y88pQIMSNdi5t30MQD8gjZSamjgv2ijztnL+kPS8vxGfDDRolcRYS7n47hK/Yfw==", "8a560cbf-cbde-4fd7-a5de-ea0a4f01811e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "c37857f0-534b-42d2-8e75-51222b418108", "AQAAAAIAAYagAAAAECqM7NZWPea5w8TQnedJbHxfDodhz0pTvb4bdaBTvUfsVpRHqWjGtluBdC1zDWeWZA==", "ffeee32c-32d0-4176-b569-f62378bb71c0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "8a1374ea-64f1-481e-826c-b37f3b873685", "AQAAAAIAAYagAAAAEJul9F3tMZXHVcizWM/RJGk0606/EdOnG7okZOoit/Lwv/4WN0zUZYZxF+mqoUgXjw==", "61e60957-f304-4692-b45c-3477f43b92e1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4451bcb0-caf8-4d24-9f15-2154255113c5", "AQAAAAIAAYagAAAAEE5Dc5RBntPFIfRtHK1rrFD4vcC7ok9D5iUqHkaM7Rw0anna2Bryekja0mODmZBBBw==", "22083985-e27f-44bf-a75c-a925305a9f80" });

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2934));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2941));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2950));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2959));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2961));

            migrationBuilder.UpdateData(
                table: "Comments",
                keyColumn: "Id",
                keyValue: 6,
                column: "CreationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2963));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1,
                column: "PublicationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2796));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2,
                column: "PublicationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2882));

            migrationBuilder.UpdateData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3,
                column: "PublicationDate",
                value: new DateTime(2024, 5, 29, 10, 12, 51, 939, DateTimeKind.Local).AddTicks(2884));
        }
    }
}
