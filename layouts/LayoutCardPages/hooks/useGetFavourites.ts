import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { IFavourite } from "@/layouts/LayoutDefault/types";
import { firestoreDatabase } from "@/services/firebase";

export function useGetFavourites() {
  const { data: session } = useSession();
  const [favourites, setFavourites] = useState<IFavourite[]>();
  const fetchFavouriteItems = useCallback(async () => {
    const docRef = doc(
      firestoreDatabase,
      "favourites",
      `${session?.user?.email}`
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFavourites(
        Object.values(docSnap.data()).sort((a, b) =>
          a.gameName.localeCompare(b.gameName)
        )
      );
    }
  }, [session?.user?.email]);
  useEffect(() => {
    fetchFavouriteItems();
  }, [fetchFavouriteItems]);
  return { favourites, fetchFavouriteItems };
}
