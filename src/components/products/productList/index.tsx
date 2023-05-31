import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import ProductCard from '../productCard'

import { RootState } from 'dataStore/state'
import { useActions } from 'hooks/useActions'

interface IProps {
  productNameFilter: string
  categoryFilter: number | null
}

const ProductList: React.FC<IProps> = ({
  productNameFilter,
  categoryFilter,
}) => {
  const { getAllProducts } = useActions()
  const { products } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      {products
        .filter(el => {
          if (categoryFilter) {
            return el.categories === categoryFilter
          } else {
            return el
          }
        })
        .filter(el =>
          el.title.toLowerCase().includes(productNameFilter.toLowerCase())
        )
        .sort((a, b) => {
          var textA = a.title.toUpperCase()
          var textB = b.title.toUpperCase()
          return textA < textB ? -1 : textA > textB ? 1 : 0
        })
        .map(product => (
          <Grid key={product.id} item xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
    </>
  )
}

export default ProductList
