import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import CrmButtonGroup from '../../components/CrmButtonGroup'; // Ensure the path is correct
import { useThemeContext } from '../../ThemeContext'; // Ensure the path is correct
import { styles } from '../components/Crm/CrmStyles'; // Ensure the path is correct
import AppHeader from '../../components/AppHeader'; // Ensure the path is correct
import AsyncStorage from '@react-native-async-storage/async-storage';

const CrmScreen = () => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useThemeContext();
    const [crmToken, setCrmToken] = useState(null);
    const [crmUserEmail, setCrmUserEmail] = useState(null);
    const [crmUserId, setCrmUserId] = useState(null);

    useEffect(() => {
        const fetchCrmData = async () => {
            try {
                const token = await AsyncStorage.getItem('CrmToken');
                const userEmail = await AsyncStorage.getItem('CrmUserEmail');
                const userId = await AsyncStorage.getItem('CrmUserId');
                setCrmToken(token);
                setCrmUserEmail(userEmail);
                setCrmUserId(userId);
            } catch (e) {
                console.error('Failed to load CRM data from storage', e);
            }
        };

        fetchCrmData();
    }, []);

    const handleTaskButtonPress = () => {
        navigation.navigate('TasksScreen');
    };

    const handleHomePress = () => {
        navigation.navigate('FamilyScreen');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <AppHeader back title="My Business" />
            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.headerIcon} onPress={handleHomePress}>
                    <LinearGradient
                        colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                        style={styles.gradientIcon}
                    >
                        <Icon name="home-outline" size={24} color={theme.colors.text} />
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerIcon} onPress={toggleTheme}>
                    <LinearGradient
                        colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                        style={styles.gradientIcon}
                    >
                        <Icon name={theme.mode === "light" ? "sunny" : "moon"} size={24} color={theme.colors.text} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles.invoiceContainer}>
                <Text style={[styles.account, { color: theme.colors.text }]}>Professional version</Text>
                <Text style={[styles.invoiceNumber, { color: theme.colors.text }]}>Income Today</Text>
                <Text style={[styles.amount, { color: theme.colors.text }]}>$68,575.00</Text>
                <Text style={[styles.status, { color: theme.colors.text }]}>Bacodo</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleTaskButtonPress}>
                    <LinearGradient
                        colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>Task</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <LinearGradient
                        colors={[theme.colors.gradientLevel0Start, theme.colors.gradientLevel0End]}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>Business</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <LinearGradient
                        colors={[theme.colors.gradientLevel0Start, theme.colors.gradientLevel0End]}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>BACODO</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <LinearGradient
                        colors={[theme.colors.gradientLevel0Start, theme.colors.gradientLevel0End]}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>My Property</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <CrmButtonGroup />
        </View>
    );
};

export default CrmScreen;
