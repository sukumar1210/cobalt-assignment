'use client'
import { getAuthToken } from '@/src/actions/Auth'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

// const page = () => {
//   useEffect(() => {
//     getAuthToken()
//   }, [])


interface Tokens{
  access_token?: string,
  refresh_token?: string,
  scope?: string,
  token_type?: string,
  id_token?: string,
  expiry_date?: number,
  error?: any
}

const page = () => {
  const query = useSearchParams()
  const router = useRouter()
  const keys = query.keys();
  
  const queryObj = Object.create({})  

  for (const [key, value] of query.entries()) {
    // console.log(key, ': ', value);
    queryObj[key] = value
  }
  // console.log('object is');
  // console.log(queryObj)
  const [tokens, setTokens] = useState<Tokens | null>(null)
  const onClickHandler = async () => {
    console.log('oncClickHandler called')
    try {
      let res:string = await getAuthToken(queryObj.code)
      const resobj = JSON.parse(res)
      console.log('resobj: ')
      console.log(resobj);
      setTokens(resobj)
      if (tokens?.error) {
        throw new Error(resobj.error.message)
      }

    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <>
      <h1>Login Page</h1>
      <button onClick={onClickHandler}className="border-[1px]">Get Token</button>
      <div className='w-screen p-4 text-wrap break-words'>{`returned parameters: ${queryObj.code}`}</div>
      {tokens?.access_token && <div className='w-screen p-4 text-wrap break-words'>{`access_token: ${tokens.access_token}`}</div>}
      {tokens?.refresh_token && <div className='w-screen p-4 text-wrap break-words'>{`refresh_token: ${tokens.refresh_token}`}</div>}
      {tokens?.scope && <div className='w-screen p-4 text-wrap break-words'>{`scope: ${tokens.scope}`}</div>}
      {tokens?.token_type && <div className='w-screen p-4 text-wrap break-words'>{`token_type: ${tokens.token_type}`}</div>}
      {tokens?.id_token && <div className='w-screen p-4 text-wrap break-words'>{`id_token: ${tokens.id_token}`}</div>}
      {tokens?.expiry_date && <div className='w-screen p-4 text-wrap break-words'>{`expiry_date: ${tokens.expiry_date}`}</div>}
      {tokens && !tokens.error && (
        <>
          <div>The tokens have been recieved you may proceed to Home</div>
          <button className="border-[1px]" onClick={()=>{router.push('/home')}}>Home</button>
        </>
      )}
      {tokens && tokens.error && (
        <>
          <div className='w-screen p-4 text-wrap break-words'>{`Error: ${tokens.error?.message}`}</div>
          <button className="border-[1px]" onClick={()=>{router.push('/auth/login')}}>Go back to Login</button>
        </>
      )}


    </>
  )
}

export default page