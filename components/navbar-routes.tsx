"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {LogOut} from "lucide-react"
import Link from "next/dist/client/link";
import { SearchInput } from "./search-input";
import { isAdmin } from "@/lib/admin";

export const NavbarRoutes = () => {

    const {userId} = useAuth();

    const pathname = usePathname();

    const isAdminPage = pathname?.startsWith("/admin");
    const isCoursePage = pathname.includes("/courses");
    const isSearchPage = pathname === "/search";


    return ( 
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput/>
            </div>
        )}
        <div className="flex gap-x-2 ml-auto">
            {isAdminPage || isCoursePage ? (
                <Link href="/">
                <Button size="sm" variant={"ghost"}>
                    <LogOut className="h-4 w-4 mr-2"/>
                    Exit
                </Button>
                </Link>
            ) : isAdmin(userId) ? (
                <Link href="/admin/courses">
                <Button size="sm" variant={"ghost"}>
                    Admin Mode
                </Button>
                </Link>
            ) : null}
            <UserButton 
            afterSignOutUrl="/"
            />
        </div>
        </>
     );
}