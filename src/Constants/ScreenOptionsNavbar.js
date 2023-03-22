import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default optionsWithNavbar = {
    animation: 'none',
    headerShadowVisible: false,
    headerLeft: () =>(
      <Entypo name="menu" size={24} color="white" />
    ),
    headerRight: () =>(
      <Ionicons name="notifications-sharp" size={24} color="white" />
    ),
}