import { getUserProfile } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import ProfileClient from "./client";

export default async function ProfilePage() {
  const user = await getUserProfile();

  if (!user) {
    redirect("/login");
  }

  return <ProfileClient user={user} />;
}
