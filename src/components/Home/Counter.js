import { StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import CustomText from '../Elements/CustomText'
import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { createWorkTimeLocal } from '../../../db';

import Toast from 'react-native-easy-toast';

const Counter = () => {
  const {userId} = useSelector(({auth}) => auth)
  const [isCounting, setIsCounting] = React.useState(false);
  const [pauseCount, setPauseCount] = React.useState(false);
  const [isStoped, setIsStoped] = React.useState(true);
  const [startedAt, setStartedAt] = React.useState();
  const [retake, setRetake] = React.useState();

  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(seconds / 60);
  const [hours, setHours] = React.useState(minutes / 60);

  const successToast = React.useRef();
  const errorToast = React.useRef();


  React.useEffect(() => {
    let interval = null;
    if (isCounting && !pauseCount) {

      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)

    }
    seconds === 61 && setSeconds(1);

    if (seconds === 61) {
      setMinutes(prev => prev + 1)
    }

    minutes === 61 && setMinutes(0);
    if (minutes === 61) {
      setHours(prev => prev + 1)
    }

    return () => clearInterval(interval)
  }, [isCounting, seconds, minutes])


  const handleStartCount = () => {
    const dateNowLocalTime = new Date().toLocaleTimeString();
    setIsCounting(true);
    setPauseCount(false);
    setIsStoped(false);
    !startedAt ?
      setStartedAt(dateNowLocalTime) :
      setRetake(dateNowLocalTime);
  }

  const handlePauseCount = () => {
    setPauseCount(!pauseCount);
    setIsStoped(false);
    setIsCounting(false);
  }

  const handleStopCount = () => {
    setIsCounting(false);
    setIsStoped(true);
    setPauseCount(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setRetake();
    setStartedAt();

    createWorktimeReport();
  }

  const createWorktimeReport = () =>{
    const dateNowLocalTime = new Date().toLocaleTimeString();
    const reportDay = new Date();
    const worktimeReport = {
      reportDay,
      startedAt: startedAt,
      endedAt: dateNowLocalTime,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }

    createWorkTimeLocal(userId, worktimeReport)
      .then(data=>
        successToast.current.show('Progreso guardado.', 1500)
      )
      .catch(err=>
        errorToast.current.current.show(`Error al guardar progreso.\n\n${err}`, 1500)
      )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {
          (!isCounting && !pauseCount) || (!isCounting && pauseCount && isStoped) ?
            <CustomText textValue="Empezar dia" otherStyles={styles.counterText} fontType={'medium'} /> :
            <CustomText textValue={`${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}:${seconds < 10 ? 0 : ''}${seconds}`} otherStyles={styles.counterText} fontType={'medium'} />
        }
        {
          !isCounting && !pauseCount ?
            <FontAwesome5 name="play" size={15} onPress={handleStartCount} color="white" /> :
            <View style={styles.countControllersBox}>
              <FontAwesome5 name={pauseCount ? "play" : "pause"} size={15} color="white" style={styles.countItem} onPress={pauseCount ? handleStartCount : handlePauseCount} />
              <FontAwesome5 name="stop" size={15} color="white" style={styles.countItem} onPress={handleStopCount} />
            </View>
        }
      </View>
      {
        !isCounting && pauseCount && !isStoped && startedAt ?
          <CustomText textValue={`Pausado a las: ${startedAt}`} otherStyles={styles.countBody} /> :
          (isCounting && !pauseCount && !isStoped && retake) &&
          <CustomText textValue={`Retomado a las: ${retake}`} otherStyles={styles.countBody} />
      }
      {
        startedAt &&
        <View style={styles.countFooter}>
          <CustomText textValue={`Inicio a las: ${startedAt}`} otherStyles={styles.startedAt} />
        </View>
      }

      <Toast
        ref={successToast}
        position='bottom'
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
        style={{backgroundColor: Colors.primaryBlue}}
        textStyle={{color: "#fff"}}
      />

      <Toast
        ref={errorToast}
        position='bottom'
        positionValue={200}
        fadeInDuration={750}
        fadeOutDuration={1000}
        style={{backgroundColor: Colors.primaryViolet}}
        textStyle={{color: "#fff"}}
      />
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryViolet,
    padding: 18,
    width: "65%",
    flexDirection: 'column',
  },
  headerContainer: {
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  counterText: {
    color: "#fff",
    textTransform: 'uppercase'
  },
  countControllersBox: {
    flexDirection: "row",
  },
  countItem: {
    marginHorizontal: 5
  },
  countBody: {
    fontSize: 10,
    color: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#fff",
    marginTop: 5,
    paddingTop: 5
  },
  countFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    color: "#ccc",
    borderTopColor: "#ccc",
    borderTopWidth: 1
  },
  startedAt: {
    fontSize: 10,
    color: "#ccc",
    marginTop: 2,
    paddingTop: 2
  }
})