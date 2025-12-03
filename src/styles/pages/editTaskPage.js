import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        paddingBottom: '4%',
        backgroundColor: styleGlobal.colors.secondaryLight,
    },

    pageTitle: {
        fontSize: styleGlobal.fonts.sizeHeaderSmall,
    },

    containerTask: {
        height: '74%'
    }
})

module.exports = style;