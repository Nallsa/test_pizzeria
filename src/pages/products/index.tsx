import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { Box, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import CategoryList from 'components/categoryList'
import ProductList from 'components/products/productList'
import TotalBlock from 'components/products/totalBlock'

import { RootState } from 'dataStore/state'
import { useActions } from 'hooks/useActions'
import { settings } from 'ThemeStyle'

const Products: React.FC = () => {
  const navigate = useNavigate()
  const { getAllCategory } = useActions()
  const { categories } = useSelector((state: RootState) => state.products)
  const [productNameFilter, setProductNameFilter] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null)
  useEffect(() => {
    getAllCategory()
  }, [])

  const handleCreateCategory = (): void => {
    navigate('/products/create_category')
  }
  return (
    <div>
      <TotalBlock />
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <CategoryList
            items={categories}
            title='Категории'
            productNameFilter={productNameFilter}
            setProductNameFilter={setProductNameFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          >
            <Button fullWidth onClick={handleCreateCategory}>
              + Создать категорию
            </Button>
          </CategoryList>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={6}
          md={9}
          spacing={3}
          sx={{
            maxHeight: `${settings.productsWrapper}vh`,
						overflowY: 'scroll',
						paddingBottom: 2,
          }}
        >
          <ProductList
            productNameFilter={productNameFilter}
						categoryFilter={categoryFilter}
          />
        </Grid>
      </Box>
    </div>
  )
}

export default Products
