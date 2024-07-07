import { useContext } from 'react'

import { FiltersContext } from '../context/filters.jsx'




export function useFilters () {


  const { filters, setFilters } = useContext(FiltersContext)

  
  const filterProducts = (products) => {


//tengo que insertar la condición de PRECIO MAXIMO AQUI


    return products.filter(product => {


      return (


        product.price<=filters.maxPrice &&

        product.price >= filters.minPrice &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  return { filters, filterProducts, setFilters }
}
