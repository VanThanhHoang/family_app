import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../../ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import AppHeader from '../../../components/AppHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultStyles, headerStyles, boardStyles, modalStyles } from '../../components/Crm/Tasks/TasksStyles';
import SearchBar from '../../../components/SearchBar';

const TaskScreen = () => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useThemeContext();
    const [crmToken, setCrmToken] = useState(null);
    const [boards, setBoards] = useState([]);
    const [isSquareView, setIsSquareView] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [boardName, setBoardName] = useState('');

    useEffect(() => {
        const fetchCrmData = async () => {
            try {
                const token = await AsyncStorage.getItem('CrmToken');
                setCrmToken(token);
            } catch (e) {
                console.error('Failed to load CRM data from storage', e);
            }
        };

        fetchCrmData();
    }, []);

    useEffect(() => {
        if (crmToken) {
            fetchBoards();
        }
    }, [crmToken]);

    const fetchBoards = async () => {
        try {
            const response = await fetch('https://crm.lehungba.com/api/boards/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${crmToken}`,
                },
            });
            const data = await response.json();
            setBoards(data.data);
        } catch (error) {
            console.error('Failed to fetch boards', error);
        }
    };

    const handleBoardPress = async (boardId) => {
        try {
            await AsyncStorage.setItem('selectedBoardId', boardId.toString());
            navigation.navigate('ListScreen');
        } catch (e) {
            console.error('Failed to save board ID to storage', e);
        }
    };

    const renderBoardItem = ({ item }) => (
        <TouchableOpacity
            style={[
                boardStyles.boardItem,
                isSquareView ? boardStyles.boardItemSquare : boardStyles.boardItemWide,
                { backgroundColor: theme.colors.card }
            ]}
            onPress={() => handleBoardPress(item.id)}
        >
            {isSquareView && <View style={boardStyles.boardHeader}><Text style={[boardStyles.boardTitle, { color: theme.colors.text }]}>{item.name}</Text></View>}
            {!isSquareView && <Text style={[boardStyles.boardTitle, { color: theme.colors.text }]}>{item.name}</Text>}
            <Text style={boardStyles.boardSubtitle}>Created at: {new Date(item.created_at).toLocaleDateString()}</Text>
        </TouchableOpacity>
    );

    const handleAddNewBoard = () => {
        setModalVisible(true);
    };

    const handleAccept = async () => {
        if (!boardName.trim()) {
            Alert.alert('Error', 'Board name cannot be empty');
            return;
        }

        try {
            const response = await fetch('https://crm.lehungba.com/api/boards/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${crmToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: boardName }),
            });
            if (response.ok) {
                const newBoard = await response.json();
                setBoards(prevBoards => [newBoard.data, ...prevBoards]);  // Prepend new board
                setModalVisible(false);
                setBoardName('');
            } else {
                Alert.alert('Error', 'Failed to create new board');
            }
        } catch (error) {
            console.error('Failed to create new board', error);
        }
    };

    const toggleViewStyle = () => {
        setIsSquareView(!isSquareView);
    };

    return (
        <View style={[defaultStyles.container, { backgroundColor: theme.colors.background }]}>
            <View style={headerStyles.headerContainer}>
                <AppHeader back title="My Boards" />
                <View style={headerStyles.iconContainer}>
                    <TouchableOpacity style={headerStyles.iconButton} onPress={toggleTheme}>
                        <LinearGradient
                            colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                            style={headerStyles.gradientButton}
                        >
                            <Icon name={theme.mode === "light" ? "sunny" : "moon"} size={24} color={theme.colors.text} />
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={headerStyles.iconButton} onPress={handleAddNewBoard}>
                        <LinearGradient
                            colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                            style={headerStyles.gradientButton}
                        >
                            <Icon name="add" size={24} color={theme.colors.text} />
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={headerStyles.iconButton} onPress={toggleViewStyle}>
                        <LinearGradient
                            colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                            style={headerStyles.gradientButton}
                        >
                            <Icon name={isSquareView ? "grid-outline" : "list-outline"} size={24} color={theme.colors.text} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                key={isSquareView ? 'square' : 'wide'}
                data={boards}
                renderItem={renderBoardItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={isSquareView ? 2 : 1}
                contentContainerStyle={boardStyles.boardList}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={[modalStyles.modalContent, { backgroundColor: theme.colors.card }]}>
                        <TextInput
                            style={[modalStyles.input, { color: theme.colors.text, backgroundColor: theme.colors.itemBackground }]}
                            placeholder="Enter board name"
                            placeholderTextColor={theme.colors.placeHolder}
                            value={boardName}
                            onChangeText={setBoardName}
                        />
                        <View style={modalStyles.buttonContainer}>
                            <TouchableOpacity style={modalStyles.button} onPress={handleAccept}>
                                <LinearGradient
                                    colors={[theme.colors.gradientLevel0Start, theme.colors.gradientLevel0End]}
                                    style={modalStyles.gradientButton}
                                >
                                    <Text style={modalStyles.buttonText}>Accept</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={modalStyles.button} onPress={() => setModalVisible(false)}>
                                <LinearGradient
                                    colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                                    style={modalStyles.gradientButton}
                                >
                                    <Text style={modalStyles.buttonText}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default TaskScreen;
