"use client"

import {
  ChevronDown,
  Code2,
  Github,
  BotMessageSquare as Reddit,
  MessageCircle,
  Globe,
  Newspaper,
  Zap,
  Menu,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function AppMenu() {
  const handleOpenGitHub = () => {
    window.open("https://github.com/musicplayer-io/redditmusicplayer", "_blank")
  }

  const handleOpenReddit = () => {
    window.open("https://www.reddit.com/r/redditmusicplayer/", "_blank")
  }

  const handleOpenSourceCode = () => {
    window.open("https://github.com/musicplayer-io/redditmusicplayer", "_blank")
  }

  const handleRemoteControl = () => {
    // This would typically open a remote control settings modal
    console.log("Remote Control clicked")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 px-3 py-2 h-auto text-xs font-semibold hover:bg-muted bg-transparent"
        >
          <Menu size={16} />
          Menu
          <ChevronDown size={14} className="opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-secondary border-muted"
      >
        {/* App Section */}
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
          App
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleRemoteControl} className="cursor-pointer">
          <Zap size={16} className="mr-2.5 text-accent" />
          <span>Remote Control</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleOpenSourceCode} className="cursor-pointer">
          <Code2 size={16} className="mr-2.5 text-accent" />
          <span>Source Code</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-muted" />

        {/* Community Section */}
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
          Community
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleOpenReddit} className="cursor-pointer">
          <Reddit size={16} className="mr-2.5 text-accent" />
          <span>Reddit Community</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleOpenGitHub}
          className="cursor-pointer"
        >
          <Github size={16} className="mr-2.5 text-accent" />
          <span>GitHub Repository</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-muted" />

        {/* Other Projects Section */}
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
          Other Projects
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => window.open("https://il.ly/", "_blank")}
          className="cursor-pointer"
        >
          <Globe size={16} className="mr-2.5 text-accent" />
          <span>Ilias Ism</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => window.open("https://magicbuddy.chat/", "_blank")}
          className="cursor-pointer"
        >
          <MessageCircle size={16} className="mr-2.5 text-accent" />
          <span>ChatGPT in Telegram</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => window.open("https://swissobserver.com/", "_blank")}
          className="cursor-pointer"
        >
          <Newspaper size={16} className="mr-2.5 text-accent" />
          <span>Swiss News</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => window.open("https://magicspace.co/", "_blank")}
          className="cursor-pointer"
        >
          <Zap size={16} className="mr-2.5 text-accent" />
          <span>SEO Agency</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
