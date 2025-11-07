"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/firebase"

export function useAuthRedirect(redirectPath = "/dashboard") {
  const { user, isUserLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isUserLoading && user && !user.isAnonymous) {
      router.push(redirectPath)
    }
  }, [user, isUserLoading, router, redirectPath])
}
