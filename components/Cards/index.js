import {Fragment} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {trancString} from '../../utils';




const CharacterCard = ({item, handleMore})  => {
    const {name,description, comics ,stories, series,events, thumbnail: {path, extension}} = item;
  return (
    <Fragment>
    <Card sx={{ maxWidth: 445 }}>
      <CardMedia
        component="img"
        alt={'imageAlt'}
        height="140"
        image={path + '.'+ extension}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {trancString(name)}
        </Typography>
        
        <Typography variant="body2" color="text.secondary">
          {`comics ${comics.available} series ${series.available} `}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`stories ${stories.available}  events ${events.available}`}
        </Typography>
        <Button onClick={handleMore(item)}>More</Button>
      </CardContent>
    </Card>
    </Fragment>
  );
}
export default CharacterCard;