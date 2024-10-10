import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/movies', async (req, res) => {
  const category = req.query.category || 'upcoming'; // Default to 'upcoming' if no category is provided
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;

  const options = { 
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTHORIZATION// Replace with your actual TMDB API key
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data && data.results) {  // Check if `data.results` exists
      res.json(data.results); // Send the data to the frontend
    } else {
      // Handle case where the data or results is missing
      console.error('No results found');
      res.status(404).json({ error: 'No results found' });
    }

  } catch (error) {
    console.error('Error fetching data from API:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to fetch data from API' });
    }
  }
});

app.get('/movie/:id', async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const options = { 
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.AUTHORIZATION // Replace with a valid TMDB API key
    }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(`TMDB API responded with status: ${response.status}`);
      return res.status(response.status).json({ error: `Failed to fetch data from TMDB: ${response.statusText}` });
    }

    const data = await response.json();

    res.json(data); // Send the movie details to the frontend

  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
