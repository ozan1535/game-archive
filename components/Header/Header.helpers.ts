import { Session } from "next-auth";

export function getHeaderItems(session: Session | null) {
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
