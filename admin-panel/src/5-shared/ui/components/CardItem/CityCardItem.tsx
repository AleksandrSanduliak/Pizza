import CardItem from './CardItem';

const CityCardItem = ({ city, name }: { city: string; name: string }) => {
  return (
    <CardItem
      title={`Город: ${name}`}
      subtitle={`key: ${city}`}
      buttonProps={{ href: city.toLowerCase(), text: 'Управление' }}
    />
  );
};

export default CityCardItem;
