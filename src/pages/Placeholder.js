import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { NavBreadcrumbs } from '../components';
import AddOrgModal from '../components/AddOrgModal';

const Placeholder = () => {
  const crumbs = [
    { name: 'Home', href: '/home' },
    { name: 'Placeholder', href: '/blank' },
  ];

  return (
    <Container className='containerDefault'>
      <NavBreadcrumbs crumbs={crumbs} />
      <Card className='card244'>
        <CardContent>
          <AddOrgModal />
          <Typography variant='h1'>
            Heading
          </Typography>
          <Typography variant='h6'>
            Subheading
          </Typography>
          <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Placeholder;
