import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        justifyContent: 'center',   
        borderBottomWidth: 2,
        borderBottomColor: styleGlobal.colors.borders
    },

    text: {
        fontSize: styleGlobal.fonts.sizeHeaderSmall,
        fontFamily: styleGlobal.fonts.familyHeader,
    }
})

module.exports = style;