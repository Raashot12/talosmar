import InputBox from "@/components/CreatePost"
import Header from "@/components/Header"
import Image from "next/image"

export default function Home() {
  return (
    <main>
      <Header />
      <div className="w-1/2 mx-auto">
        <InputBox />
      </div>
    </main>
  )
}
