import React from 'react'
import { useCommonContext } from '../../Context/CommonContextProvider';
import Tutorial from '../Tutorial/Tutorial';
import Home from '../Home/Home';
import Layout from '../../Layout/Layout';
import Projects from '../Projects/Projects';
import NewProject from '../Projects/NewProject';

const Initial = () => {
  const {isTutorialActive, currentView} = useCommonContext();
 
  const changeView = {
    "home": <Home/>,
    "projects": <Projects/>,
    "projects/newProject": <NewProject/>
  }

  return (
    <>
    {
        isTutorialActive ?
        <Tutorial/> :
        <Layout>
          {changeView[currentView]}
        </Layout>
    }
    </>
  )
}

export default Initial