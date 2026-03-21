import { useDeleteGlobalProducts } from '@shared/api/GlobalProduct';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridActionsCell,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router';
import { MainProductItem } from '@/5-shared/interface/global-product-interface';

interface ActionHandlers {
  editProduct: (id: number) => void;
  deleteProduct: ({ id, category }: { id: number; category: string }) => void;
}

const ActionHandlersContext = React.createContext<ActionHandlers>({
  editProduct: () => {},
  deleteProduct: () => {},
});

const SettingsButton = (props: GridRenderCellParams) => {
  const { editProduct } = React.useContext(ActionHandlersContext);
  console.log('props', props);
  return (
    <GridActionsCell {...props}>
      <GridActionsCellItem
        icon={<EditIcon />}
        label='Edit'
        onClick={() => editProduct(props.id as number)}
      />
    </GridActionsCell>
  );
};
const DeleteButton = (props: GridRenderCellParams) => {
  const { deleteProduct } = React.useContext(ActionHandlersContext);
  return (
    <GridActionsCell {...props}>
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label='Delete'
        onClick={() => deleteProduct({ id: props.id as number, category: props.row.category })}
      />
    </GridActionsCell>
  );
};

const columns: GridColDef[] = [
  {
    field: 'imageUrl',
    headerName: 'Картинка',
    width: 125,
    renderCell: (props) => {
      return (
        <img
          width={100}
          height={100}
          src={props.value}
          alt={props.api.getCellValue(props.id, 'title')}
        />
      );
    },
  },
  { field: 'title', headerName: 'Название', width: 150 },
  { field: 'caption', headerName: 'Caption', width: 150 },
  { field: 'desc', headerName: 'Desc', flex: 1 },
  {
    field: 'settings',
    headerName: 'Настройки',
    renderCell: (props) => <SettingsButton {...props} />,
  },
  {
    field: 'delete',
    headerName: 'Удалить',
    renderCell: (props) => {
      console.log('props', props);
      return <DeleteButton {...props} />;
    },
  },
];

interface CategoryTable {
  products: MainProductItem[];
  category: string;
}
const CategoryTable = ({ products, category }: CategoryTable) => {
  const navigate = useNavigate();
  const { mutate: mutationFn } = useDeleteGlobalProducts({ queryKey: category });

  const editProduct = React.useCallback((id: number) => {
    console.log('id', id);
    navigate(String(id));
  }, []);

  const deleteProduct = React.useCallback(({ id, category }: { id: number; category: string }) => {
    console.log('delete product');
    mutationFn({ id, category });
  }, []);

  const actionHandlers = React.useMemo<ActionHandlers>(
    () => ({
      editProduct,
      deleteProduct,
    }),
    [editProduct, deleteProduct]
  );
  return (
    <Box sx={{ width: '100%' }}>
      <ActionHandlersContext.Provider value={actionHandlers}>
        <DataGrid
          sx={{
            display: 'grid',
            gridTemplateRows: 'auto 1f auto',
          }}
          rowHeight={100}
          rows={products}
          columns={columns}
        />
      </ActionHandlersContext.Provider>
    </Box>
  );
};

export default CategoryTable;
