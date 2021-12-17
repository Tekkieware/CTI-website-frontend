import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '../components/common/Link';
import Text from '../components/common/Text';

const useStyles = makeStyles((theme) => ({
  stylesInUse: {
    '& .MuiPaper-root': {
      marginBottom: 32,
    },
  },
}));

// See https://material-ui.com/components/typography/
const ShowTypography = () => {
  const classes = useStyles();

  return (
    <Container className={classes.stylesInUse}>
      <Paper elevation={2}>
        <Typography variant='h2'>Typography</Typography>
        <Typography variant='body1' gutterBottom>
          This guide has information on font variants for titles and body copy.
          See the <q>Typography</q> section of the <q>Design System</q> page in{' '}
          <Link to='https://www.figma.com/file/EFoSuj1b9G4aZ7bN8OX8tf/CivicTechIndex---Master-Design-File?node-id=1329%3A11944'>
            Figma
          </Link>{' '}
          for more infromation.
        </Typography>
        <Typography variant='h3'>Material-UI&#8217;s Typography</Typography>
        <Typography variant='body1' gutterBottom>
          We have been using variants <b>h1</b> — <b>h6</b>, <b>body1</b> &amp;{' '}
          <b>body2</b> in the <b>Typography</b> component of Material-UI.
        </Typography>
        <Typography variant='h3'>Text</Typography>
        <Typography variant='h6'>New as of September, 2021</Typography>
        <Typography variant='body1' gutterBottom>
          Introducing our new <b>Text</b> component. This allows us to use
          additional variant <b>body0</b>. This new variant, plus different
          styling for variants <b>body1</b> and <b>body2</b>, are now available
          with the <b>Text</b> component. Going forward, use <b>Text</b> for
          these variants.
        </Typography>
        <Typography variant='body1' gutterBottom>
          <b>Text</b> has another difference: font size become one size smaller
          on smaller screen widths.
        </Typography>
        <Typography variant='body1' gutterBottom>
          The introduction of <b>Text</b> as a companion to <b>Typography</b>{' '}
          (instead of a replacement), allows old code to remain valid while we
          start being more consistent in our font use from here on out.
        </Typography>
        <Typography variant='h3'>Usage</Typography>
        <Typography variant='body1' gutterBottom>
          <b>Text</b> has an identical signature to <b>Typography</b>. Basic
          usage in components:
        </Typography>
        <pre>
          import Text from &apos;[path]/components/common/Text&apos;;
          <br />
          ...
          <br />
          &lt;Text variant=&apos;<i>variant</i>&apos;&gt;...&lt;/Text&gt;
        </pre>
      </Paper>

      <Paper elevation={4} className='containerGray'>
        <Text variant='h1' color='primary'>
          h1. Title1 (3rem/48px)
        </Text>
        <Typography variant='h2' color='textPrimary'>
          h2. Title2 (2.5rem/40px)
        </Typography>
        <Typography variant='h3' color='secondary'>
          h3. Title3 (2rem/32px)
        </Typography>
        <Typography variant='h4' color='textSecondary'>
          h4. Title4 (1.75rem/28px)
        </Typography>
        <Typography variant='h5' color='error'>
          h5. Title5 (1.5rem/24px)
        </Typography>
        <Typography variant='h6' color='primary'>
          h6. Title6 (1.25rem/20px)
        </Typography>
      </Paper>

      <Paper elevation={4} className='containerGray'>
        <Text variant='body0'gutterBottom>
          <q>body0.</q> (1.125rem/18px){' '}
          <Link to='/guides/type-standards'>Lorem ipsum</Link> dolor sit amet,
          consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
          quam beatae rerum inventore consectetur, neque doloribus, cupiditate
          numquam dignissimos laborum fugiat deleniti? (lg-copy)
        </Text>
        <Text variant='body1'gutterBottom>
          body1. (1rem/16px){' '}
          <Link href='/guides/type-standards'>Lorem ipsum</Link> dolor sit amet,
          consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
          quam beatae rerum inventore consectetur, neque doloribus, cupiditate
          numquam dignissimos laborum fugiat deleniti? (md-copy)
        </Text>
        <Text variant='body2' gutterBottom>
          body2. (0.875rem/14px) <Link to='https://cnn.com'>Lorem ipsum</Link>{' '}
          dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque
          doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
          (sm-copy)
        </Text>
      </Paper>

      <Paper elevation={2}>
        <Typography variant='h5'>Material-UI Variants Not Used</Typography>
        <Typography variant='caption'>caption</Typography>
        <Typography variant='subtitle1'>subtitle1</Typography>
        <Typography variant='subtitle2'>subtitle2</Typography>
        <Typography variant='button'>button</Typography>
        <Typography variant='overline' display='block'>
          overline
        </Typography>
        <Typography variant='srOnly'>screen readers only</Typography>
      </Paper>
    </Container>
  );
};

export default ShowTypography;
