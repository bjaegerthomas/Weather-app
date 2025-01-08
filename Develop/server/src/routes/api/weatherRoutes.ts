import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {

});
  // TODO: GET weather data from city name
router.get('/', async (req: Request, res: Response) => {
  const { city } = req.body;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const weatherData = await WeatherService.getCities(city);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});
  // TODO: save city to search history
router.update('/history').post(async (req: Request, res: Response) => {
  const { city } = req.body;
  try {
    const newCity = await HistoryService.addCity(city);
    res.json(newCity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});


// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  const { history } = req.body;
  try {
    const searchHistory = await HistoryService.readSearchHistory(history);
    res.json(searchHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedHistory = await HistoryService.removeCity(id);
    res.json(updatedHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from search history' });
  }
});

export default router;
