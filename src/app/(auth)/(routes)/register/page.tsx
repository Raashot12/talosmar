"use client"
import {useLayoutEffect, useState} from "react"
import {useRouter} from "next/navigation"
import Cookies from "js-cookie"
import {Controller, useForm} from "react-hook-form"
import {zodResolver as resolverZod} from "@hookform/resolvers/zod"
import {z} from "zod"
import {toast} from "react-toastify"
import axios from "axios"
import Loader from "@/components/SharedComponent/Loader"

const defaultValues: RegistrationSchema = {
  emailAddress: "",
  password: "",
}
const registrationSchema = z.object({
  emailAddress: z.string().email({message: "Invalid email address"}),
  password: z
    .string()
    .min(8, {message: "Password must be at least 8 characters"}),
})

type RegistrationSchema = z.infer<typeof registrationSchema>
const Register = () => {
  const router = useRouter()
  const {control, handleSubmit, formState} = useForm<RegistrationSchema>({
    resolver: resolverZod(registrationSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
  })
  const [loading, setIsloading] = useState(false)
  const {errors} = formState

  const onSubmit = async (data: RegistrationSchema) => {
    try {
      setIsloading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/register`,
        {
          username: data.emailAddress,
          password: data.password,
        }
      )
      const responseData = await response
      if (responseData.status === 200) {
        router.push("/")
        setIsloading(false)
        Cookies.set("loggedin", "true")
      }
    } catch (error) {
      setIsloading(false)
      toast.error("An unexpected error occurred", {
        position: toast.POSITION.TOP_LEFT,
      })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>

        <form onSubmit={handleSubmit(data => onSubmit(data))}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Controller
              name="emailAddress"
              render={({field}) => (
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded-md"
                  {...field}
                />
              )}
              control={control}
            />
            {errors && (
              <p className="text-red-500 text-xs">
                {errors.emailAddress?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <Controller
              name="password"
              render={({field}) => (
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border rounded-md"
                  {...field}
                />
              )}
              control={control}
            />
            {errors && (
              <p className="text-red-500 text-xs">{errors.password?.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-full text-center"
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/log-in" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
