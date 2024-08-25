"use client";

import { useState, useMemo,useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Checkbox.Group
import { Slider } from "@/components/ui/slider";

import { TwitterIcon, FacebookIcon } from "@/components/icons/company";
import {
  BookIcon,
  FilterIcon,
  HeartIcon,
  ListOrderedIcon,
  SearchIcon,
  DownloadIcon,
  StarIcon,
} from "@/components/icons/ui";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Nav, NavItem } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";

type bookProps = {
  idx: number,
  title: string,
  category: string,
  description: string,
  url: string,
  cover: string,
  rating: number
}
function Book(props: bookProps) {
  return <div
  key={props.idx}
  className="group bg-muted rounded-md overflow-hidden transition-all hover:scale-105"
>
  <Link href={props.url} prefetch={false}>
    <img
      src={props.cover}
      alt={props.title}
      className="rounded-t-md"
      style={{ height:"300px", width:"400px", objectFit: "cover" }}
    />
    <div className="p-4">
      <h3 className="text-lg font-medium group-hover:text-primary overflow-ellipsis text-nowrap overflow-hidden">
        {props.title}
      </h3>
      <p className="text-muted-foreground text-sm">
        {props.category}
      </p>
      <p className="text-sm line-clamp-2">{props.description}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1">
          <StarIcon className="w-5 h-5 fill-primary" />
          <span className="text-primary font-medium">
            {props.rating.toFixed(1)}
          </span>
        </div>
        <Button size="sm" variant="outline" className="hover:bg-foreground hover:text-background" onClick={() => window.location.href = props.url}>
          <DownloadIcon className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  </Link>
</div>
}
type pagesNavigationProps = {
  currentPage: number,
  maxPages: number
}
function PagesNavigation(props:pagesNavigationProps){
  if (props.maxPages == 1) {
    return <Pagination className="mt-4">  
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href={"/browse?page=1"}>1</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>;
  }
  return <Pagination className="mt-4">
  <PaginationContent>
    {
      (props.currentPage == 1)? <></>:<PaginationItem>
        <PaginationPrevious href={`/browse?page=${Math.max(1, props.currentPage - 1)}`}/>
      </PaginationItem>
    }
    {
      (props.currentPage == 1 || props.maxPages==2)? <></>:<PaginationItem>
        <PaginationLink href={"/browse?page=1"}>1</PaginationLink>
      </PaginationItem>
    }
    {
      (props.currentPage == 1 || props.currentPage == 2 || props.maxPages <= 3)? <></>:<PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    }
    {
      (props.currentPage == props.maxPages)? <PaginationItem>
        <PaginationLink href={`/browse?page=${props.maxPages-1}`}>{props.maxPages-1}</PaginationLink>
      </PaginationItem>:<></>
    }
    <PaginationItem>
      <PaginationLink href={`/browse?page=${props.currentPage}`} isActive>{props.currentPage}</PaginationLink>
    </PaginationItem>
    {
      (props.currentPage == 1)? <PaginationItem>
        <PaginationLink href={"/browse?page=2"}>2</PaginationLink>
      </PaginationItem>:<></>
    }
    {
      (props.currentPage == props.maxPages || props.currentPage == props.maxPages-1 || props.maxPages <= 3)? <></>:<PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
    }
    {
      (props.currentPage == props.maxPages || props.maxPages==2)? <></>:<PaginationItem>
        <PaginationLink href={`/browse?page=${props.maxPages}`} >{props.maxPages}</PaginationLink>
      </PaginationItem>
    }
    {
      (props.currentPage == props.maxPages)? <></>:<PaginationItem>
        <PaginationNext href={`/browse?page=${Math.min(props.maxPages, props.currentPage + 1)}`} />
      </PaginationItem>
    }
  </PaginationContent>
</Pagination>;
}

export default function Component() {
  const [currpage, setCurrpage] = useState(1);
  const [totalpage, setTotalpage] = useState(0);
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const category = query.get('category');
    const page = query.get('page');
    if (category) {
      setFilter(category);
    }
    if (page) {
      setCurrpage(parseInt(page));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.thefcraft.site/book/pages.json');
      const result = await res.json();  
      const page = Math.max(0, Math.min(currpage, result['total']));
      setCurrpage(page);
      const r = await fetch(`https://api.thefcraft.site/book/page${page}.json`);
      const rresult = await r.json();  
      setTotalpage(result['total']);
      setData(rresult);
    }   
    fetchData();
  }, []);
  if (!data) return <div className="flex flex-col">
    <Nav>
      <NavItem name="Home" href="/"/>
      <NavItem name="Browse" href="/browse" active/>
      <NavItem name="About" href="/about"/>
    </Nav>
    <main className="flex justify-center">
      <Loader/>
    </main>
  </div>;
  
  const count = data['total'];
  const books = data['data'];
  
  let BooksArr: {
    id: number;
    title: string;
    author: string;
    category: string;
    rating: number;
    cover: string;
    url: string;
    description: string;
}[] = [];
  for (let i = 0; i < count; i++) {
    const element = books[i];
    BooksArr[i] = element;
  }


  const filteredBooks = BooksArr.filter((book) => {
    console.log(book.category, filter);
    if (filter === 'all') return true;
    else if (book.category === filter) return true;
    return false;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Nav>
        <NavItem name="Home" href="/"/>
        <NavItem name="Browse" href="/browse" active/>
        <NavItem name="About" href="/about"/>
      </Nav>
      <main className="flex-1">
        <section className="py-12 md:py-20 max-w-80 mx-auto sm:max-w-full">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Browse Books</h2>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FilterIcon className="w-4 h-4" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuRadioGroup
                      value={filter}
                      onValueChange={(value)=>{
                        if (value=="all") window.history.replaceState({}, document.title, `/browse?page=${currpage}`);
                        else window.history.replaceState({}, document.title, `/browse?page=${currpage}&category=${value}`);
                        setFilter(value);
                      }}
                    >
                      <DropdownMenuRadioItem value="all">
                        All
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="AI">
                        Artificial Intelligence
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="WebDev">
                        WebDev
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Programming">
                        Programming
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="CyberSec">
                        CyberSec
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredBooks.map((book, index) => (
                <Book
                cover={book.cover}
                idx={book.id}
                category = {book.category}
                description = {book.description}
                url={book.url}
                rating={book.rating}
                title={book.title}
                key={index}
                />
              ))}
            </div>
            <PagesNavigation currentPage={currpage} maxPages={totalpage} />
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}