import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        maxWidth: '100%',
        fontSize: styleGlobal.fonts.sizeHeaderSmall,
        fontFamily: styleGlobal.fonts.familyHeader,
        textAlign: 'center'
    }
})


module.exports = style;