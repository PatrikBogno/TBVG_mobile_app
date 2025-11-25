import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    text: {
        fontFamily: styleGlobal.fonts.familyNormal,
        fontSize: styleGlobal.fonts.sizeNormal,
        color: styleGlobal.colors.textNormal
    },
})

module.exports = style;