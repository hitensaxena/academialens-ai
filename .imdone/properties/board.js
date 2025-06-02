const icons = {
  filter: `<span class="icon is-small fa-xs"><svg aria-hidden="true" focusable="false" data-prefix="fa" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg></span><span data-v-fd981bec="" class="icon is-small fa-xs"><svg aria-hidden="true" focusable="false" data-prefix="fa" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-chevron-down fa-w-14"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" class=""></path></svg></span>`,
  openFile: `<span class="icon is-medium"><svg version="1.1" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" class="octicon octicon-link"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></span>`,
  kebab: `<span class="icon is-medium"><svg version="1.1" width="3" height="16" viewBox="0 0 3 16" aria-hidden="true" class="octicon octicon-kebab-vertical"><path data-v-5bf4cb66="" fill-rule="evenodd" d="M0 2.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm0 5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zM1.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path></svg></span>`,
  clone: `<span class="icon copy-button is-medium" style=""><svg aria-hidden="true" focusable="false" data-prefix="fa" data-icon="clone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-clone fa-w-16 fa-lg"><path fill="currentColor" d="M464 0c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48H176c-26.51 0-48-21.49-48-48V48c0-26.51 21.49-48 48-48h288M176 416c-44.112 0-80-35.888-80-80V128H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48v-48H176z" class=""></path></svg></span>`,
  editCard: `<span class="icon is-medium"><svg version="1.1" width="14" height="16" viewBox="0 0 14 16" aria-hidden="true" class="octicon octicon-pencil"><path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"></path></svg></span>`,
};

const EMOJI = {
  BAD: ':rotating_light:',
  GREAT: ':rocket:',
  SLEEP: ':sleeping:',
  GOOD: ':2nd_place_medal:',
  CHART: '<span style="font-size: 1.5em;">:chart:</span>',
};

// This module must export a function that returns an object with properties that will be used to render the card
// https://imdone.github.io/imdone-api/classes/plugin.Plugin.html#getboardproperties
module.exports = function () {
  const project = this.project;

  const emoji = {
    due: dueEmoji(project.totals),
    recent: recentEmoji(project.totals),
    wip: wipEmoji(project.totals),
    chart: EMOJI.CHART,
  };

  // These are the properties that are available to use in your cards
  // Use ${property_name} to permanently insert the value of the property
  // Use {{property_name}} to insert the value of the property at runtime
  return {
    cardTotal: cardTotal(project.totals),
    allTopics: project.allTopics, // This is an array of all the topics in the project
    topicTable: getTopicTable(project), // This is a markdown table with the count of tasks for each topic/list intersection
    emoji,
    icons,
  };
};

function cardTotal(totals) {
  let count = 0;
  Object.keys(totals).forEach((list) => {
    count += totals[list];
  });
  return count;
}

function formatEmoji(emoji) {
  return `<span style="font-size: 1.5em;">${emoji}</span>`;
}

function dueEmoji(totals) {
  const due = totals["What's Due?"];
  let emoji = EMOJI.GOOD;
  if (due >= 3) {
    emoji = EMOJI.BAD;
  } else if (due === 0) {
    emoji = EMOJI.GREAT;
  }
  return formatEmoji(emoji);
}

function recentEmoji(totals) {
  const recentlyCompleted = totals['Recently Completed'];
  let emoji = EMOJI.GOOD;
  if (recentlyCompleted >= 3) {
    emoji = EMOJI.GREAT;
  } else if (recentlyCompleted === 0) {
    emoji = EMOJI.BAD;
  }
  return formatEmoji(emoji);
}

function wipEmoji(totals) {
  const doing = totals['DOING'];
  let emoji = EMOJI.GOOD;
  if (doing >= 3) {
    emoji = EMOJI.BAD;
  } else if (doing === 0) {
    emoji = EMOJI.SLEEP;
  } else if (doing === 1) {
    emoji = EMOJI.GREAT;
  }
  return formatEmoji(emoji);
}

function getTopicTable(project) {
  const lists = project.allLists.filter((list) => !list.filter);
  const topicTable = project.allTopics.map((topic) => {
    return {
      name: topic,
      lists: [
        ...lists.map((list) => {
          return {
            name: list.name,
            count: list.tasks.filter((task) => task.topics.includes(topic)).length,
          };
        }),
      ],
    };
  });

  //convert topic table into a markdown table with topic name on the left and list names on the top and the count for each topic/list intersection
  const table = `
| Topic | ${lists.map((list) => list.name).join(' | ')} |
| --- | ${lists.map(() => ' --- ').join(' | ')} |
${topicTable
  .map((topic) => {
    const topicLink = `imdone://${project.path}?filter=topics="${encodeURIComponent(topic.name)}"`;
    return `| [[${topic.name}]] | ${topic.lists.map((list) => `[${list.count}](${topicLink})`).join(' | ')} |`;
  })
  .join('\n')}
`;

  console.log(table);
  return table;
}
