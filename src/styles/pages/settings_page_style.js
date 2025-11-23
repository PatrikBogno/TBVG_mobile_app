import global_style from '../global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    scroll_container: {
        minHeight: '100%',
        backgroundColor: global_style.colors.secondary_light,
    },

    page_container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        paddingBottom: '4%',
    },

    settings_title: {
        fontSize: global_style.fonts.header_size,
    }
})

module.exports = style;