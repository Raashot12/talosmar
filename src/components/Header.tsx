"use client"
import React, {useState} from "react"
import {usePathname} from "next/navigation"
import Link from "next/link"
import {useAuth} from "@/context/AuthContext"
import HeaderIcon from "./SharedComponent/IconHolder"
import {FaHome} from "react-icons/fa"

const Header = () => {
  const pathname = usePathname()
  const activeRoute = (path: string) => {
    return pathname === path
  }
  const {logout} = useAuth()
  return (
    <div className="flex bg-white sticky top-0 z-50 shadow-lg h-16 items-center">
      <div className="ml-2 sm:ml-5 p-1 flex items-center">
        <div className="hidden sm:flex items-center">
          <p
            style={{
              fontFamily: "Merienda",
              color: "#686869",
              fontWeight: "700",
              fontSize: "1.8rem",
            }}
          >
            Talosmart
          </p>
        </div>

        <div className="flex sm:hidden items-center">
          <p
            style={{
              fontFamily: "Merienda",
              color: "#686869",
              fontWeight: "700",
              fontSize: "1.8rem",
            }}
          >
            fae
          </p>
        </div>
      </div>

      {/* Mid */}
      <div className="flex justify-center flex-grow">
        <div className="flex items-center space-x-4 md:space-x-4 lg:space-x-8">
          <Link href="/" passHref>
            <div>
              <HeaderIcon
                active={activeRoute("/")}
                Icon={FaHome}
                IconSolid={FaHome}
              ></HeaderIcon>
            </div>
          </Link>
        </div>
      </div>

      {/* Right */}

      <button className="px-4 outline-none bg-transparent" onClick={logout}>
        Signout
      </button>
    </div>
  )
}

export default Header
