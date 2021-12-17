import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import Layout from './components/common/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import About from './pages/About';
import Contact from './pages/Contact';
import Collaborate from './pages/Collaborate';
import Contributors from './pages/Contributors';
import Donate from './pages/Donate';
import Faq from './pages/Faq';
import IndvOrgPage from './pages/IndvOrganization';
import Home from './pages/Home';
import HowToAdd from './pages/HowToAdd';
import Landing from './pages/Landing';
import SearchProjects from './pages/SearchProjects';
import TagGenerator from './pages/TagGenerator';
import Error404 from './pages/Error404';
import ShareTheCti from './pages/Share';
import Guides from './guides/';
import useStyles from './styles';

const RouteTitled = ({ title, ...rest }) => {
  useEffect(() => {
    if (title) {
      document.title = `Civic Tech Index — ${title}`
    }
  });

  return <Route {...rest} />;
};

const App = () => {
  useStyles();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <QueryParamProvider ReactRouterRoute={Route}>
        <Layout>
          <Routes>
            <Route exact path='/' component={Landing} />
            <RouteTitled exact path='/about' component={About} title='About' />
            <RouteTitled exact path='/about/contact' component={Contact} title='Contact Us' />
            <RouteTitled exact path='/about/faq' component={Faq} title='FAQ' />
            <RouteTitled exact path='/organizations/all' component={Contributors} title='All' />
            <RouteTitled exact path='/organizations/affiliated' component={Contributors} title='Affiliated' />
            <RouteTitled exact path='/organizations/unaffiliated' component={Contributors} title='Unaffiliated' />
            <RouteTitled exact path='/organizations/contributors' component={Contributors} title='Index Contributors' />
            <RouteTitled exact path='/home' component={Home} title='Home' />
            <RouteTitled exact path='/projects' component={SearchProjects} title='Search Projects' />
            <RouteTitled exact path='/join-index' component={TagGenerator} title='Join the Index' />
            <RouteTitled exact path='/join-index/how-to-add' component={HowToAdd} title='How to Add Your Project' />
            <RouteTitled exact path='/support/collaborate' component={Collaborate} title='Collaborate with Us' />
            <RouteTitled exact path='/support/donate' component={Donate} title='Donate' />
            <RouteTitled exact path='/support/share' component={ShareTheCti} title='Share the CTI' />
            <Route exact path='/organization/:name' component={IndvOrgPage} />
            {/* test and error page routes begin */}
            <RouteTitled path='/guides/:guide' component={Guides} title='Guides' />
            <RouteTitled path='/404' component={Error404} title='404' />
            {/* test and error page routes end */}
            <Navigate from='/add' to='/join-index/how-to-add' />
            <Navigate from='/adding' to='/join-index/how-to-add' />
            <Navigate from='/adding-projects' to='/join-index/how-to-add' />
            <Navigate from='/contact' to='/about/contact' />
            <Navigate from='/collaborate' to='/support/collaborate' />
            <Navigate from='/donate' to='/support/donate' />
            <Navigate from='/donation' to='/support/donate' />
            <Navigate from='/faq' to='/about/faq' />
            <Navigate from='/how' to='/join-index/how-to-add' />
            <Navigate from='/how-to' to='/join-index/how-to-add' />
            <Navigate from='/how-to-use' to='/join-index/how-to-add' />
            <Navigate from='/join' to='/join-index' />
            <Navigate from='/All' to='/organizations/all' />
            <Navigate from='/Affiliated' to='/organizations/affiliatedorganizations' />
            <Navigate from='/Unaffiliated' to='/organizations/unaffiliatedorganizations' />
            <Navigate from='/IndexContributors' to='/organizations/affiliated' />
            <Navigate from='/search' to='/projects' />
            <Navigate from='/share' to='/support/share' />
            <Navigate from='/tag-creator' to='/join-index' />
            <Navigate from='/tagcreator' to='/join-index' />
            <Navigate from='/tag-generator' to='/join-index' />
            <Navigate from='/taggenerator' to='/join-index' />
            {/* test and error page redirect begin */}
            <Navigate from='/guides' to='/guides/colors' />
            <Navigate from='/placeholder' to='/blank' />
            <Navigate from='/template' to='/blank' />
            <Navigate to='/404' />
            {/* test and error page redirect end */}
          </Routes>
        </Layout>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
