"use client";

import { Button } from "@/components/ui/button";
import { Bell, LogOut, User2 } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export function TopBar() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  async function onLogout() {
    if (!auth) return;
    await signOut(auth);
    router.replace("/");
  }

  return (
    <div className="sticky top-16 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-end gap-2 px-4 py-3">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
          <User2 className="h-4 w-4" />
          <span>{isUserLoading ? "…" : (user?.displayName || user?.email || "Guest")}</span>
        </div>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
}
