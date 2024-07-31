import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const headerStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 20,
        zIndex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginHorizontal: -50,
    },
    gradientButton: {
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const boardStyles = StyleSheet.create({
    boardList: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    boardItem: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    boardItemSquare: {
        width: 200,
        height: 200,
    },
    boardItemWide: {
        width: '96%',
        height: 100,
        padding: 10, // Added padding for the wide view
    },
    boardHeader: {
        backgroundColor: '#b0b0b0',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    boardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white', // Adjusted for dark mode
    },
    boardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
});

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Gray background with some transparency
        padding: 10,
        borderRadius: 5,
        width: '100%',
        marginBottom: 20,
        color: 'black', // Ensuring text color is visible
    },
    buttonContainer: {
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    button: {
        marginVertical: 5,
    },
    gradientButton: {
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export { defaultStyles, headerStyles, boardStyles, modalStyles };
