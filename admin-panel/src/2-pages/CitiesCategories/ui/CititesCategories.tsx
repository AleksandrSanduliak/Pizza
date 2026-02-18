import CityCardItem from '@/5-shared/ui/components/CardItem/CityCardItem';
import { Box } from '@mui/material';
import { useGetCitiesListQuery } from '../api/api';
import CreateCityModal from './CreteCity/CreateCityModal';

export type CityFormFields = {
  city: string;
  name: string;
  url: string;
  isActive: boolean;
};

const CitiesList = () => {
  const { data } = useGetCitiesListQuery();
  return (
    <Box sx={{ mt: 3 }}>
      <Box>Список городов</Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 2,
          mt: 2,
        }}
      >
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <Box key={item.city} sx={{ width: 200 }}>
              <CityCardItem city={item.city} name={item.name} />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

const CityList = () => {
  return (
    <>
      {/* 1 - создать город <br></br> */}
      <CreateCityModal />

      {/* 2 - список городов <br></br>каталог по городу с drag&drop по категориям */}
      <CitiesList />
    </>
  );
};

const CititesCategories = () => {
  return (
    <div>
      <CityList />
    </div>
  );
};

export default CititesCategories;
