import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import ResultsCard from '../../resultsCard'

import { RootState } from 'dataStore/state'
import { colors } from 'ThemeStyle'

const TotalBlock: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.products)
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate('create_product')
  }
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={products.length}
          text={'Всего товаров'}
          color={colors.info}
          Icon={DataUsageIcon}
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={0}
          text={'Популярных'}
          color={colors.warning}
          Icon={VerifiedOutlinedIcon}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          total={0}
          text={'Редко продаются'}
          color={colors.danger}
          Icon={ErrorOutlineOutlinedIcon}
        />
      </Grid> */}
      <Grid item xs={12} sm={6} md={3}>
        <ResultsCard
          AddIcon={AddOutlinedIcon}
          text={'Создать новый'}
          color={colors.success}
          Icon={Inventory2OutlinedIcon}
          onClick={handleNavigate}
        />
      </Grid>
    </Grid>
  )
}

export default TotalBlock
