import { Text, View, Pressable, Image} from 'react-native';
import favStyles from './FavoriteScreenStyles';

export default function FavButton({base , topping}){
    return (
    <View style={favStyles.pressableBG}>
                <Pressable style={favStyles.favPressable}>
                    <Image source= {require("../../assets/images/logo.png")}
                      style={{
                      flex: .3,
                      width: "25%",
                      height: "90%",
                      }}
                      resizeMode="contain"
                    />
                    <Pressable style ={favStyles.xButton}
                      >
                        <Image source= {require("../../assets/images/x.png")}
                          style={{
                          flex: 1,
                          }}
                          resizeMode="contain"
                        />
                    </Pressable>
                    <View style={favStyles.favPressText}>
                        <View>
                          <Text style={
                            favStyles.drink
                          }>{base}</Text>
                        </View>
                        <View style={{
                          flexDirection: "column",
                          flex: .7
                          }}>
                        <Text style={
                          favStyles.drinkdesc
                        }>{topping}</Text>
                        </View>
                    </View>
                </Pressable>
              
    </View>
    );  
}