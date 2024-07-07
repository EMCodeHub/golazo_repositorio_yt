import { useRef, useState, useMemo, useCallback } from 'react'
import { searchProducts, recibeMessage } from '../services/products.js'

export function useProducts ({ search, sort }) {


//estado nuevo propuesto por Edu

const[message, setMessage] = useState('');

  const [products, setProducts] = useState([])

  const [loading, setLoading] = useState(false)

  // el error no se usa pero puedes implementarlo
  // si quieres:
  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  const getProducts = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    // search es ''

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newProducts = await searchProducts({ search })
      setProducts(newProducts)

      const mensaje = await recibeMessage({ search })
      setMessage(mensaje)
      

    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  const sortedProducts = useMemo(() => {
        if (!products) return;
    return sort
      ? [...products].sort((a, b) => a.title.localeCompare(b.title))
      : products
  }, [sort, products])

  return { products: sortedProducts, getProducts, loading, message }
}
