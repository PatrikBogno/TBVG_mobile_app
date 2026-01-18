import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    containerScroll: {
        minHeight: '100%',
        backgroundColor: styleGlobal.colors.secondaryLight,
    },

    container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        paddingBottom: '4%',
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

    containerPortal: {
        height: '50%',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'
    },

})

module.exports = style;