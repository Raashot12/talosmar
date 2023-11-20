"use client"
import InputBox from "@/components/CreatePost"
import Header from "@/components/Header"
import axios from "axios"
import Cookies from "js-cookie"
import {toast} from "react-toastify"
import {useEffect, useState} from "react"
import PostCard from "./postCard"

export default function Home() {
  return (
    <main>
      <Header />
      <div className="w-full xl:w-1/2 mx-auto">
        <InputBox />
      </div>
    </main>
  )
}
