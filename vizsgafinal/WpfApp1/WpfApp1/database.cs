using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using MySql.Data.MySqlClient;
using K4os.Compression.LZ4.Streams.Adapters;
using System.Linq.Expressions;
using System.Data.SqlClient;
using System.Windows;
using System.IO.Packaging;


namespace WpfApp1
{
    internal class database
    {
        private readonly string ConnectionString = "server=localhost;database=introcafe;uid=root;pwd=;charset=utf8;";
        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public DataTable GetOrders()
        {
            DataTable tabla = new DataTable();
            using (MySqlConnection con = GetConnection())
            {
                try
                {
                    con.Open();
                    string lekerdezes = "SELECT * FROM introcafe.upload_orders ORDER BY uploadedOrderTime ASC";
                    using (MySqlCommand cmd = new MySqlCommand(lekerdezes, con))
                    using (MySqlDataAdapter adat = new MySqlDataAdapter(cmd))
                    {
                        adat.Fill(tabla);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            return tabla;
        }

        public void RendelesTorles(int elmentettid)
        {
            using (MySqlConnection con = GetConnection())
            {
                try
                {
                    con.Open();
                    string getOrderDetailsQuery = $"SELECT uploadedUserId, uploadedTotalCost FROM introcafe.upload_orders WHERE uploadedOrderId = {elmentettid}";
                    int uploadedUserId = -1;
                    int uploadedTotalCost = 0;

                    using (MySqlCommand getOrderDetailsCmd = new MySqlCommand(getOrderDetailsQuery, con))
                    {
                        getOrderDetailsCmd.Parameters.AddWithValue("@elmentettid", elmentettid);
                        using (MySqlDataReader reader = getOrderDetailsCmd.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                uploadedUserId = Convert.ToInt32(reader["uploadedUserId"]);
                                uploadedTotalCost = Convert.ToInt32(reader["uploadedTotalCost"]);
                            }
                        }
                    }

                    if (uploadedUserId != -1)
                    {
                        int pointsToAdd = (int)Math.Ceiling(uploadedTotalCost / 10.0);
                        string updatePointsQuery = $"UPDATE introcafe.users SET intropoints = intropoints + {pointsToAdd} WHERE uid = {uploadedUserId}";

                        using (MySqlCommand updatePointsCmd = new MySqlCommand(updatePointsQuery, con))
                        {
                            updatePointsCmd.Parameters.AddWithValue("@pointsToAdd", pointsToAdd);
                            updatePointsCmd.Parameters.AddWithValue("@uploadedUserId", uploadedUserId);
                            updatePointsCmd.ExecuteNonQuery();
                        }
                    }
                    string deleteQuery = $"DELETE FROM introcafe.upload_orders WHERE uploadedOrderId = {elmentettid}";
                    using (MySqlCommand deleteCmd = new MySqlCommand(deleteQuery, con))
                    {
                        deleteCmd.Parameters.AddWithValue("@elmentettid", elmentettid);
                        int rowsAffected = deleteCmd.ExecuteNonQuery();
                        Console.WriteLine($"{rowsAffected} rows deleted.");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }



        public DataTable GetItems()
        {
            DataTable tabla = new DataTable();
            using (MySqlConnection con = GetConnection())
            {
                try
                {
                    con.Open();
                    string lekerdezes = "SELECT * FROM introcafe.items";
                    using (MySqlCommand cmd = new MySqlCommand(lekerdezes, con))
                    using (MySqlDataAdapter adat = new MySqlDataAdapter(cmd))
                    {
                        adat.Fill(tabla);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            return tabla;
        }


        public DataTable SearchItems(string searchTerm)
        {
            DataTable tabla = new DataTable();
            using (MySqlConnection con = GetConnection())
            {
                try
                {
                    con.Open();
                    string lekerdezes = "SELECT * FROM introcafe.items WHERE name LIKE @searchTerm";
                    using (MySqlCommand cmd = new MySqlCommand(lekerdezes, con))
                    {
                        cmd.Parameters.AddWithValue("@searchTerm", "%" + searchTerm + "%");
                        using (MySqlDataAdapter adat = new MySqlDataAdapter(cmd))
                        {
                            adat.Fill(tabla);
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            return tabla;
        }

        public void AdatbazisbaFelvetel(string kuldeslista, int totalCost, string fogyasztastipus)
        {
            using (MySqlConnection con = GetConnection())
            {
                    con.Open();
                    string query = $"INSERT INTO introcafe.upload_orders (uploadedItems, uploadedTakeway," +
                        $"uploadedTotalCost) VALUES ('{kuldeslista}','{fogyasztastipus}',{totalCost})";

                    using (MySqlCommand cmd = new MySqlCommand(query, con))
                    {
                        int rowsAffected = cmd.ExecuteNonQuery();
                        Console.WriteLine($"{rowsAffected} rows deleted.");
                    }
            }
        }
    }
}
