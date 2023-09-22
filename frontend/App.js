import React from 'react';
import { Easing, Animated, Alert,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from './pages/SignUp/Signup';
import Login from './pages/Login/Login';
import Pacients from './pages/Pacients/Pacients';
import Home from './pages/Home/Home';
import {GroupIcon, User, Car, Transmissions, Messageries} from './assets/icons'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Transition personnalisée
const forFade = ({ current, closing }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const slideFromRight = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
        current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
        }),
        next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolate: "clamp",
            })
            : 0
    );

    return {
        cardStyle: {
            transform: [
                {
                    translateX: Animated.multiply(
                        progress.interpolate({
                            inputRange: [0, 1, 2],
                            outputRange: [
                                screen.width,
                                0,
                                -screen.width
                            ],
                        }),
                        inverted
                    ),
                },
            ],
        },
    };
};

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}
function PatientsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PatientsScreen" component={Pacients} />
        </Stack.Navigator>
    );
}

function SignupStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
}

function LoginStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 80,
                    paddingTop: 15,
                    paddingBottom: 15,
                }
            }}
        >

            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'purple' : 'grey' }}>Tournée</Text>,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <Car fill={focused ? "purple" : "grey"} name="home" />,
                }}
            />

            <Tab.Screen

                name="Patients"
                component={PatientsStack}
                options={{
                    tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'purple' : 'grey' }}>Patients</Text>,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <User fill={focused ? "purple" : "grey"} name="Patients" />,
                }}
            />

            <Tab.Screen
                name="Transmissions"
                component={HomeStack}
                options={{
                    tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'purple' : 'grey' }}>Transmissions</Text>,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <Transmissions fill={focused ? "purple" : "grey"} name="home" />,
                }}
            />

            <Tab.Screen
                name="Messageries"
                component={HomeStack}
                options={{
                                        tabBarLabel: ({ focused }) => <Text style={{ color: focused ? 'purple' : 'grey' }}>Messagerie</Text>,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <Messageries fill={focused ? "purple" : "grey"} name="home" />,
                }}
            />

        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="LoginTab" component={LoginStack} />
                <Stack.Screen name="Signup" component={SignupStack} />
                <Stack.Screen name="PatientsTab" component={PatientsStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}