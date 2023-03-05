import React from 'react'
import { useCommonContext } from '../../Context/CommonContextProvider';
import Tutorial from '../Tutorial/Tutorial';
import Home from '../Home/Home';
import Layout from '../../Layout/Layout';

const Initial = () => {
  const {isTutorialActive} = useCommonContext();
  return (
    <>
    {
        isTutorialActive ?
        <Tutorial/> :
        <Layout>
          <Home/> 
        </Layout>
    }
    </>
  )
}

export default Initial