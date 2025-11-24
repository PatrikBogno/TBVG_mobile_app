import global_style from './global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        justifyContent: 'center',   
        borderBottomWidth: 2,
        borderBottomColor: global_style.colors.borders
    },

    text: {
        color: global_style.colors.text,
        fontSize: global_style.fonts.header_size,
        fontFamily: global_style.fonts.family,
    }
})

module.exports = style;