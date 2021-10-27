/* eslint-disable no-console */

const getGithubInfo = (organization) => {
  const githubInfo = { imageUrl: null, organizationUrl: null };
  const { links } = organization;
  let imageUrl;
  if (links) {
    const githubLink = links.find((link) => link.link_type === 'GitHub');

    console.log(githubLink, organization.github_id, organization);
    if (githubLink) {
      const githubId = organization.github_id;
      if (githubId === null) {
        imageUrl = organization.image_url;
      } else {
        imageUrl = `https://avatars1.githubusercontent.com/u/${githubId}?s=100&v=4`;
      }
      githubInfo.imageUrl = imageUrl;
      githubInfo.organizationUrl = githubLink.url;
    }
  }
  return githubInfo;
};

const getImageFromOrg = (organization) => {
  if (organization.image_url && !organization.image_url.includes('scontent')) {
    return organization.image_url;
  } else {
    return '/images/default-github-repo-image.png';
  }
};

const getLinksFromOrg = (organization) => {
  if (organization.links && organization.links.length) {
    return organization.links[0].url;
  } else {
    // no links, either from github, or on organization object
    console.log(`No links available for ${organization.name}`);
    return '/images/default-github-repo-image.png';
  }
};

export const getOrganizationLinks = (organization) => {
  const thumbnailInfo = getGithubInfo(organization);

  // check for empty results from getGithubInfo
  if (!thumbnailInfo.imageUrl) {
    console.log(`No GitHub image available for ${organization.name}`);
    thumbnailInfo.imageUrl = getImageFromOrg(organization);
  }

  if (!thumbnailInfo.organizationUrl) {
    console.log(`No GitHub URL available for ${organization.name}`);
    thumbnailInfo.organizationUrl = getLinksFromOrg(organization);
  }

  return thumbnailInfo;
};
