export const getFavouriteGameData = (game, session) => {
  return {
    data: {
      gameName: game.name,
      gameSlug: game.slug,
      gameId: game.id.toString(),
      gameImage: game.background_image,
      gameRelease: game.released,
      gameRating: game.rating,
      gameGenres: {
        genres: game.genres,
      },
      users: {
        id: session?.user?.user?.id,
      },
    },
  };
};

export const editFavouriteItemData = (
  //favouriteItemId,
  favourites,
  session
) => {
  return {
    id: session?.user?.user?.id,
    favourites,
  };
};
