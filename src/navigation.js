const navigation = [
  {
    id: 'joinTheIndex',
    header: 'Join the Index',
    route: '#',
    subNavigation: [
      {
        id: 'tagGeneratorWizard',
        header: 'Tag Generator Wizard',
        route: '/join-index/tag-generator-wizard',
      },
      {
        id: 'howToAdd',
        header: 'How to Add Your Project',
        route: '/join-index/how-to-add',
      },
    ],
  },
  {
    id: 'about',
    header: 'About',
    route: '#',
    subNavigation: [
      {
        id: 'whatIsCTI',
        header: 'What is CTI?',
        route: '/about/what-is-cti',
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
    id: 'civicTechOrganizations',
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
        id: 'affiliated',
        header: 'Affiliated',
        route: '/organizations',
        query: { contrib: false, status: 'affiliated' },
      },
      {
        id: 'unaffiliated',
        header: 'Unaffiliated',
        route: '/organizations',
        query: { contrib: false, status: 'unaffiliated' },
      },
      {
        id: 'indexContributors',
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
        route: '/radical-collaboration/collaborate',
      },
      {
        id: 'donate',
        header: 'Donate',
        route: '/radical-collaboration/donate',
      },
      {
        id: 'share',
        header: 'Share the CTI',
        route: '/radical-collaboration/share',
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
