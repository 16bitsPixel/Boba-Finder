import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C5E7E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoBackground: {
        height: "100%",
        flex: 4,
        padding: '5%',
        alignSelf: "center",
    },
    searchImages: {
        alignSelf: "center",
        position: "absolute",
    },
    searchIcons: {
        height: "100%",
        width: "100%",
        flex: 1,
        //alignSelf: "flex-start",
        //position: "absolute",
        //right: 0,
    },
    extraButtonPosition: {
        width: "15%",
        justifyContent: "center",
    },
    customizationContainer: {
        backgroundColor: "#C5E7E2",
        flex: 1.3,
        width: "100%",
        alignItems: "center",
    },
    customizationButton: {
        backgroundColor: "white",
        width: "80%",
        height: "25%",
        marginTop: "10%",
        borderRadius: "12px",
    },
    customizationIcon: {
        height: "100%",
        flex: 1,
    },
    submitButton: {
        backgroundColor: "#A4D9D1",
        width: "50%",
        height: "15%",
        marginTop: "5%",
        borderRadius: "12px",
        justifyContent: "center",
        alignItems: "center",
    }
});