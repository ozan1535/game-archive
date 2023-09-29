export function getHeaderItems(session) {
  const headerItems = [
    {
      title: "Platforms",
    },
    {
      title: "Stores",
    },
    {
      title: "Genres",
    },
    {
      title: "Developers",
    },
    {
      title: "Search",
    },
    {
      title: "Favourites",
    },
  ];

  if (session) {
    headerItems.push({
      title: "Profile",
    });
  }

  return headerItems;
}
