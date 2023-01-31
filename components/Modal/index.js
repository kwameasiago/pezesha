import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicTable from '../Table';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow: 'scroll',
  p: 4,
};

const BasicModal = ({open, handleClose,content }) => {
    const {
        events: {items:eventsItems}, 
        comics: {items: comicsItems}, 
        stories: {items: storyItems}, 
        series: {items: seriesItems}
    } = content;
    if(content === {}){
        return
    }
    const keys = (arr) => {
        if(!arr){
            return []
        }
        if(arr.length == 0){
            return []
        }
        return Object.keys(arr[0])
    }

    console.log(keys(comicsItems))
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {content.name}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Events
          </Typography>
          <BasicTable header={keys(eventsItems)} data={eventsItems} />

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comics
          </Typography>
          <BasicTable header={keys(comicsItems)} data={comicsItems} />


          <Typography id="modal-modal-title" variant="h6" component="h2">
            Story
          </Typography>
          <BasicTable header={keys(storyItems)} data={storyItems} />

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Series
          </Typography>
          <BasicTable header={keys(seriesItems)} data={seriesItems} />
        </Box>
      </Modal>
    </div>
  )};

  export default BasicModal;