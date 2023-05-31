import styled from 'styled-components'
import { colors, settings, shadows } from 'ThemeStyle'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* max-height: ${settings.wrapper}vh; */
  /* overflow: hidden; */
  width: 100%;
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;

  &:hover {
    box-shadow: ${shadows.medium};
  }
`
/* export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: ${settings.wrapper}vh;
  overflow: hidden;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background-color: ${colors.white};
  border-radius: ${settings.blockBorderRadius};
  box-shadow: ${shadows.small};
  transition: all 0.6s ease;
  position: relative;

  &:hover {
    box-shadow: ${shadows.medium};
  }
` */
/*
export const OrderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 30px;
`

export const OrderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 400px;
`

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const Title = styled.div`
  font-weight: 500;
`

export const GoodsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
  padding: 15px;
  height: 75vh;
`

export const Good = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
 */