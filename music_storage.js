const mongoose = require('mongoose');

// Artist model
const artistSchema = new mongoose.Schema({
  name: String,
  // Other artist details if needed
});

const Artist = mongoose.model('Artist', artistSchema);

// Album model
const albumSchema = new mongoose.Schema({
  title: String,
  description: String,
  cover: String, // Path to the album cover image
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  },
  songs: [{
    title: String,
    duration: Number, // Duration of the song in seconds, for example
    // Other song details if needed
  }],
});

const Album = mongoose.model('Album', albumSchema);

module.exports = { Artist, Album };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { Artist, Album } = require('./models');

// Assuming you have the artist ID
const artistId = 'ARTIST_ID'; 

// Create a new album
const newAlbum = new Album({
  title: 'Album Title',
  description: 'Album Description',
  cover: 'path/to/image.jpg',
  artist: artistId,
  songs: [
    {
      title: 'Song Name 1',
      duration: 240, // For example, 240 seconds = 4 minutes
    },
    {
      title: 'Song Name 2',
      duration: 180, // 180 seconds = 3 minutes
    },
    // Add as many songs as you want
  ],
});

// Save the album to the database
newAlbum.save()
  .then(savedAlbum => {
    console.log('Album saved:', savedAlbum);
  })
  .catch(error => {
    console.error('Error saving album:', error);
  });
