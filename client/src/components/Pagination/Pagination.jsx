import React from 'react'

export const Pagination = ({productsPerPage, products, paginate, currentPage}) => {
   
  const numbers = []
  const numberOfPages = Math.ceil(products/productsPerPage)
  for(let i = 0 ;  i < numberOfPages ; i++) {
    numbers.push(i+1)
  }

  return (
    <nav>
      <ul>
        {
          numbers?.map(number => (
            <a onClick={()=>paginate(number)} key={number}>{number}</a>
          ))
        }
      </ul>
    </nav>  
  )
}

