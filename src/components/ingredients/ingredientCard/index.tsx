import { Box, Card, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { API_URL } from 'dataStore/api'
import { IIngredient } from 'dto/products.dto'
import ItemMenu from '../../itemMenu'
import LoadableImage from '../../loadableImage'

import { settings, shadows } from 'ThemeStyle'

/* const ProductImgStyle = styled('img')({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
}); */

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}))

interface IProps {
  ingredient?: IIngredient
}

const IngredientCard: React.FC<IProps> = ({ ingredient }) => {
  return (
    <Card
      sx={{
        borderRadius: settings.blockBorderRadius,
        boxShadow: shadows.small,
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {/* <ProductImgStyle alt={ingredient?.title} src={ingredient?.img_url ? `${API_URL}/${ingredient?.img_url}` : ''} loading="lazy" /> */}
        <div
          style={{
            top: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
          }}
        >
          {ingredient?.img_url && (
            <LoadableImage
              alt={ingredient?.title}
              src={
                ingredient?.img_url ? `${API_URL}/${ingredient?.img_url}` : ''
              }
            />
          )}
        </div>
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Typography variant='subtitle2' noWrap>
              {ingredient?.title}
            </Typography>
          </Box>
          <ItemMenu item={ingredient} />
        </Box>
        <InfoStyle>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: 'grey.500',
              gap: '15px',
            }}
          >
            {ingredient?.addition && (
              <>
                <Typography variant='subtitle2' noWrap>
                  Добавка
                </Typography>
              </>
            )}
            {ingredient?.price && (
              <Typography variant='subtitle2' noWrap>
                цена: {ingredient?.price} р/
                {ingredient?.price_type === 'kg' && 'кг.'}
                {ingredient?.price_type === 'pc' && 'шт.'}
              </Typography>
            )}
          </Box>
        </InfoStyle>
      </Stack>
    </Card>
  )
}

export default IngredientCard
