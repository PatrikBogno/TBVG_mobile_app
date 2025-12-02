import { StyleSheet } from 'react-native';
import styleGlobal from '../styleGlobal';

var style = StyleSheet.create({
    container: {
        width: '94%',
        height: 'auto',
        marginTop: '4%',
    },

    item: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        maxWidth: '48%',
        margin: '1%',
        minHeight: 50,
    },

    image: {
        maxWidth: '100%',
        height: 110,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: styleGlobal.colors.borders,
    },

    imageOverlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 20,
        width: 50,
        borderTopWidth: 1,
        borderTopLeftRadius: 10,
        borderTopColor: styleGlobal.colors.borders,
        borderLeftWidth: 1,
        borderLeftColor: styleGlobal.colors.borders,
        backgroundColor: styleGlobal.colors.secondaryLight
    }
})

module.exports = style;