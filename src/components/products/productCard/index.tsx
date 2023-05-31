import { Box, Card, Stack, Typography } from '@mui/material'

import { API_URL } from 'dataStore/api'
import { IProduct } from 'dto/products.dto'
import { settings, shadows } from 'ThemeStyle'
import LoadableImage from '../../loadableImage'

import ProductMenu from '../productMenu'

/* const ProductImgStyle = styled('img')({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
}); */

interface IProps {
  product: IProduct
}

const ProductCard: React.FC<IProps> = ({ product }) => {
  return (
    <Card
      sx={{
        borderRadius: settings.blockBorderRadius,
        boxShadow: shadows.small,
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* <ProductImgStyle alt={product.title} src={product.img_small} /> */}
        <div
          style={{
            top: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        >
          {product?.img_small && (
            <LoadableImage
              alt={product?.title}
              src={product?.img_small ? `${API_URL}/${product?.img_small}` : ''}
            />
          )}
        </div>
      </Box>
      <Stack
        spacing={2}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <Typography variant='subtitle2' noWrap>
              {product.title}
            </Typography>
          </Box>
        </Box>
        <ProductMenu item={product} />
      </Stack>
    </Card>
  )
}

export default ProductCard
