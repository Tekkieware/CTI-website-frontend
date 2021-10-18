import { names } from './data/orgs.js';

export const getOrgId = (githubUrl) => {
  let orgname;
  if (githubUrl.split('https://github.com/')[1]) {
    orgname = githubUrl.split('https://github.com/')[1].split('/')[0];
    const org = orgname.replace(/\s/g, '').trim().toLowerCase();
    const id = names.get(org);
    return id;
  } else {
    // eslint-disable-next-line
    console.log(`error with github url: ${githubUrl}`);
    return '';
  }
};
