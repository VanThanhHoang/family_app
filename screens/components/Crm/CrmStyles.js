
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    homeIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    headerIcons: {
        position: 'absolute',
        right: 10, // Thay đổi giá trị này để dịch chuyển cả nhóm biểu tượng sang phải
        top: 10,
        flexDirection: 'row',
    },
    headerIcon: {
        marginHorizontal: 5, // Giảm giá trị để icon nằm gọn hơn về phía bên phải
    },
    
    gradientIcon: {
        padding: 10,
        borderRadius: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerLeft: {
        width: 30, // or any width to balance the space
    },
    headerText: {
        fontSize: 20,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    invoiceContainer: {
        alignItems: 'center',
        marginVertical: 50,
    },
    amount: {
        fontSize: 40,
    },
    account: {
        fontSize: 20,
    },
    invoiceNumber: {
        fontSize: 18,
        fontWeight: '300',
        fontFamily: 'System',
        textAlign: 'center',
    },
    status: {
        fontSize: 16,
    },
    buttonsContainer: {
        alignItems: 'center',
    },
    button: {
        marginVertical: 10,
        width: '60%',
    },
    gradientButton: {
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '600',
    },
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
        borderTopWidth: 1,
    },
    iconWrapper: {
        borderRadius: 30,
        padding: 10,
        borderWidth: 1,
    },
    iconContainer: {
        alignItems: 'center',
    },
});
