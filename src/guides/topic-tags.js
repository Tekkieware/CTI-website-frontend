import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { GeneratedTopicTag,CopyPasteTopicTag,ClickableTopicTag }  from '../pages/TagGenerator/TopicTag'

const ShowTopicTags = () => {
  return (
    <Container className='containerGray'>
      <Typography variant='h1'>Topic Tags</Typography>
      <Card className='card244'>
        <CardContent>
          <GeneratedTopicTag label='generated-topic' variant='generated' />
          <ClickableTopicTag label='clickable-topic' />
          <CopyPasteTopicTag label='copy-and-paste-topic' variant='copypaste' />
        </CardContent>
      </Card>
    </Container>
  );
};

export default ShowTopicTags;
