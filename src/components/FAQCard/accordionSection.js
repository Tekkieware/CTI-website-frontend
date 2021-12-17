import React from 'react';
import sanitizeHtml from 'sanitize-html';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { makeStyles } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  accordion: {
    border: '1px solid',
    borderColor: theme.palette.outline.gray,
    '&.MuiAccordion-rounded:last-child': {
      marginBottom: theme.spacing(2),
    },
    '&.Mui-expanded:last-child': {
      marginBottom: theme.spacing(2),
    },
  },
  detail: {
    paddingTop: theme.spacing(2),
  },
  summary: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    '&.Mui-expanded': {
      backgroundColor: theme.palette.secondary.dark,
      '& h6': {
        color: theme.palette.text.secondary,
      },
      '& svg': {
        color: theme.palette.secondary.main,
      },
    },
  },
}));

const SanitizedAnswer = ({ answer }) => {
  const unescapeQuotes = (s) => {
    return s.replace(/\\"/g, '"');
  }
  const sanitize = (s) => {
    return {
      __html: sanitizeHtml(s),
    };
  };
  return (
    <span dangerouslySetInnerHTML={sanitize(unescapeQuotes(answer))} />
  );
};

const AccordionSection = (props) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={9} lg={11}>
      {props.faqs.map((faq) => (
        <Box key={faq.id}>
          <Accordion
            className={classes.accordion}
            expanded={props.expandedFaqs.indexOf(faq.id.toString()) > -1}
            onClick={() => props.onFaqClick(faq)}
          >
            <AccordionSummary
              className={classes.summary}
              data-cy='faq-question'
              expandIcon={<ExpandMoreRoundedIcon />}
            >
              <Typography variant='h6'>{faq.question}</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails data-cy='faq-answer' className={classes.detail}>
              <Typography onClick={(e) => e.stopPropagation()}>
                <SanitizedAnswer answer={faq.answer} />
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </Grid>
  );
}

export default AccordionSection;
