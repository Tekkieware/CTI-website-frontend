import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { GenericHeaderSection } from '../../components/';

const Contact = () => {
  const breadCrumbLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Contact', href: '/about/contact' },
  ];
  const handlePageHeight = () => {
    window.parent.scrollTo(0, 0);
  };
  return (
    <Box>
      <Box className='boxBackground'>
        <Container className='containerDefault'>
          <GenericHeaderSection
            mainTitle='Contact Us'
            breadCrumbLinks={breadCrumbLinks}
          >
            <Typography className='genSubheadTypo'>
              We would love to hear your thoughts or feedback on how we can
              improve your experience with the Civic Tech Index!
            </Typography>
          </GenericHeaderSection>
        </Container>
      </Box>
      <Card>
        <CardMedia
          component='iframe'
          title='googleContactForm'
          src='https://docs.google.com/forms/d/e/1FAIpQLSeTVA3JJdzS1Hftq5CmpGVYcn60KRXqu2ajM85NgF2vxEgghg/viewform?embedded=true'
          width='640'
          height='1179'
          frameBorder='0'
          marginHeight='0'
          marginWidth='0'
          onLoad={handlePageHeight}
        >
          Loading…
        </CardMedia>
      </Card>
    </Box>
  );
};

export default Contact;
