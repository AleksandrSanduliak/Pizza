import { Button, Card, CardActions, CardContent, Skeleton, Typography } from '@mui/material';

const CartItemSkeleton = () => {
  return (
    <Card
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      variant='outlined'
    >
      <CardContent
        sx={{
          flex: 1, // контент занимает всю высоту карточки
        }}
      >
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          <Skeleton />
        </Typography>
        <Typography variant='body2'>
          <Skeleton />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>
          <Skeleton width={100} height={30} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItemSkeleton;
