import React, {ReactElement} from "react"
import {IoCloseCircleOutline} from "react-icons/io5"
function Notification({
  Icon,
  message,
  content,
  setError,
  marginTop,
}: {
  Icon: ReactElement
  message: string
  setError: (arg: null) => void
  content: string
  marginTop?: boolean
}) {
  return (
    <div
      style={{
        position: "relative",
      }}
      className={` bg-white w-full ${
        marginTop ? "mt-0" : "mt-7"
      }  p-3 rounded-xl shadow-md`}
    >
      <div className={`flex space-x-1 ml-1.5 items-center text-red-600`}>
        <p className="font-semibold text-lg">{message}</p>
      </div>
      <p className={`text-sm ml-3 text-red-400`}>{content}</p>
      {setError && (
        <IoCloseCircleOutline
          className="h-4 sm:h-6 "
          style={{
            right: ".6rem",
            top: ".6rem",
            position: "absolute",

            cursor: "pointer",
          }}
          onClick={() => {
            setError(null)
          }}
        />
      )}
    </div>
  )
}

export default Notification
