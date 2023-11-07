import { StyleSheet } from "react-native";

export default favStyles = StyleSheet.create({
    headerBar: {
        flex: .15,
        width: "100%",
        backgroundColor: "#C5E7E2",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    backButton: { 
        width: "20%", 
        height: "100%",
        justifyContent: "flex-end",
        alignItems: "flex-start",   
    },
    backButtonImage: {
        height: "65%" ,
        alignItems: "flex-start",
        justifyContent: "flex-end",
    },
    favHeaderText: {
        alignItems: "center",
        justifyContent: "flex-end",
        width: "20%",
        height: "100%",
        flex: .75,
    },
    pressableBG: {
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontFamily: 'ComingSoon',
        fontSize: 40,
    },
    drink: {
        fontFamily: 'Assistant',
        fontSize: 30,
    },
    drinkdesc: {
        fontFamily: 'Assistant',
        fontSize: 17,
    },
    favPressable: { 
        flex: .35,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "85%",
        height: 100,
        backgroundColor: "#F1F1F1",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        marginVertical: 10,
    },
    favPressText: { 
        flex: 0.7,
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
});