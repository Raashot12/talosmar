import InputBox from "@/components/CreatePost"
import Header from "@/components/Header"
import PostCard from "@/components/PostCard"

export default function Home() {
  return (
    <main>
      <Header />
      <div className="w-full xl:w-1/2 mx-auto">
        <InputBox />
      </div>
      <div className="w-full xl:w-1/2 mx-auto">
        <PostCard />
      </div>
    </main>
  )
}
