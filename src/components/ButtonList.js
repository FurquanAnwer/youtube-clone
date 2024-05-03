import React from 'react'
import Button from './Button'

const ButtonList = () => {
  return (
    <div className='flex justify-center'>
        <Button name="All"/>
        <Button name="Gaming"/>
        <Button name="Songs"/>
        <Button name="Live"/>
        <Button name="Soccer"/>
        <Button name="Cricket"/>
        <Button name="Cooking"/>
        <Button name="Valentines"/>
    </div>
  )
}

export default ButtonList