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

    title: {
        fontSize: styleGlobal.fonts.sizeHeaderSmall,
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
        height: '25%',
        width: '90%',
        marginBottom: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

module.exports = style;