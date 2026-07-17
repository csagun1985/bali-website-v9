import { getSiteUser } from "./chatgpt-auth";
import TripHub from "./trip-hub";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getSiteUser();
  return <TripHub userName={user.displayName} />;
}
