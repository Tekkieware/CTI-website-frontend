const navigation = [
  {
    id: 'join',
    header: 'Join the Index',
    route: '#',
    subNavigation: [
      {
        id: 'tagYourProject',
        header: 'Add Your Project',
        route: '/join-index',
      },
      {
        id: 'addProject',
        header: 'How to Add Your Project',
        route: '/join-index/how-to-add',
      },
    ],
  },
  {
    id: 'overview',
    header: 'Overview',
    route: '#',
    subNavigation: [
      {
        id: 'about',
        header: 'About',
        route: '/about',
      },
      {
        id: 'faq',
        header: 'FAQ',
        route: '/about/faq',
      },
      {
        id: 'contact',
        header: 'Contact Us',
        route: '/about/contact',
      },
    ],
  },
  {
    id: 'civicTechPartners',
    header: 'Civic Tech Organizations',
    route: '#',
    subNavigation: [
      {
        id: 'organizations',
        header: 'All',
        route: '/organizations',
        query: { contrib: false, status: 'any' },
      },
      {
        id: 'affiliatedorganizations',
        header: 'Affiliated',
        route: '/organizations',
        query: { contrib: false, status: 'affiliated' },
      },
      {
        id: 'unaffiliatedorganizations',
        header: 'Unaffiliated',
        route: '/organizations',
        query: { contrib: false, status: 'unaffiliated' },
      },
      {
        id: 'indexcontributors',
        header: 'Index Contributors',
        route: '/organizations',
        query: { contrib: true, status: 'any' },
      },
    ],
  },
  {
    id: 'radicalCollaboration',
    header: 'Radical Collaboration',
    route: '#',
    subNavigation: [
      {
        id: 'collaborate',
        header: 'Collaborate with Us',
        route: '/support/collaborate',
      },
      {
        id: 'donate',
        header: 'Donate',
        route: '/support/donate',
      },
      {
        id: 'share',
        header: 'Share the CTI',
        route: '/support/share',
      },
      {
        id: 'volunteer',
        header: 'Volunteer with Us',
        label: 'Get specific details on the Civic Tech Index project',
        route: 'https://www.hackforla.org/projects/civic-tech-index',
        tooltip: 'Get specific details on the Civic Tech Index project',
        isExternal: true,
      },
    ],
  },
];

const findSubNavParent = (subNavRoute) => {
  let results;
  navigation.forEach((nav) => {
    const found = nav.subNavigation.some(
      (element) => element.route === subNavRoute
    );
    if (found) {
      results = nav.route;
    }
  });
  return results;
};

module.exports = {
  findSubNavParent,
  navigation,
};
