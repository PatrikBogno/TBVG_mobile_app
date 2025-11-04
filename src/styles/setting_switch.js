import global_style from './global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    setting_name: {
        flex: 2,
        color: global_style.colors.text,
        fontFamily: global_style.fonts.family,
    },

    setting_name_text: {
        fontSize: global_style.fonts.regurlar_size,
        fontFamily: global_style.fonts.family,
    },

    switch_container: {
        flex: 1,
    },
})

module.exports = style;