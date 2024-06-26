
// import { Slot } from 'expo-router'
// const Layout = (): JSX.Element => {
    //     return <Slot />
// }

import { Stack } from "expo-router"
const Layout = (): JSX.Element => {
    return <Stack screenOptions={{
        headerStyle: {
            backgroundColor: "#467fd3"
        },
        headerTintColor: "#fff",
        headerTitle: 'Memo App',
        headerBackTitle: 'back',
        headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold'
        }
    }}/>
}

export default Layout