//Users/macm1/Documents/mobile_app/components/Button.js
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import COLORS from '../constants/colors'

const Button = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;
    console.log('props', props)
    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor:'#198754' },
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 20,fontWeight:'bold',color:props.textColor??'black' }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.primary,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default Button