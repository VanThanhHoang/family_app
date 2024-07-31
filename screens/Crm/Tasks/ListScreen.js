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
import ColorPicker from 'react-native-wheel-color-picker';

// Function to lighten a color
const lightenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;
    return "#" + (
        0x1000000 + 
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + 
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1).toUpperCase();
};

const ListScreen = () => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useThemeContext();
    const [crmToken, setCrmToken] = useState(null);
    const [lists, setLists] = useState([]);
    const [boardId, setBoardId] = useState(null);
    const [isSquareView, setIsSquareView] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [listName, setListName] = useState('');
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [boardColors, setBoardColors] = useState({}); // Store colors for each board
    const [tempColor, setTempColor] = useState('#ffffff'); // Temporary color to hold current selection

    useEffect(() => {
        const fetchCrmData = async () => {
            try {
                const token = await AsyncStorage.getItem('CrmToken');
                setCrmToken(token);
                const boardId = await AsyncStorage.getItem('selectedBoardId');
                setBoardId(boardId);
            } catch (e) {
                console.error('Failed to load CRM data from storage', e);
            }
        };

        fetchCrmData();
    }, []);

    useEffect(() => {
        if (crmToken && boardId) {
            fetchLists();
        }
    }, [crmToken, boardId]);

    const fetchLists = async () => {
        try {
            const response = await fetch(`https://crm.lehungba.com/api/lists/?board=${boardId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${crmToken}`,
                },
            });
            const data = await response.json();
            setLists(data.data);
        } catch (error) {
            console.error('Failed to fetch lists', error);
        }
    };

    const renderListItem = ({ item }) => {
        const boardColor = boardColors[item.id] || theme.colors.card;
        const headerColor = lightenColor(boardColor, 10); // Lighten the board color by 10%
        return (
            <View
                style={[
                    boardStyles.boardItem,
                    isSquareView ? boardStyles.boardItemSquare : boardStyles.boardItemWide,
                    { backgroundColor: boardColor }
                ]}
            >
                {isSquareView && (
                    <View style={[boardStyles.boardHeader, { backgroundColor: headerColor }]}>
                        <Text style={[boardStyles.boardTitle, { color: theme.colors.text }]}>{item.name}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedBoard(item.id);
                                setTempColor(boardColors[item.id] || theme.colors.card);
                                setColorPickerVisible(true);
                            }}
                            style={{ position: 'absolute', top: 5, right: 5 }}
                        >
                            <Icon
                                name="color-palette"
                                size={16}
                                color={theme.colors.text}
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {!isSquareView && <Text style={[boardStyles.boardTitle, { color: theme.colors.text }]}>{item.name}</Text>}
                <Text style={boardStyles.boardSubtitle}>Created at: {new Date(item.created_at).toLocaleDateString()}</Text>
            </View>
        );
    };

    const handleAddNewList = () => {
        setModalVisible(true);
    };

    const handleAccept = async () => {
        if (!listName.trim()) {
            Alert.alert('Error', 'List name cannot be empty');
            return;
        }

        try {
            const response = await fetch('https://crm.lehungba.com/api/lists/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${crmToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: listName, board: boardId }),
            });
            if (response.ok) {
                const newList = await response.json();
                setLists(prevLists => [newList.data, ...prevLists]);  // Prepend new list
                setModalVisible(false);
                setListName('');
            } else {
                Alert.alert('Error', 'Failed to create new list');
            }
        } catch (error) {
            console.error('Failed to create new list', error);
        }
    };

    const toggleViewStyle = () => {
        setIsSquareView(!isSquareView);
    };

    const handleColorChange = (color) => {
        setTempColor(color);
        if (selectedBoard) {
            setBoardColors(prevColors => ({
                ...prevColors,
                [selectedBoard]: color
            }));
        }
    };

    const handleColorPickerClose = () => {
        setColorPickerVisible(false);
    };

    return (
        <View style={[defaultStyles.container, { backgroundColor: theme.colors.background }]}>
            <View style={headerStyles.headerContainer}>
                <AppHeader back title="My Lists" />
                <View style={headerStyles.iconContainer}>
                    <TouchableOpacity style={headerStyles.iconButton} onPress={toggleTheme}>
                        <LinearGradient
                            colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                            style={headerStyles.gradientButton}
                        >
                            <Icon name={theme.mode === "light" ? "sunny" : "moon"} size={24} color={theme.colors.text} />
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={headerStyles.iconButton} onPress={handleAddNewList}>
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
                data={lists}
                renderItem={renderListItem}
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
                            placeholder="Enter list name"
                            placeholderTextColor={theme.colors.placeHolder}
                            value={listName}
                            onChangeText={setListName}
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={colorPickerVisible}
                onRequestClose={handleColorPickerClose}
            >
                <View style={modalStyles.modalContainer}>
                    <View style={[modalStyles.modalContent, { backgroundColor: theme.colors.card }]}>
                        <ColorPicker
                            color={tempColor}
                            onColorChange={handleColorChange}
                            style={{ flex: 1 }}
                        />
                        <View style={modalStyles.buttonContainer}>
                            <TouchableOpacity style={modalStyles.button} onPress={handleColorPickerClose}>
                                <LinearGradient
                                    colors={[theme.colors.gradientLevel1Start, theme.colors.gradientLevel1End]}
                                    style={modalStyles.gradientButton}
                                >
                                    <Text style={modalStyles.buttonText}>Close</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ListScreen;
