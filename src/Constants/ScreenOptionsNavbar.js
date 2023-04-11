import { MenuItem, NotificationsMenu } from '../components';

export default optionsWithNavbar = () =>{
  return({
    animation: 'none',
    headerShadowVisible: false,
    headerLeft: () =>(<MenuItem/>),
    headerRight: () =>(<NotificationsMenu/>),
  })
}