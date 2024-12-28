import React from 'react'
import {Container} from './'

function InputBox({
  type='textarea',
  placeholder='',
  value='',
  onChange,
  readOnly=false,
  className,
  max=200
}) {

  return (
    <Container>
      <textarea type={type} onChange={onChange} placeholder={placeholder} readOnly={readOnly} value={value} className={`bg-gray-700 w-[50%] ${className}`} max={max}/>
    </Container>
  )
}

export default InputBox