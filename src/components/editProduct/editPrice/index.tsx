import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble'
import { InputAdornment, TextField } from '@mui/material'
import { RootState } from 'dataStore/state'
import { IPizzeria } from 'dto/pizzerias.dto'
import { IPriceProp, IProduct } from 'dto/products.dto'
import { useActions } from 'hooks/useActions'
import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { InputRow, Label, Wrapper } from './Style.elements'

interface IProp {
  setProductState: Function
  productState: IProduct
}

const EditPrice: FC<IProp> = ({ productState, setProductState }) => {
  const { pizzerias } = useSelector((state: RootState) => state.pizzerias)
  const { getAllPizzerias } = useActions()

  console.log({ productState })

  const fetchPizzerias = () => {
    if (pizzerias?.length === 0) {
      getAllPizzerias()
    }
  }

  useEffect(() => {
    fetchPizzerias()
  }, [])

  //функция для добавления цены для прочих категорий
  const handleChangeSinglePrice = (e: any, pizzeria: IPizzeria): void => {
    if (productState?.single_price) {
      //перебираем массив пиццерий, чтобы определить сколько объектов цен должно быть
      const data = pizzerias
        ?.map(pizz => {
          //если цены пиццерии не обнаружено, то создаём пустые объекты цен для неё
          if (
            !Boolean(
              productState?.single_price?.find(
                (i: any) => i?.pizzeriaId === pizz.id
              )
            )
          ) {
            return [{ price: e.target.value, pizzeriaId: pizz.id }]
          }
          //если обнаружено, то возвращаем её цены
          const subData: any[] =
            productState?.single_price?.filter(
              pr => pr?.pizzeriaId === pizz.id
            ) ?? []
          if (subData.length > 0) {
            return subData
          }
        })
        .flat()

      //записываем новую цену в массив цен
      const dataToState = data?.map((element: IPriceProp) => {
        if (element?.pizzeriaId === pizzeria.id) {
          return { ...element, price: e.target.value }
        }
        return element
      })
      setProductState((prev: IProduct) => ({
        ...prev,
        single_price: dataToState,
      }))
    } else {
      setProductState((prev: IProduct) => ({
        ...prev,
        single_price: [{ price: e.target.value, pizzeriaId: pizzeria.id }],
      }))
    }
  }

  //функция для добавления цен пиццы
  const handleChangePrice = (e: any, pizzeria: IPizzeria) => {
    if (productState?.price) {
      //перебираем массив пиццерий, чтобы определить сколько объектов цен должно быть
      const data = pizzerias
        ?.map(pizz => {
          //если цены пиццерии не обнаружено, то создаём пустые объекты цен для неё
          if (
            !Boolean(
              productState?.price?.find((i: any) => i?.pizzeriaId === pizz.id)
            )
          ) {
            return [
              { price: null, pizzeriaId: pizzeria.id, name: 'S' },
              { price: null, pizzeriaId: pizzeria.id, name: 'L' },
              { price: null, pizzeriaId: pizz.id, name: 'XL' },
            ]
          }
          //если обнаружено, то возвращаем её цены и проверяем наличие всех цен
          let subData: any[] = productState?.price?.filter(
            pr => pr?.pizzeriaId === pizz.id
          )
          if (subData.length > 0) {
            if (
              !Boolean(
                subData.find(
                  (i: any) => i?.name === 'S' && i?.pizzeriaId === pizz.id
                )
              )
            ) {
              subData.push({ price: null, pizzeriaId: pizz.id, name: 'S' })
            }
            if (
              !Boolean(
                subData.find(
                  (i: any) => i?.name === 'L' && i?.pizzeriaId === pizz.id
                )
              )
            ) {
              subData.push({ price: null, pizzeriaId: pizz.id, name: 'L' })
            }
            if (
              !Boolean(
                subData.find(
                  (i: any) => i?.name === 'XL' && i?.pizzeriaId === pizz.id
                )
              )
            ) {
              subData.push({ price: null, pizzeriaId: pizz.id, name: 'XL' })
            }
            return subData
          }
        })
        .flat()
      //записываем новую цену в массив цен
      const dataToState = data?.map((element: IPriceProp) => {
        if (
          element?.pizzeriaId === pizzeria.id &&
          element?.name === e.target.name
        ) {
          return { ...element, price: e.target.value }
        }
        return element
      })
      //записываем цену в стейт
      setProductState((prev: IProduct) => ({ ...prev, price: dataToState }))
    } else {
      //если в стейте нет массива цен, то записываем первую цену
      setProductState((prev: IProduct) => ({
        ...prev,
        price: [
          {
            price: e.target.value,
            pizzeriaId: pizzeria.id,
            name: e.target.name,
          },
        ],
      }))
    }
  }

  return (
    <div>
      {pizzerias?.map(pizzeria => (
        <Wrapper key={pizzeria.id}>
          <Label>{pizzeria?.address?.city} {pizzeria?.address?.street}</Label>
          {productState.product_type ? (
            <>
              <InputRow>
                <TextField
                  size='small'
                  name='S'
                  label='Цена S'
                  value={
                    productState?.price?.filter(
                      el => el?.name === 'S' && el?.pizzeriaId === pizzeria?.id
                    )[0]?.price ?? 0
                  }
                  onChange={e => handleChangePrice(e, pizzeria)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CurrencyRubleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  size='small'
                  name='L'
                  label='Цена L'
                  value={
                    productState?.price?.filter(
                      el => el?.name === 'L' && el?.pizzeriaId === pizzeria?.id
                    )[0]?.price ?? 0
                  }
                  onChange={e => handleChangePrice(e, pizzeria)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CurrencyRubleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  size='small'
                  name='XL'
                  label='Цена XL'
                  value={
                    productState?.price?.filter(
                      el => el?.name === 'XL' && el?.pizzeriaId === pizzeria?.id
                    )[0]?.price ?? 0
                  }
                  onChange={e => handleChangePrice(e, pizzeria)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <CurrencyRubleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </InputRow>
            </>
          ) : (
            <>
              <TextField
                size='small'
                name='price'
                label='Цена'
                value={
                  productState?.single_price?.filter(
                    el => el.pizzeriaId === pizzeria?.id
                  )[0]?.price ?? 0
                }
                onChange={e => handleChangeSinglePrice(e, pizzeria)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <CurrencyRubleIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
        </Wrapper>
      ))}
    </div>
  )
}

export default EditPrice
