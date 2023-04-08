import React from 'react'

  const onRefresh = (setStatus, refreshDelay) => React.useCallback(()=>{
    setStatus(true);
    setTimeout(() => {
      setStatus(false);
    }, refreshDelay);
  })


export default onRefresh;