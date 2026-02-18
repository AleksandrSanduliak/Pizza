import CardItem from './CardItem';

const CategoryCardItem = ({
  title,
  itemsLength,
  categoryName,
}: {
  title: string;
  itemsLength: number;
  categoryName: string;
}) => {
  return (
    <CardItem
      title={`Категория: ${title}`}
      subtitle={`Объектов в категории: ${itemsLength}`}
      buttonProps={{ href: categoryName.toLowerCase(), text: 'Управление' }}
    />
  );
};

export default CategoryCardItem;
