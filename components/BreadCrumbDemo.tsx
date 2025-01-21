"use client";

import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const isId = (segment: string) => {
  return segment.length >= 16 && /^[a-zA-Z0-9_-]+$/.test(segment);
};

export default function BreadCrumbDemo() {
  const pathname = usePathname();
  const segment = pathname.split("/").pop() || "Home";

  const getPageTitle = () => {
    switch (true) {
      case pathname.includes("/createArticle"):
        return "Create Article";
      case pathname.includes("/articleUser"):
        return "Edit Article";
      default:
        return isId(segment) ? "Articles" : capitalizeFirstLetter(segment);
    }
  };

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname !== "/" && (
          <>
            <BreadcrumbSeparator />
            {pathname.includes("/createArticle") ||
            pathname.includes("/articleUser") ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : null}
            <BreadcrumbItem>
              <BreadcrumbPage>{getPageTitle()}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
