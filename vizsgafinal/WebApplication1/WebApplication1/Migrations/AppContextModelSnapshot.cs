﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication1;

#nullable disable

namespace WebApplication1.Migrations
{
    [DbContext(typeof(AppContext))]
    partial class AppContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.33")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("WebApplication1.Models.ItemModell", b =>
                {
                    b.Property<int>("itemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("price")
                        .HasColumnType("bigint");

                    b.HasKey("itemId");

                    b.ToTable("items");
                });

            modelBuilder.Entity("WebApplication1.Models.UploadOrdersModell", b =>
                {
                    b.Property<int>("uploadedOrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("uploadedItems")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("uploadedOrderTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("uploadedTakeway")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("uploadedTotalCost")
                        .HasColumnType("bigint");

                    b.Property<long>("uploadedUsedIntropoints")
                        .HasColumnType("bigint");

                    b.Property<long>("uploadedUserId")
                        .HasColumnType("bigint");

                    b.HasKey("uploadedOrderId");

                    b.ToTable("upload_orders");
                });

            modelBuilder.Entity("WebApplication1.Models.UsersModell", b =>
                {
                    b.Property<long>("uid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("intropoints")
                        .HasColumnType("bigint");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("uid");

                    b.ToTable("users");
                });
#pragma warning restore 612, 618
        }
    }
}
