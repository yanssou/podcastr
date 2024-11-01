import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Header = ({
  headerTitle,
  titleClassName,
}: {
  headerTitle?: string;
  titleClassName?: string;
}) => {
  return (
    <header className="flex items-center justify-between">
      {/* <div /> nécessaire car a cause de justify-between, il faut un élément (même vide) pour placer correctement le Link à droite*/}
      {headerTitle ? (
        <h1 className={cn("text-18 font-bold text-white-1", titleClassName)}>
          {headerTitle}
        </h1>
      ) : (
        <div />
      )}
      <Link href="/discovery" className="text-16 font-semibold text-orange-1">
        Voir plus
      </Link>
    </header>
  );
};
export default Header;
