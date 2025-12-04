import { StyleSheet } from 'react-native';
import styleGlobal from '../styleGlobal';

var style = StyleSheet.create({
    container: {
        width: '100%',
        maxHeight: '100%',
        backgroundColor: styleGlobal.colors.secondaryNeutral,
        flex: 1,
        flexDirection: 'column',
    },

    containerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },

    title: {
        fontFamily: styleGlobal.fonts.familyNormal,
        fontSize: styleGlobal.fonts.sizeHeaderBig
    },

    containerIcon: {
        position: 'absolute',
        top: 0,
        right: '5%',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        width: 35,
        height: 35,
        strokeWidth: 1.8,
    },

    containerIconCancel: {
        position: 'absolute',
        top: 0,
        right: '18%',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerImage: {
        flex: 5,
        backgroundColor: 'red'
    },

    containerButtons: {
        flex: 1,
    }

})

module.exports = style;