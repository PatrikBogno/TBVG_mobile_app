import jsxRuntime from 'react/jsx-runtime';
import global_style from './global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon_menu_container: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },  

    icon_button_container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon_container: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        width: 40,
        height: 40,
        strokeWidth: 1.5,
    },  

    active_page_icon: {
        borderWidth: 2,
        borderColor: global_style.colors.borders,
        borderRadius: 20,
        backgroundColor: global_style.colors.secondary
    },  
})

module.exports = style;