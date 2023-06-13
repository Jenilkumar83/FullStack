﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPIDemo.Models;

namespace WebAPIDemo.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230407055315_ProductMigration")]
    partial class ProductMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPIDemo.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CatId")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Profile")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Qty")
                        .HasColumnType("int");

                    b.Property<int>("Rate")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CatId = 1,
                            IsActive = true,
                            Name = "Lux",
                            Qty = 10,
                            Rate = 50
                        },
                        new
                        {
                            Id = 2,
                            CatId = 1,
                            IsActive = true,
                            Name = "Dove",
                            Qty = 12,
                            Rate = 55
                        },
                        new
                        {
                            Id = 3,
                            CatId = 2,
                            IsActive = true,
                            Name = "Santoor",
                            Qty = 10,
                            Rate = 105
                        },
                        new
                        {
                            Id = 4,
                            CatId = 2,
                            IsActive = true,
                            Name = "Nyle",
                            Qty = 15,
                            Rate = 200
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
