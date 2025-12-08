import { StyleSheet } from 'react-native';
import styleGlobal from '../styleGlobal';

var style = StyleSheet.create({
    container: {
        width: '94%',
        height: '95%',
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },

    itemContainer: {
        maxWidth: '48%',
        margin: '1%',
        marginTop: '3%',
        marginBottom: '5%',
    },

    item: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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
        height: 25,
        width: 'auto',
        paddingLeft: 5,
        paddingRight: 7,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderColor: styleGlobal.colors.borders,
        borderBottomRightRadius: 10,
        backgroundColor: styleGlobal.colors.secondaryLight
    },

    containerPortal: {
        height: '50%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

module.exports = style;