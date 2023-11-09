import React from 'react'
import { AiFillFileAdd } from 'react-icons/ai'

const Add = () => {
  return (
    <form className='addForm'>
      <label htmlFor="addTerm">Přidat termín</label>
      <input
        autoFocus
        type="text"
        id='addTerm'
        placeholder='Přidat nový termín'
        required />
      <button
        type='submit'
        aria-label='Přidat termín'>
        <AiFillFileAdd />
      </button>
    </form>
  )
}

export default Add
