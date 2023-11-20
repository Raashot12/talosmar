"use client"
import InputBox from "@/components/CreatePost"
import Header from "@/components/Header"
import PostCard from "./PostCard"
import axios from "axios"
import Cookies from "js-cookie"
import {toast} from "react-toastify"
import {useEffect, useState} from "react"

export interface Post {
  username: string
  base64str: string | null
  post: string
  created_at: string
}
export default function Home() {
  const [data, setData] = useState<Post[]>([])
  const fetchPost = async () => {
    const email = Cookies.get("loggedin")
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/posts/${email}`
      )
      const responseData = await response
      if (responseData.status === 200) {
        setData(responseData.data)
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        position: toast.POSITION.TOP_LEFT,
      })
    }
  }
  useEffect(() => {
    fetchPost()
  }, [])
  console.log(data)
  return (
    <main>
      <Header />
      <div className="w-full xl:w-1/2 mx-auto">
        <InputBox />
      </div>
      <div className="w-full xl:w-1/2 mx-auto mt-9">
        <PostCard post={data as Post[]} />
      </div>
    </main>
  )
}
