"use client"

import React, {useRef, useState, useEffect} from "react"
import styled from "styled-components"
import {AiOutlineClose} from "react-icons/ai"
import Loader from "./SharedComponent/Loader"
import {MdPublic} from "react-icons/md"
import {FcBusinessman} from "react-icons/fc"
import {IoMdNotificationsOutline} from "react-icons/io"
import {IoCloseCircleOutline} from "react-icons/io5"
import {toast} from "react-toastify"
import Notification from "./Notification"

function InputBox({}) {
  const filePickerRef = useRef(null)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [textareaEnabled, setTextareaEnabled] = useState(false)
  const [newPost, setNewPost] = useState({
    postText: "",
    location: "",
  })

  const {postText, location} = newPost

  const handleChange = (e: React.ChangeEvent<any>) => {
    const {name, value} = e.target
    setNewPost(prev => ({...prev, [name]: value}))
  }

  const addImageFromDevice = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          const formData = new FormData()
        }
      } else {
        toast("File size is too large")
      }
    }
  }

  const createPost = async () => {
    setLoading(true)
    let picUrl
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

        <div className="flex space-x-4 mt-2 ml-4 mr-4 justify-evenly items-center">
          <div className="flex flex-grow justify-center items-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer">
            <p className="text-lg">Upload</p>
            <input
              onChange={addImageFromDevice}
              type="file"
              accept="image/*"
              style={{display: "none"}}
            />
            <p>Photo</p>
          </div>
          <button
            className="flex flex-grow justify-center items-center hover:bg-gray-100 space-x-2 mb-2 pt-2 pb-2 pl-2.5 pr-2.5 rounded-xl cursor-pointer"
            type="submit"
            onClick={createPost}
          >
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              <>
                {/* <ArrowSmRightIcon className="h-7" /> */}
                <p>Post</p>
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
        {textareaEnabled ? (
          <>
            <div className="pt-6 pl-6 pr-6">
              <div className="flex space-x-4 items-center">
                <FcBusinessman />
                <div>
                  <p style={{marginBottom: "0rem", fontWeight: "600"}}>
                    Rasheed
                  </p>
                  <div className="flex text-gray-500 text-sm space-x-1 items-center">
                    <MdPublic />
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
                          setImagePreview(null)
                        }}
                      >
                        <IoCloseCircleOutline className="h-6 text-gray-700" />
                      </ImagePreviewDiv>
                      <ImagePreview
                        src={imagePreview}
                        alt="imagePreview"
                      ></ImagePreview>
                    </ImageContainerDiv>
                  </>
                )}
                {/* <FormBottomHalf /> */}
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center pt-6 pl-6 pr-6">
              <form className="w-full">
                <div className="flex w-full space-x-4 items-center">
                  {/* <Image src={user.profilePicUrl} alt="profile pic" /> */}
                  <div
                    className={`flex p-3.5 bg-gray-100 rounded-full items-center w-full`}
                  >
                    <input
                      name="postText"
                      value={postText}
                      onChange={handleChange}
                      className="outline-none w-full bg-transparent font-light text-md placeholder-gray-400 text-lg"
                      type="text"
                      placeholder={`What's on your mind, Rasheed?`}
                    ></input>
                  </div>
                </div>

                {imagePreview && (
                  <>
                    <ImageContainerDiv
                      style={{marginTop: "1.125rem", marginBottom: "-.25rem"}}
                    >
                      <ImagePreviewDiv
                        onClick={() => {
                          setImage(null)
                          setImagePreview(null)
                        }}
                      >
                        <AiOutlineClose size={24} />
                      </ImagePreviewDiv>
                      <ImagePreview
                        src={imagePreview}
                        alt="imagePreview"
                      ></ImagePreview>
                    </ImageContainerDiv>
                  </>
                )}
                <FormBottomHalf />
              </form>
            </div>
          </>
        )}
      </div>
      {error && (
        <Notification
          Icon={IoMdNotificationsOutline}
          message={"Sorry, the post wasn't submitted"}
          content={error}
          setError={setError}
        />
      )}
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
