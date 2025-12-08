import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '6%',   
    },

    text: {
        fontSize: styleGlobal.fonts.sizeHeaderSmall,
        fontFamily: styleGlobal.fonts.familyHeader,
    }
})


module.exports = style;