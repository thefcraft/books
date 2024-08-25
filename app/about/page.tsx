"use client";

import { Nav, NavItem } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav>
        <NavItem name="Home" href="/"/>
        <NavItem name="Browse" href="/browse"/>
        <NavItem name="About" href="/about" active/>
      </Nav>
      <main className="flex-1">
        <section className="py-12 md:py-20 max-w-80 mx-auto sm:max-w-full">
          <div className="container px-4 md:px-6 max-w-xl">
            Welcome to [book.thefcraft.site], where our only mission is to turn you into a coding superhero without charging you a dime! We’re like the Robin Hood of programming books—stealing from the expensive publishers and giving to the code-hungry masses. Dive into our treasure trove of free coding PDFs, and get ready to level up your skills while we handle the whole “not spending a fortune” thing. Happy coding, and may your bugs be few and your coffee strong!
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
}