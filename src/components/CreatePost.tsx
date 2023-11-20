"use client"

import React, {useEffect, useState} from "react"
import styled from "styled-components"
import Cookies from "js-cookie"
import Loader from "./SharedComponent/Loader"
import {MdPublic} from "react-icons/md"
import {FcBusinessman} from "react-icons/fc"
import {IoMdNotificationsOutline} from "react-icons/io"
import {IoCloseCircleOutline} from "react-icons/io5"
import {toast} from "react-toastify"
import Notification from "./Notification"
import {toBase64} from "@/lib/base64"
import axios from "axios"
import {useRouter} from "next/navigation"
import PostCard from "@/app/(root)/postCard"

export interface Post {
  username: string
  base64str: string | null
  post: string
  created_at: string
}
function InputBox({}) {
  const [, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState<string>()
  const [data, setData] = useState<Post[]>([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [newPost, setNewPost] = useState({
    postText: "",
  })

  const {postText} = newPost
  const getLoggedUserGmail = Cookies.get("loggedin")
  const handleChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target
    setNewPost(prev => ({...prev, [name]: value}))
  }
  const router = useRouter()
  const addImageFromDevice = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ["image/png", "image/jpeg"]
    const {size = 0} = (e.target.files?.[0] as File) || {}
    if (e.target.files && e.target.files.length) {
      if (e.target.files.length > 0 && size <= maxSize) {
        if (
          e.target.files?.[0] &&
          allowedTypes.includes(e.target.files?.[0].type) &&
          size <= maxSize
        ) {
          const base64 = await toBase64(e.target.files[0])
          console.log(base64)
          setImagePreview(base64)
        }
      } else {
        toast("File size is too large")
      }
    }
  }
  // Fetching Post
  const fetchPost = async () => {
    const email = Cookies.get("loggedin")
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/posts/${email}`
      )
      const responseData = await response
      if (responseData.status === 200) {
        setData(responseData?.data?.data)
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
  const createPost = async () => {
    if (imagePreview) {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append("username", getLoggedUserGmail as string)
        formData.append("base64str", imagePreview as string)
        formData.append("post", postText)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/createpost`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        const responseData = await response
        if (responseData.status === 200) {
          setLoading(false)
          setNewPost({postText: ""})
          await fetchPost()
          toast.success("Post successfully added", {
            position: toast.POSITION.TOP_LEFT,
          })
        } else {
          setLoading(false)
          toast.error("An unexpected error occurred", {
            position: toast.POSITION.TOP_LEFT,
          })
        }
      } catch (error) {
        setLoading(false)
        toast.error("An unexpected error occurred", {
          position: toast.POSITION.TOP_LEFT,
        })
      }
    } else {
      try {
        setLoading(true)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/api/createpost`,
          {
            username: getLoggedUserGmail,
            post: postText,
          }
        )
        const responseData = await response
        if (responseData.status === 200) {
          setLoading(false)
          setNewPost({postText: ""})
          await fetchPost()
          toast.success("Post successfully added", {
            position: toast.POSITION.TOP_LEFT,
          })
        } else {
          setLoading(false)
          toast.error("An unexpected error occurred", {
            position: toast.POSITION.TOP_LEFT,
          })
        }
      } catch (error) {
        setLoading(false)
        toast.error("An unexpected error occurred", {
          position: toast.POSITION.TOP_LEFT,
        })
      }
    }
  }

  const FormBottomHalf = () => {
    return (
      <>
        <span
          className="mt-5"
          style={{
            height: ".65px",
            backgroundColor: "lightgrey",
            margin: "0.1 1.1rem 0 1.1rem",
            display: "block",
          }}
        ></span>

        <div className="flex space-x-4 mt-2 ml-4 mr-4 justify-evenly items-center flex-wrap gap-2">
          <div className="flex flex-grow justify-center items-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer">
            <input
              type="file"
              accept=".jpeg"
              name="file"
              onChange={addImageFromDevice}
            />
            <p>Photo</p>
          </div>
          <button
            className="flex flex-grow justify-center items-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer"
            type="submit"
            disabled={postText.length < 5}
            onClick={createPost}
          >
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              <>
                <p className="bg-purple-500 text-white font-bold rounded-lg px-4 py-2 hover:bg-purple-700 hover:text-white w-full">
                  Post
                </p>
              </>
            )}
          </button>
        </div>
      </>
    )
  }

  return (
    <div>
      <div
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
        className="bg-white rounded-2xl mt-3 mb-10"
      >
        <>
          <div className="pt-6 pl-6 pr-6">
            <div className="flex space-x-4 items-center">
              <FcBusinessman size={30} />
              <div>
                <p style={{marginBottom: "0rem", fontWeight: "600"}}>
                  Rasheed Akanni
                </p>
                <div className="flex text-gray-500 text-sm space-x-1 items-center">
                  <MdPublic size={14} />
                  <p>Public</p>
                </div>
              </div>
            </div>

            <form className="w-full mt-5 flex flex-col justify-evenly">
              <div className={`p-3.5 bg-gray-100 rounded-xl items-center`}>
                <InputTextarea
                  name="postText"
                  value={postText}
                  onChange={handleChange}
                  className={`outline-none w-full bg-transparent font-light text-md placeholder-gray-400 text-lg`}
                  placeholder={`What's on your mind, ${"Rasheed"}?`}
                ></InputTextarea>
              </div>
              {imagePreview && (
                <>
                  <ImageContainerDiv
                    style={{marginTop: "1.15rem", marginBottom: "-1.2rem"}}
                  >
                    <ImagePreviewDiv
                      onClick={() => {
                        setImage(null)
                        setImagePreview(undefined)
                      }}
                    >
                      <IoCloseCircleOutline className="h-6 text-gray-700" />
                    </ImagePreviewDiv>
                    <ImagePreview
                      src={imagePreview as unknown as string}
                      alt="imagePreview"
                    ></ImagePreview>
                  </ImageContainerDiv>
                </>
              )}
              <FormBottomHalf />
            </form>
          </div>
        </>
      </div>
      {error && (
        <Notification
          Icon={IoMdNotificationsOutline}
          message={"Sorry, the post wasn't submitted"}
          content={error}
          setError={setError}
        />
      )}
      <div className="flex-col flex gap-6 mt-8">
        {data?.length === 0 ? (
          <div className="text-center">No Feed to show</div>
        ) : (
          data?.map((value, index) => {
            return <PostCard post={value} key={index} />
          })
        )}
      </div>
    </div>
  )
}

export default InputBox
const ImagePreviewDiv = styled.div`
  cursor: pointer;
  position: absolute;
  top: 4.5%;
  right: 6.5%;
  padding: 0.3rem;
  background-color: white;
  border-radius: 50%;
  z-index: 70;
`

const ImagePreview = styled.img`
  object-fit: contain;
  height: 300px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.2rem;
  transition: all 0.22s ease-out;
`

const ImageContainerDiv = styled.div`
  position: relative;
  & ${ImagePreviewDiv}:hover + ${ImagePreview} {
    opacity: 0.55;
    filter: brightness(107%) contrast(80%);
  }
`

const Image = styled.img`
  object-fit: cover;
  height: 2.95rem;
  width: 2.95rem;
  border-radius: 50%;
`

const InputTextarea = styled.textarea`
  resize: auto;
`
const UploadContainer = styled.div`
  position: relative;
  font-family: "General Sans", sans-serif;
  & input[type="file"] {
    position: absolute;
    z-index: 200;
    opacity: 0;
    right: 0;
    top: 35px;
    padding: 0;
    width: 100%;
    height: 72;
  }
`
