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
        flex: 1,
        color: global_style.colors.menu_text,
        fontFamily: global_style.fonts.family_text,
    },

    setting_name_text: {
        fontSize: global_style.fonts.regurlar_size,
        fontFamily: global_style.fonts.family_text,
        color: global_style.colors.text,
    },

    slider_container: {
        flex: 2,
    },

    slider: {
        height: 48,
        minimumTrackTintColor: global_style.colors.details_light,
        maximumTrackTintColor: global_style.colors.details_dark,
        thumbTintColor: global_style.colors.details_dark
    }
})

module.exports = style;