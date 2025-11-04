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
        color: global_style.colors.menu_text,
        fontFamily: global_style.fonts.family_text,
    },

    setting_name_text: {
        fontSize: global_style.fonts.regurlar_size,
        fontFamily: global_style.fonts.family_text,
        color: global_style.colors.menu_text,
    },

    submenu_opener: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: '3%'
    },

    icon: {
        width: 40,
        height: 40,
        strokeWidth: 1.5,
    },  
})

module.exports = style;