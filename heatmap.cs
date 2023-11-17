using System;
using MongoDB.Driver;

namespace HeatmapExample
{
    class Program
    {
        static void Main(string[] args)
        {
            // MongoDB settings
            string connectionString = "mongodb://localhost:27017"; // Local connection
            string databaseName = "HeatmapDB";
            string collectionName = "UserData";

            // Creating MongoDB client
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase(databaseName);
            IMongoCollection<UserData> collection = database.GetCollection<UserData>(collectionName);

            // Simulating heatmap click data (x, y coordinates and click count)
            UserData user1 = new UserData
            {
                UserId = "123",
                SourcePage = "page1",
                DestinationPage = "page2",
                NavigationTimeSeconds = 60
            };

            UserData user2 = new UserData
            {
                UserId = "456",
                SourcePage = "page2",
                DestinationPage = "page3",
                NavigationTimeSeconds = 45
            };

            // Inserting data into the database
            collection.InsertOne(user1);
            collection.InsertOne(user2);

            Console.WriteLine("User navigation data inserted into the database.");

            // Closing the application
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }

    // Class representing user navigation data
    public class UserData
    {
        public string UserId { get; set; }
        public string SourcePage { get; set; }
        public string DestinationPage { get; set; }
        public int NavigationTimeSeconds { get; set; }
    }
}