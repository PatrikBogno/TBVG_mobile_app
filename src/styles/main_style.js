import global_style from './global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global_style.colors.primary,
        height: React.Dimensions.get('screen').height,
    },

    text: {
        color: global_style.colors.text,
    }
})

module.exports = style;