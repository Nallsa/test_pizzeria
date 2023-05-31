import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import CreatePromo from 'components/pages/promo/CreatePromo'
import PromoCard from 'components/pages/promo/promoCard'
import PromoSearch from 'components/pages/promo/PromoSearch'

import { RootState } from 'dataStore/state'
import { IPromo } from 'dto/pagesData.dto'
import { useActions } from 'hooks/useActions'
import { Row } from 'components/styledComponets/Styled.elements'

const Promo: React.FC = () => {
  const { getAllPromo } = useActions()
  const { promo } = useSelector((state: RootState) => state.pageData)
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [editPromo, setEditPromo] = useState<IPromo | null>(null)
  const [promoFilter, setPromoFilter] = useState<string>('')

  useEffect(() => {
    if (promo.length === 0) {
      getAllPromo()
    }
  }, [])

  return (
    <div>
      <Row gap={10} mb={25}>
        <Button
          size='small'
          variant='outlined'
          onClick={() => setShowCreate(!showCreate)}
        >
          + Создать
        </Button>
        <PromoSearch
          promoFilter={promoFilter}
          setPromoFilter={setPromoFilter}
        />
      </Row>

      {showCreate || editPromo ? (
        <CreatePromo
          setShow={setShowCreate}
          editPromo={editPromo}
          setEditPromo={setEditPromo}
        />
      ) : (
        <Grid container spacing={3}>
          {promo
            ?.filter(el =>
              el.title.toLowerCase().includes(promoFilter.toLowerCase())
            )
            .map((pr, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <PromoCard promo={pr} setEditPromo={setEditPromo} />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  )
}

export default Promo
