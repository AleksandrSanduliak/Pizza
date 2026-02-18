import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

interface CardItem {
  title: string;
  subtitle: string;
  buttonProps: {
    href: string;
    text: string;
  };
}

const CardItem = ({ title, subtitle, buttonProps }: CardItem) => {
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
          {title}
        </Typography>
        <Typography variant='body2'>{subtitle}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small' href={buttonProps.href}>
          {buttonProps.text}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;
