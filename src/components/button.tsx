'use client'
import { getAuthToken } from '@/src/actions/getAuthToken';
import { useSearchParams } from 'next/navigation';
import React from 'react'

const button = () => {
  const query = useSearchParams()
  
  const keys = query.keys();
  
  const queryObj = Object.create({})  

  for (const [key, value] of query.entries()) {
    console.log(key, ': ', value);
    queryObj[key] = value
  }
  console.log('object is');
  console.log(queryObj)

  const onClickHandler = async () => {
    console.log('oncClickHandler called')
    const res = await getAuthToken(queryObj.code)
    console.log('res: ')
    console.log(res);
    
  }
  return (
    <button onClick={onClickHandler}>Get Token</button>
  )
}

export default button