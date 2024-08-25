import {
    BookIcon,
    FilterIcon,
    HeartIcon,
    ListOrderedIcon,
    SearchIcon,
    StarIcon,
  } from "@/components/icons/ui";
  
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
function ThemeModeToggle() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
type navItemProps = {
  active?: boolean;
  name: string;
  href: string;
}
export function NavItem(props: navItemProps){
  return <Link
    href={props.href}
    className={props.active?"text-primary hover:underline":"text-muted-foreground hover:text-foreground hidden sm:block"}
    prefetch={false}
  >
    {props.name}
  </Link>
}
interface navProps {
  children?: React.ReactNode; // Accepts multiple children of any type
}
export const Nav: React.FC<navProps> = ({ children }) => {
    return <header className="bg-background border-b px-4 md:px-6 py-3 flex items-center justify-between">
    <Link href="/" className="flex items-center gap-2" prefetch={false}>
      <BookIcon className="w-6 h-6" />
      <span className="text-lg font-bold hidden sm:block text-nowrap mr-2">Book Library</span>
    </Link>
    <nav className="flex items-center gap-3 sm:gap-4 md:gap-6">
      {children}
      {/* <Link
        href="/"
        className="text-muted-foreground hover:text-foreground hidden sm:block"
        prefetch={false}
      >
        Home
      </Link>
      <Link
        href="/browse"
        className="text-primary hover:underline"
        prefetch={false}
      >
        Browse
      </Link>
      <Link
        href="#"
        className="text-muted-foreground hover:text-foreground hidden sm:block"
        prefetch={false}
      >
        About
      </Link> */}
    </nav>
    <div className="flex gap-2 ml-2">
      <div className="relative flex-1 max-w-md">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search books..."
          className="w-full rounded-md bg-muted pl-10 pr-4 py-2 text-sm"
        />
      </div>
      <ThemeModeToggle/>
    </div>
  </header>
}