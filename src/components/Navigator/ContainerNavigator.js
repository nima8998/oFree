import React from 'react'
import Navigator from './Navigator'
import ModalMessage from '../Modal/ModalMessage'
import { useCommonContext } from '../../Context/CommonContextProvider'

const ContainerNavigator = () => {
  const {isModalVisible, reusltData} = useCommonContext();
  return (
    <>
      <Navigator/>
      {isModalVisible && <ModalMessage data={reusltData} />}
    </>
  )
}

export default ContainerNavigator
