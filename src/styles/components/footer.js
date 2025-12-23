import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2,
        borderTopColor: styleGlobal.colors.borders
    },

    containerIconMenu: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },  

    containerIconButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    conainerIcon: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        width: 40,
        height: 40,
        strokeWidth: 1.5,
    },  

    iconActive: {
        borderWidth: 2,
        borderColor: styleGlobal.colors.borders,
        borderRadius: 20,
        backgroundColor: styleGlobal.colors.secondaryLight
    },  
})

module.exports = style;