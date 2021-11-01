import ProjectCard from '../../components/ProjectCard';
import Grid from '@material-ui/core/Grid';
import React from 'react';

const calculateDaysSince = (updateTime) => {
  const days = new Date() - new Date(updateTime);
  return Math.round(days / (1000 * 3600 * 24));
};

export const renderCard = (project, affiliations) => {
  const affiliationTags = [];
  const topicTags = [];
  project.topics.forEach((topic) => {
    if (affiliations[topic]) {
      affiliationTags.push(topic);
    } else {
      topicTags.push(topic)
    }
  });
  return (
    <Grid item style={{ paddingTop: '12px' }}  key={project.id}>
      {' '}
      <ProjectCard
        homepage={project.homepage}
        issueCount={project.open_issues}
        lastUpdate={calculateDaysSince(project.updated_at)}
        organizationAvatarUrl={project.owner.avatar_url}
        organizationUrl={project.owner.html_url}
        ownerName={project.owner.login}
        projectDescription={project.description}
        projectLanguage={project.language}
        projectName={project.name}
        projectTags={affiliationTags}
        projectUrl={project.html_url}
        stargazers={project.stargazers_count}
        topics={topicTags}
        watchers={project.watchers_count}
      />
    </Grid>
  );
};
