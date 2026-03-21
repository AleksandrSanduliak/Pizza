import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useDeleteLocalProductMutation } from '../api/api';
import EditLocalProductModal from '@/2-pages/CitiesCategories/ui/LocalProduct/edit-local-product-modal';

export function SortableItem({ item, city, category, cityId, handleDeleteItem }) {
  // console.log('item', item);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  });
  const { mutate: mutationFn } = useDeleteLocalProductMutation(city);
  const deleteFn = () => {
    mutationFn({ productId: item.id, category, cityId });
    handleDeleteItem(item.id);
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Add some basic styling for better visualization
    padding: '10px',
    margin: '5px',
    border: '1px solid gray',
    cursor: 'grab',
    backgroundColor: '#f9f9f9',
    width: '150px',
    height: '100%',
  };

  return (
    <div style={style}>
      <Box sx={{ cursor: 'pointer' }} onClick={() => setIsOpenModal(true)}>
        <EditIcon />
      </Box>
      {isOpenModal && (
        <EditLocalProductModal
          item={item}
          isOpenModal={isOpenModal}
          closeModal={() => setIsOpenModal(false)}
          deleteFn={deleteFn}
        />
      )}
      <Box ref={setNodeRef} {...listeners} {...attributes}>
        <img onClick={() => console.log('onclick')} width={100} height={100} src={item.imageUrl} />
        {item.title}
      </Box>
    </div>
  );
}

const DndTable = ({ data, city, cityId }) => {
  const [items, setItems] = useState(data.products.toSorted((a, b) => a.order - b.order));
  console.log('DndTable data', data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        console.log('moveItems items', items);
        console.log('moveItems active.id', active.id);
        console.log('moveItems over.id', over.id);
        console.log('moveItems oldIndex', oldIndex);
        console.log('moveItems newIndex', newIndex);
        const moveItems = arrayMove(items, oldIndex, newIndex);
        console.log('moveItems', moveItems);
        return moveItems;
      });
    }
  }
  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <SortableContext items={items.map((item) => item.id)} strategy={rectSwappingStrategy}>
          {items.length > 0 &&
            items.map((item) => (
              <Box onClick={(e) => console.log('event', e)}>
                <SortableItem
                  key={item.id}
                  item={item}
                  city={city}
                  category={data.category}
                  cityId={cityId}
                  handleDeleteItem={handleDeleteItem}
                />
              </Box>
            ))}
        </SortableContext>
      </Box>
    </DndContext>
  );
};

export default DndTable;
