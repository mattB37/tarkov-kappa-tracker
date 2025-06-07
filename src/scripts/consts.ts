export const hideoutDataQuery = `
query HideoutQuery {
  hideoutStations(gameMode: regular) {
    name
    id
    imageLink
    levels {
      level
      itemRequirements {
        count
        item {
          name
          shortName
          iconLink
          wikiLink
        }
      }
      stationLevelRequirements {
        level
        station {
          name
        }
      }
    }
  }
}`;

export const taskDataQuery = `
query TaskQuery {
  tasks(gameMode: regular) {
    id
    name
    kappaRequired
    wikiLink
    trader {
      name
    }
    objectives {
      ... on TaskObjectiveItem {
        id
        foundInRaid
        count
        type
        items {
          name
          iconLink
          wikiLink
          shortName
          category {
            normalizedName
          }
        }
      }
    }
  }
}`;