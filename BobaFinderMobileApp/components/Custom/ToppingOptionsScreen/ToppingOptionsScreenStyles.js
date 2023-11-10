import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5E7E2',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    customizationContainer: {
        backgroundColor: "#C5E7E2",
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "4%",
    },
    scrollView: {
        flex: 1,
        width: '80%',
    },
    customizationButton: {
        backgroundColor: "white",
        width: '100%',
        height: 80,
        marginTop: "5%",
        borderRadius: "12px",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
    },
    customizationIcon: {
        height: "100%",
        flex: 1,
    },
});