"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/firebase/auth/use-user"

export function useAuthRedirect(redirectPath = "/dashboard") {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user && !user.isAnonymous) {
      router.push(redirectPath)
    }
  }, [user, loading, router, redirectPath])
}
