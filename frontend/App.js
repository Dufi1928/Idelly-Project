import React from 'react';
import { Easing, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './pages/SignUp/Signup';
import Login from './pages/Login/Login';





const Stack = createStackNavigator();

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

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                detachInactiveScreens={false}
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    transitionSpec: {
                        open: {
                            animation: 'timing',
                            config: { duration: 50, easing: Easing.linear },
                        },
                        close: {
                            animation: 'timing',
                            config: { duration: 50, easing: Easing.linear },
                        },
                    },
                    cardStyleInterpolator: slideFromRight, // Applique la transition
                }}
            >
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
