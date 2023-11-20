"use client"

import React from "react"
import styled from "styled-components"
import {Post} from "./page"

function PostCard({post}: {post: Post[]}) {
  return (
    <div
      style={{fontFamily: "Inter"}}
      className="mb-7 bg-white flex flex-col justify-start rounded-2xl shadow-md"
    >
      {post?.length === 0 ? (
        <div className="align-middle">No Feed to show</div>
      ) : (
        post?.map((value, index) => {
          return (
            <div className="p-4" key={index}>
              <div className="flex space-x-3 items-center ml-2 relative">
                <Image src={value.base64str as string} alt="userimg" />
                <div>
                  <p
                    style={{
                      fontSize: ".91rem",
                    }}
                    className="text-gray-500 font-light"
                  >
                    {value.created_at}
                  </p>
                </div>
              </div>
              <p className="ml-2 mt-5">{value.post}</p>
            </div>
          )
        })
      )}
    </div>
  )
}

export default PostCard

const Image = styled.img`
  object-fit: cover;
  height: 2.95rem;
  width: 2.95rem;
  border-radius: 50%;
`

const PostImage = styled.img`
  object-fit: contain;
  height: auto;
  max-height: 455px;
  width: 100%;
  margin-top: 0.35rem;
  margin-bottom: 1.2rem;
  transition: all 0.22s ease-out;
  border-top: 0.7px solid lightgrey;
  border-bottom: 0.7px solid lightgrey;
`

const UserPTag = styled.p`
  cursor: pointer;
  margin-bottom: -0.09rem;
  font-weight: 500;
  font-size: 1.05rem;
  :hover {
    text-decoration: underline;
  }
`
