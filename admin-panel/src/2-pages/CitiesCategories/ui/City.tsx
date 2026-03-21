import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Box,
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useGetGlobalCategoriesQuery, useGetGlobalCategoryQuery } from '@shared/api/Category';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useCreateLocalCategoryMutation, useGetCityQuery } from '../api/api';
import DndTable from './DndTable';
import CreateLocalProductModal from '@/2-pages/CitiesCategories/ui/LocalProduct/create-local-product-modal';

const CatalogItem = ({ category, city, cityId }) => {
  console.log('category ', category);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [globalProduct, setGlobalProduct] = useState();
  const { data: categoryData, refetch } = useGetGlobalCategoryQuery({
    category: category.category,
    enabled: false,
  });

  console.log('globalProduct', globalProduct);
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Typography>category title: {category.categoryTitle}</Typography>
        <Tooltip title='создать продукт в категории'>
          <Fab
            onClick={() => {
              console.log('onClick');
            }}
            size='small'
            color='secondary'
            aria-label='add'
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        {/* {category && category.products && category?.products?.length > 0 && ( */}
        <Box
          onClick={() => {
            console.log('click1');
            refetch();
          }}
        >
          <Autocomplete
            id='global-products'
            value={globalProduct}
            onChange={(event, newValue) => {
              setGlobalProduct(newValue);
              setIsOpenModal(true);
            }}
            options={categoryData?.products || []}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField sx={{ width: '250px' }} {...params} label='Глобальные продукты' />
            )}
          />
        </Box>
        {/* )} */}
      </Box>
      {globalProduct && (
        <CreateLocalProductModal
          isOpenModal={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          category={category}
          city={city}
          id={globalProduct.id}
        />
      )}

      <DndTable data={category} city={city} cityId={cityId} />
    </Box>
  );
};

const CityCategories = ({ city }: { city: string }) => {
  const { data: cityData } = useGetCityQuery(city);
  console.log('data cityData', cityData);
  if (!cityData)
    return (
      <Box>Не получены данные для города {city}. Создайте категории для дальнейшей работы.</Box>
    );
  const cityCategories = cityData.categories;

  return cityCategories.map((category) => (
    <CatalogItem key={category.category} category={category} city={city} cityId={cityData.id} />
  ));
};

const GlobalCategories = ({ city }: { city: string }) => {
  const [category, setCategory] = React.useState('');
  const { data: productCategories, isLoading, isError, error } = useGetGlobalCategoriesQuery();
  const { mutate: mutationFn } = useCreateLocalCategoryMutation(city);
  // console.log('citydata', cityData);
  console.log('productCategories', productCategories);

  // if (!productCategories || productCategories?.categories?.length === 0)
  //   return <Box>Не получены данные по категориям. Повторите попытку позже.</Box>;

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  console.log('category', category);
  const createLocalCategory = () => mutationFn({ city: city, category: category });

  return (
    <Box>
      <Box sx={{ width: 450, display: 'flex', gap: 4 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Добавить категорию в каталог</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={category}
            label='Добавить категорию в каталог'
            onChange={handleChange}
          >
            {productCategories &&
              productCategories.categories.map((item) => (
                <MenuItem value={item.category}>{item.categoryTitle}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button onClick={createLocalCategory}>Добавить</Button>
      </Box>
    </Box>
  );
};

const City = () => {
  const params = useParams();
  console.log('params', params);
  if (!params.city) {
    console.error('Не определен город');
    return <div>Город не определен</div>;
  }
  const { city } = params;

  return (
    <div>
      <GlobalCategories city={city} />
      <CityCategories city={city} />
    </div>
  );
};

export default City;
