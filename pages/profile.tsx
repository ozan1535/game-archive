import { getSession, useSession } from "next-auth/react";
import useSWR from "swr";
import { getLayoutDefault } from "@/layouts/LayoutDefault";
import { PageHead } from "@/components/PageHead/PageHead";
import { Comments } from "@/components/Comments/Comments";

export default function Profile() {
  const { data: session } = useSession();
  const { data: dataComment, mutate } = useSWR(
    `/api/firebase?slug=getAllUserComments&mail=${session?.user?.email}`
  );

  return (
    <div>
      <PageHead
        title={"Game Archive - Profile"}
        description={
          "Game archive profile page. Enjoy your personalized experience."
        }
        keywords={"game archive, login, user"}
      />

      <div style={{ margin: "1rem" }}>
        <h4 style={{ color: "white" }}>Welcome, {session?.user?.name}!</h4>
        <p style={{ color: "white" }}>
          Here, you have control over your comments.
        </p>
        <Comments
          defaultText={"You haven't made any comments yet."}
          dataComment={dataComment}
          canEdit={true}
          mutate={mutate}
        />
      </div>
    </div>
  );
}

Profile.getLayout = getLayoutDefault;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const resComment = await fetch(
    `${
      process.env.SERVER_LINK as string
    }/api/firebase?slug=getAllUserComments&mail=${session?.user?.email}`
  );
  const dataComment = await resComment.json();

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session, dataComment },
  };
}
