import { StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import CustomText from '../Elements/CustomText'
import { FontAwesome5 } from '@expo/vector-icons';

const Counter = () => {
  const [isCounting, setIsCounting] = React.useState(false);
  const [pauseCount, setPauseCount] = React.useState(false);
  const [count, setCount] = React.useState(false);
  const [isStoped, setIsStoped] = React.useState(true);
  const [startedAt, setStartedAt] = React.useState();
  const [retake, setRetake] = React.useState();

  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(seconds / 60);
  const [hours, setHours] = React.useState(minutes / 60); 

  const [test, setTest] = React.useState(false);

  React.useEffect(()=>{
    let interval = null;
    if(isCounting && !pauseCount){
      
      interval = setInterval(()=>{
        setSeconds(prev=> prev + 1)
      }, 1000)
      
    }
    seconds === 61 && setSeconds(1);
    
    if(seconds === 61){
      setMinutes(prev=> prev + 1)
    }
    
    minutes === 61 && setMinutes(0);
    if(minutes === 61){
      setHours(prev=> prev + 1)
    }

    return () => clearInterval(interval)
  },[isCounting, seconds, minutes])

  React.useEffect(()=>{
    console.log(`isCounting: ${isCounting} pauseCount: ${pauseCount} isStoped: ${isStoped} setRetake ${retake}`)
  },[test])

  const handleStartCount = () =>{
    const dateNow = new Date().toLocaleTimeString();
    setIsCounting(true);
    setPauseCount(false);
    setIsStoped(false);
    setTest(!test)
    !startedAt ?
      setStartedAt(dateNow) :
      setRetake(dateNow);
  }
  
  const handlePauseCount = () =>{
    setPauseCount(!pauseCount)
    setIsStoped(false);
    setIsCounting(false);
    setTest(!test)
  }
  
  const handleStopCount = () =>{
    setIsCounting(false);
    setIsStoped(true);
    setCount(false);
    setPauseCount(false);
    setTest(!test);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setRetake();
    setStartedAt();
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {
          (!isCounting && !pauseCount) || (!isCounting && pauseCount && isStoped)  ?
            <CustomText textValue="Empezar dia" otherStyles={styles.counterText} fontType={'medium'}/> :
            <CustomText textValue={`${hours < 10 ? 0 : ''}${hours} : ${minutes < 10 ? 0 : ''}${minutes} : ${seconds < 10 ? 0 : ''}${seconds}`} otherStyles={styles.counterText} fontType={'medium'}/>
        }
        {
          !isCounting && !pauseCount ?
            <FontAwesome5 name="play" size={15} onPress={handleStartCount} color="white" /> :
            <View style={styles.countControllersBox}>
              <FontAwesome5 name={pauseCount ?  "play" : "pause"} size={15} color="white" style={styles.countItem} onPress={pauseCount ? handleStartCount : handlePauseCount}/>
              <FontAwesome5 name="stop" size={15} color="white" style={styles.countItem} onPress={handleStopCount}/>
            </View>
        }      
      </View>
      {
        !isCounting && pauseCount && !isStoped && startedAt ?
          <CustomText textValue={`Pausado a las: ${startedAt}`} otherStyles={styles.countFooter}/> :
          (isCounting && !pauseCount && !isStoped && retake) &&
          <CustomText textValue={`Retomado a las: ${retake}`} otherStyles={styles.countFooter}/> 
      }
      {
        startedAt &&
          <CustomText textValue={`Inicio a las: ${startedAt}`} otherStyles={styles.countFooter}/>
      }
      
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.primaryViolet,
    padding: 18,
    width: "65%",
    flexDirection: 'column',
  },
  headerContainer:{
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  counterText:{
    color: "#fff",
    textTransform: 'uppercase'
  },
  countControllersBox:{
    flexDirection: "row",
  },
  countItem:{
    marginHorizontal: 5
  },
  countFooter:{
    fontSize: 10,
    color: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#fff",
    marginTop: 5,
    paddingTop: 5
  }
})