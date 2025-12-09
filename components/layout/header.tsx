"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth/auth-button"
import { AppMenu } from "./app-menu"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-secondary border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden p-2 h-auto hover:bg-muted"
          onClick={onMenuClick}
          title="Toggle menu"
        >
          <Menu size={20} />
        </Button>
        <h1 className="text-sm font-bold tracking-tight">
          MUSIC PLAYER FOR REDDIT <span className="text-xs text-muted-foreground ml-2">0.6.14</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <AppMenu />
        <AuthButton />
      </div>
    </header>
  )
}
