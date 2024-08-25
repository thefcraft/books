"use client";

import { useEffect, useState, useMemo } from "react";

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
import { Card, CardContent } from "@/components/ui/card"

import { TwitterIcon, FacebookIcon } from "@/components/icons/company";
import {
  BookIcon,
  FilterIcon,
  HeartIcon,
  ListOrderedIcon,
  SearchIcon,
  StarIcon,
} from "@/components/icons/ui";

import Image from "next/image";
import { Nav, NavItem } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { redirect } from "next/dist/server/api-utils";

type categoryProps = {
  href?: string,
  img: string,
  category: string
}
function Category(props: categoryProps){
  return <Link
    href={props.href?props.href:'#'}
    className="group bg-muted rounded-md overflow-hidden transition-all hover:scale-105"
    prefetch={false}
  >
    <div className="aspect-[3/4] bg-cover bg-center h-full w-full flex flex-col-reverse" style={{ backgroundImage: `url(${props.img})` }}>
      <div className="p-4 text-center text-gray-300 
         bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border-t border-gray-600">
        <h3 className="text-lg font-medium group-hover:text-white overflow-hidden overflow-ellipsis">{props.category}</h3>
      </div>
    </div>
  </Link>
}
type bookProps = {
  img: string,
  name: string,
  category: string,
  description: string,
  url: string,
}
function Book(props: bookProps) {
  return <Card >
    <div>
      <img
        src={props.img}
        alt="Book Cover"
        className="rounded-t-md"
        style={{ height:"300px", width:"400px", objectFit: "cover" }}
      />
    </div>
    <CardContent className="p-4">
      <h3 className="text-lg font-medium overflow-ellipsis text-nowrap overflow-hidden">{props.name}</h3>
      <p className="text-muted-foreground text-sm line-clamp-2" style={{
        lineHeight: "1.5em",
        height: "3em",
      }}>{props.description}</p>
      <div className="flex items-center justify-between mt-2">
        {props.category}
        <Button size="sm" onClick={() => window.location.href = props.url}>Download</Button>
      </div>
    </CardContent>
  </Card>
}


export default function Home() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.thefcraft.site/book/pages.json');
      const result = await res.json();  
      const page = Math.floor(Math.random() * result['total']) + 1;
      const r = await fetch(`https://api.thefcraft.site/book/page${page}.json`);
      const rresult = await r.json();  
      setData(rresult);
    }
    fetchData();
  }, []);
  if (!data) return <div className="flex flex-col">
    <Nav>
      <NavItem name="Home" href="/" active />
      <NavItem name="Browse" href="/browse"/>
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
  for (let i = 0; i < count && i < 4; i++) {
    const element = books[i];
    BooksArr[i] = element;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav>
        <NavItem name="Home" href="/" active/>
        <NavItem name="Browse" href="/browse"/>
        <NavItem name="About" href="/about"/>
      </Nav>
      <main className="flex-1">
        <section className="bg-[url('/img/background-image-particle-strokes.svg')] bg-cover bg-center py-20 md:py-32 text-white">
          <div className="flex container px-4 md:px-6 w-full justify-between">
            <div className="max-w-xl space-y-4 mx-auto">
              <h1 className="text-3xl font-bold md:text-5xl">Discover Your Next Great Read</h1>
              <p className="text-lg md:text-xl">Explore our vast collection of books and find your perfect match.</p>
              <div className="flex gap-4 flex-wrap justify-center md:justify-start">
                <Link
                  href="/browse"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-secondary px-6 py-3 text-sm font-medium hover:bg-primary/90 hover:text-primary-foreground shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary/50"
                  prefetch={false}
                >
                  Browse Books
                </Link>
                <Link
                  href="#recommendedBooks"
                  className="inline-flex items-center 
                  bg-primary/20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30
                  justify-center rounded-md text-white-500 px-6 py-3 text-sm font-medium hover:bg-primary/90 hover:text-primary-foreground shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary/50"
                  prefetch={false}
                >
                  Recommendations
                </Link>
              </div>
            </div>
            <div className="hidden overflow-hidden rounded-xl md:block">
              <img
                  src="/img/hero.jpg"
                  width={300}
                  height={400}
                  alt="Book Cover"
                  className="rounded-t-md"
                  style={{ aspectRatio: "300/400", objectFit: "cover" }}
                />
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Category img="/img/category-ai.webp" category="AI" href="/browse?category=AI" />
              <Category img="/img/category-webdev.avif" category="WebDev" href="/browse?category=WebDev" />
              <Category img="/img/category-programming.jpg" category="Programming" href="/browse?category=Programming" />
              <Category img="/img/category-cybersec.jpg" category="CyberSec" href="/browse?category=CyberSec" />
            </div>
          </div>
        </section>
        <section className="pb-12 md:pb-20">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" id="recommendedBooks">Recommended Books</h2>
              <Link href="/browse" className="text-primary hover:underline" prefetch={false}>
                See all
              </Link>
            </div>
            <div className="grid grid-cols-1 max-w-96 mx-auto sm:max-w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {BooksArr.map((book) => (
                <Book img={book.cover}
                  name={book.title}
                  category={book.category}
                  description={book.description}
                  url={book.url}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}