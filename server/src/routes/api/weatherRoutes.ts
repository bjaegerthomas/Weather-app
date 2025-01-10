import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {

  try {
    const cityName = req.body.cityName;
  // TODO: GET weather data from city name
  // TODO: save city to search history
    await WeatherService.getWeatherForCity(cityName);
    const data = await HistoryService.addCity(cityName);

    res.json(data);
    }
   catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});


// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const searchHistory = await HistoryService.getCities();
    res.json(searchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ error: 'Missing city id, it is required' });
      return;
    }
    await HistoryService.removeCity(id);
    res.json('City removed from search history');

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;
