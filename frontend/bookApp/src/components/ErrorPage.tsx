// import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div>
      <h1>This <span>Page <span> !</span></span> Does Not Exist</h1>
      <Link to='/'>
      <button>Home <span>Page <span> !</span></span></button>
      </Link>
    </div>
  )
}
