import {FC, useState, useEffect} from 'react'
import Button from '@mui/material/Button'

import { Row } from 'components/styledComponets/Styled.elements'
import { useActions } from 'hooks/useActions'
import { useSelector } from 'react-redux'
import { RootState } from 'dataStore/state'

/* import AdsTable from './../../../components/adsPage/AdsTable';
import CreateAds from './../../../components/adsPage/CreateAds'; */

const Ads: FC = () => {
	const [showCreate, setShowCreate] = useState<boolean>(false)
	const { ads } = useSelector((state: RootState) => state.ads)
	const { getAllAds } = useActions()

	useEffect(() => {
    if (ads.length === 0) {
      getAllAds()
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
			</Row>

			{/* {showCreate ? <CreateAds /> : <AdsTable ads={ads} />} */}

		</div>
	)
}

export default Ads