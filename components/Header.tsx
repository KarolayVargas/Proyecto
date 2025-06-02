"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import { DarkModeToggle } from "./ui/DarkModeToggle";
import { BookOpen, Code2, Laptop, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SearchInput } from "./Searchinput";

const navItems = [
    {label: "Cursos", href: "/cursos", icon: BookOpen},
    {label: "Retos", href: "/retos", icon: Code2, badge: "Muy pronto"},
    {label: "Proyectos", href: "/proyectos", icon: Laptop},
];

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
           <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center jut rounded bg-primary text-primary-foreground">
                    <Code2 className="h-5 w-5"/>
                </div>
                <span className="text-xl font-bold sm:block hidden">
                    Academia
                    </span>
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                    BETA
                </span>
           </Link>

           <nav className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
                <Link
                key={item.label}
                href={item.href}
                className={cn(
                    "flex items-centergap-2 rounded-md px-3 py-2 text-sm font-medium transition-colorshover:bg-muted/50",
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                
            )}
            >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.badge && (
                    <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-^[10px] 
                    font-medium text-muted-foreground">
                        {item.badge}
                    </span>
             )}
            </Link>
            ))}
            </nav>
        </div>
        <div className="flex items-center gap-4">

            <SearchInput/>
            
            <DarkModeToggle/>

            <SignedIn>
                <UserButton/>
            </SignedIn>

            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="outline" className="hidden md:inline-flex">Iniciar sesión</Button>
                </SignInButton>
            </SignedOut>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Abrir Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px">
                <nav className="flex flex-col gap-4 p-4">
                    {navItems.map((item) => (
                        <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-foreground/80",
                            pathname === item.href
                            ? "text-foreground"
                            : "text-popover-foreground/60"
                        )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant= "outline" className="w-full0">
                            Iniciar sesión
                        </Button>
                    </SignInButton>
                </SignedOut>
            </SheetContent>
            </Sheet>
        </div>
        </div>
    </header>
    );
}