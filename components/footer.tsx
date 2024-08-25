import {
    BookIcon,
    FilterIcon,
    HeartIcon,
    ListOrderedIcon,
    SearchIcon,
    StarIcon,
  } from "@/components/icons/ui";
  
import { TwitterIcon, FacebookIcon, GitHubIcon, InstaIcon } from "@/components/icons/company";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export function Footer(){  
    return <footer className="bg-muted border-t py-8">
    <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <BookIcon className="w-6 h-6" />
        <span className="text-lg font-bold">Book Library</span>
      </div>
      <nav className="flex items-center gap-6">
        <Link
          href="/browse"
          className="text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          Browse
        </Link>
        <Link
          href="#"
          className="text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          About
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/thefcraft?tab=repositories"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <GitHubIcon className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.instagram.com/thefcraft/"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <InstaIcon className="w-5 h-5" />
          </Link>
          <Link href="#" className="text-muted-fore" prefetch={false} />
        </div>
      </nav>
    </div>
  </footer>
}