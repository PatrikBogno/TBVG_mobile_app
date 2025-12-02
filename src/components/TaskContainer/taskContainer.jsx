import React from 'react';
import { View, FlatList, Image } from "react-native";

import StyleKeys from '../../styles/styleKeys';
import { AssetKeys } from '../../assets/assetKeys';
import LowLevelComponents from '../lowLevelComponents';


const images = [
  { id: "1", image: AssetKeys.IMAGE_TASK_DRESSING },
  { id: "2", image: AssetKeys.IMAGE_TASK_EATING },
  { id: "3", image: AssetKeys.IMAGE_TASK_INSTRUMENT },
  { id: "4", image: AssetKeys.IMAGE_TASK_LEARNING },
  { id: "5", image: AssetKeys.IMAGE_TASK_PLAYING },
  { id: "6", image: AssetKeys.IMAGE_TASK_READING },
  { id: "7", image: AssetKeys.IMAGE_TASK_SHOES },
];

function taskContainer({}){
    let style = StyleKeys.styleTaskContainer;

    return (
        <View style={style.container}>
            <FlatList
                data={ images }
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={style.item}>
                        <Image source={ item.image } style={ style.image }/>
                        <LowLevelComponents.Text cStyle={style.imageOverlay}>
                            {item.id}
                        </LowLevelComponents.Text>
                    </View>
                )}
            />
        </View>
    )
}

export default taskContainer;