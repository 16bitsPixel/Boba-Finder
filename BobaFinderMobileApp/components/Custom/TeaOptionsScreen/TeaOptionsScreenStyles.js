import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5E7E2',
        alignItems: 'center',
        justifyContent: 'center'
    },
    accordContainer: {
        paddingBottom: 5
    },
    accordHeader: {
        padding: 12,
        backgroundColor: '#A4D9D1',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    accordTitle: {
        fontSize: 20,
        width: "100%",
        textAlign: "center"
    },
    accordBody: {
        height: "100%"
    },
    customizationContainer: {
        backgroundColor: "#C5E7E2",
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    customizationButton: {
        backgroundColor: "white",
        width: "80%",
        height: 80,
        marginTop: "5%",
        borderRadius: "12px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    customizationIcon: {
        height: "100%"
    },
});