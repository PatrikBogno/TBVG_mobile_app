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
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },  

    icon_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    icon: {
        flex: 1,
        width: 40,
        height: 40,
    },  
})

module.exports = style;