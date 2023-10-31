import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, Image, ImageBackground} from 'react-native';

export default function App() {
  return (
  <View style={styles.container}>
    {/*div for favorites bar w/ back button and favorite drink pressables*/}
    <View style={{
      flex: 1,
      width: "100%",
      }}>
      
      {/*div for top bar w/ 'Favorites' and return button*/}
      <View style ={{
        flex: .12,
        width: "100%",
        backgroundColor: "#C5E7E2",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        }}>
        
        {/*pressable element for back button to return to custom*/}
        <Pressable style={{ 
          width: "20%", 
          height: "100%",
          justifyContent: "flex-end",
          alignItems: "flex-start",   
          }}>
          <Image source= {require("./assets/arrowLeft.png")}
          style={{
          height: "65%" ,
          alignItems: "flex-start",
          justifyContent: "flex-end",
        }}
          resizeMode="center"
          />
        </Pressable>
        
        {/*div for text 'Favorites' */}
        <View style ={{
          alignItems: "center",
          justifyContent: "flex-end",
          width: "20%",
          height: "100%",
          flex: .75,
        }}>
          <Text style={{
          fontSize: 40,
            }}>Favorites</Text>
        </View>
      </View>

      {/*div for each pressable:favorite drink elements */}
      <View style ={{
        flex: .9,
        flexDirection: 'column',
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 18,
        }}>
        <Pressable style={{ 
            flex: .15,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%",
            backgroundColor: "#F1F1F1",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 20,
            marginVertical: 10,
            }}>
            <Image source= {require("./assets/logo.png")}
              style={{
              flex: .3,
              width: "25%",
              height: "90%",
              }}
              resizeMode="contain"
            />
            <View style={{ 
              flex: 0.7,
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between", 
              }}>
              <Text style={{
                fontSize: 30,
                }}>Drink#1</Text>
              <Text style={{
                fontSize: 17,
                }}>Description of drink</Text>
              <View style={{ 
                flex: 0.5,
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end", 
                alignItems: "flex-start",
                }}>
                <Text style={{
                  fontSize: 17,
                  }}>Rating:</Text>
              </View>
            </View>
          </Pressable>

          <Pressable style={{ 
            flex: .15,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%",
            backgroundColor: "#F1F1F1",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 20,
            marginVertical: 10,
            }}>
            <Image source= {require("./assets/logo.png")}
              style={{
              flex: .3,
              width: "25%",
              height: "90%",
              }}
              resizeMode="contain"
            />
            <View style={{ 
              flex: 0.7,
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between", 
              }}>
              <Text style={{
                fontSize: 30,
                }}>Drink#2</Text>
              <Text style={{
                fontSize: 17,
                }}>Description of drink</Text>
              <View style={{ 
                flex: 0.5,
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end", 
                alignItems: "flex-start",
                }}>
                <Text style={{
                  fontSize: 17,
                  }}>Rating:</Text>
              </View>
            </View>
          </Pressable>

          <Pressable style={{ 
            flex: .15,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%",
            backgroundColor: "#F1F1F1",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 20,
            marginVertical: 10,
            }}>
            <Image source= {require("./assets/logo.png")}
              style={{
              flex: .3,
              width: "25%",
              height: "90%",
              }}
              resizeMode="contain"
            />
            <View style={{ 
              flex: 0.7,
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between", 
              }}>
              <Text style={{
                fontSize: 30,
                }}>Drink#3</Text>
              <Text style={{
                fontSize: 17,
                }}>Description of drink</Text>
              <View style={{ 
                flex: 0.5,
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end", 
                alignItems: "flex-start",
                }}>
                <Text style={{
                  fontSize: 17,
                  }}>Rating:</Text>
              </View>
            </View>
          </Pressable>

          <Pressable style={{ 
            flex: .15,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%",
            backgroundColor: "#F1F1F1",
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 20,
            marginVertical: 10,
            }}>
            <Image source= {require("./assets/logo.png")}
              style={{
              flex: .3,
              width: "25%",
              height: "90%",
              }}
              resizeMode="contain"
            />
            <View style={{ 
              flex: 0.7,
              height: "100%",
              flexDirection: "column",
              justifyContent: "space-between", 
              }}>
              <Text style={{
                fontSize: 30,
                }}>Drink#4</Text>
              <Text style={{
                fontSize: 17,
                }}>Description of drink</Text>
              <View style={{ 
                flex: 0.5,
                height: "100%",
                flexDirection: "column",
                justifyContent: "flex-end", 
                alignItems: "flex-start",
                }}>
                <Text style={{
                  fontSize: 17,
                  }}>Rating:</Text>
              </View>
            </View>
          </Pressable>
        
      </View>

    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
