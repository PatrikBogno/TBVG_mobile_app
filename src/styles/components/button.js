import global_style from './global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        minHeight: 48,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: global_style.colors.text,
        fontFamily: global_style.fonts.family_text,
        fontSize: global_style.fonts.regurlar_size
    }
})

module.exports = style;