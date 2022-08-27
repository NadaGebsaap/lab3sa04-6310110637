import React, {useState, useEffect} from 'react';
import { Text , View, ImageBackground, StyleSheet } from 'react-native';
import Forecast from './Forecast';
export default function Weather(props) {
    useEffect(() => {
        console.log(`fetching data with zipCode = ${props.zipCode}`)
        if (props.zipCode) {
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.zipCode},th&units=metric&APPID=7fb97d32b027962b7905978743efa4b2`)
            .then((response) => response.json())
            .then((json) => {
                setForecastInfo({
                    main: json.weather[0].main,
                    description: json.weather[0].description,
                    temp: json.main.temp });
                })
            .catch((error) => {
                 console.warn(error);
            });
        }
    }, [props.zipCode])


    const [forecastInfo, setForecastInfo] = useState({
        main: '-',
        description: '-',
        temp: 0
    }) 
    
        return (
            <View>
                <ImageBackground source={require('../sky.jpg')} style={styles.backdrop}>
                    <Text>Zip Code</Text>
                    <Text>{props.zipCode}</Text>
                    <Forecast {...forecastInfo} />
                </ImageBackground>
            </View>
            
        );
   }
   
const styles = StyleSheet.create({
    backdrop: {
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
});