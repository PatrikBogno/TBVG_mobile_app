import global_style from '../global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    scroll_container: {
        minHeight: '100%',
        backgroundColor: global_style.colors.secondary,
    },

    page_container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        paddingBottom: '4%',
    },

    text: {
        color: global_style.colors.menu_text,
        marginRight: '5%',
        marginLeft: '5%',
        marginBottom: '5%',
        fontFamily: global_style.fonts.family_text,
        fontSize: global_style.fonts.menu_size,
    },

    text_nadpis: {
        marginTop: '5%',
        marginBottom: '5%',
        marginLeft: '5%',
        fontSize: global_style.fonts.header_size,
        color: global_style.colors.topic_text,
        fontFamily: global_style.fonts.family_topic,
        fontSize: global_style.fonts.topic_size,
    },

    image_container: {
        width: '90%',
        backgroundColor: global_style.colors.image_container_color,
        borderRadius: '10%',
        padding: '4%',
        margin: '4%',
    },

    image:{
        width: '100%',
        height: '200',
        borderRadius: 10,
        resizeMode: 'stretch',
    }

})

module.exports = style;