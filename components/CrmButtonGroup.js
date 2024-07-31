import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@rneui/themed';

const CrmButtonGroup = () => {
    const { theme } = useTheme();
    const iconColor = theme.colors.text;
    const backgroundColor = theme.mode === 'dark' ? '#1e1e1e' : '#d3d3d3';
    const iconWrapperColor = theme.mode === 'dark' ? '#2e2e2e' : '#f0f0f0';

    return (
        <View style={[styles.footer, { backgroundColor }]}>
            <View style={[styles.iconWrapper, { backgroundColor: iconWrapperColor }]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="globe" size={25} color={iconColor} />
                </TouchableOpacity>
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: iconWrapperColor }]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="business" size={25} color={iconColor} />
                </TouchableOpacity>
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: iconWrapperColor }]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="cloud-outline" size={25} color={iconColor} />
                </TouchableOpacity>
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: iconWrapperColor }]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="search" size={25} color={iconColor} />
                </TouchableOpacity>
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: iconWrapperColor }]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="document" size={25} color={iconColor} />
                </TouchableOpacity>
            </View>
            <View style={[styles.iconWrapper, { backgroundColor: iconWrapperColor }]}>
                <TouchableOpacity style={styles.iconContainer}>
                    <Icon name="server" size={25} color={iconColor} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    iconWrapper: {
        borderRadius: 30,
        padding: 10,
    },
    iconContainer: {
        alignItems: 'center',
    },
});

export default CrmButtonGroup;
