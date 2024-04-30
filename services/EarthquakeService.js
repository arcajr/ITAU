import axios from 'axios';

const EarthquakeService = {
  async getEarthquakes(limit = 20) {
    const response = await axios.get(
      'https://earthquake.usgs.gov/fdsnws/event/1/query',
      {
        params: {
          format: 'geojson',
          limit: limit,
          starttime: '2020-01-01',
          endtime: '2020-01-02',
        },
      }
    );
    return response.data;
  },
};

export default EarthquakeService;