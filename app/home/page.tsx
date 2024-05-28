'use client'
import { logout } from '@/src/actions/Auth'
import { fetchUserDetails, syncDbUser } from '@/src/actions/Users'
import React, { useEffect, useState } from 'react'


const page = () => {
  const [userDetails, setUserDetails] = useState<any>(null)
  const fetchUser = async () => {
    const res:any = await fetchUserDetails()
    setUserDetails(res)
    console.log(res);
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <>
    {userDetails?.picture && <img src={userDetails?.picture} alt="profile picture" className='rounded-full w-[50vw] aspect-square'/>}
    <h1><b>Name: </b>{userDetails?.name}</h1>
    <h2><b>Email: </b>{userDetails?.email}</h2>
    <div className='flex w-full gap-[5vw] justify-center'>
      <button className='border-[1px] border-black rounded-full p-2' onClick={()=>{
        syncDbUser(userDetails)
      }} >Proceed</button>
      <button className='border-[1px] border-black rounded-full p-2' onClick={()=>{logout()}}>Signout</button>

    </div>
    </>
  )
}

export default page