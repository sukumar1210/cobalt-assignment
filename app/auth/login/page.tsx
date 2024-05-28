'use client'
import React from 'react'
import { redirectToConsent } from '@/src/actions/redirectToConsent'

const onClickHandler = () => {
  console.log('oncClickHandler called')
  redirectToConsent()
}

const page = () => {
  return (
    <>
      <h1>Login Page</h1>
      <button onClick={onClickHandler}>Login with Google</button>
    </>
  )
}

export default page