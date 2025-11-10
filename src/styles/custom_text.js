import global_style from './global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    text: {
        fontFamily: global_style.fonts.family_text,
        fontSize: global_style.fonts.regurlar_size,
        color: global_style.colors.text
    },
})

module.exports = style;