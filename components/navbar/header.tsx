import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarProps } from "@nextui-org/navbar";
import NextLink from "next/link";
import { Avatar } from "@nextui-org/avatar";
import { UserInfo } from "@/lib/constants";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ThemeSwitch } from "../theme-switch";
import { GithubIcon, SearchIcon } from "../icons";
import { Search } from "./search";

type HeaderProps = {
  navbarProps?: NavbarProps
}

export default function Header({ navbarProps }: HeaderProps) {
  return (
    <Navbar {...navbarProps} >
      <NavbarBrand>
        <Avatar
          isBordered

          radius="sm"
          color="warning"
          name={UserInfo.name}
          src={UserInfo.avatar}
        />
      </NavbarBrand>
      <NavbarContent className=" flex gap-4" justify="center">
        <Search />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Link as={NextLink} color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button size="sm" variant="light" isIconOnly as={NextLink} href="https://github.com/gooooooooney">
            <GithubIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
