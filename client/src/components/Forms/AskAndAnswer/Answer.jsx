import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAnswers } from '../../../redux/actions'

export const Answer = () => {
const dispatch = useDispatch()
const allAnswers = useSelector(state=> state.allAnswers)
useEffect(()=>{
    dispatch(getAllAnswers())
}, [dispatch])
console.log(allAnswers)
  return (
      <>
    <div>Answer</div>


      </>
  )
}
