import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        
    },

    containerItem: {
        width: '100%',
        Height: '10%',
        alignItems: 'center'
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
        minHeight: '50%',
        width: '90%',
        marginBottom: '40%',
        alignItems: 'center',
        justifyContent: 'center'
    },


})

module.exports = style;