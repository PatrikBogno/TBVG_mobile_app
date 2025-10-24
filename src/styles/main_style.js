import global_style from './global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: global_style.colors.secondary,
    },

    text: {
        color: global_style.colors.text,
    }
})

module.exports = style;