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

    pageTitle: {
        fontSize: styleGlobal.fonts.sizeHeaderSmall,
    }
})

module.exports = style;