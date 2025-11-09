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

    text_container: {
        width: '90%',
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text_title_container: {
        paddingBottom: '5%'
    },

    text_title: {
        color: global_style.colors.topic_text,
        fontSize: global_style.fonts.topic_size,
        fontFamily: global_style.fonts.family_topic,
    },

    text_paragraph: {
        color: global_style.colors.menu_text,
        fontFamily: global_style.fonts.family_text,
        fontSize: global_style.fonts.menu_size,
        textAlign: 'justify',
        marginTop: '5%',
    },

    image_container: {
        width: '92%',
        backgroundColor: global_style.colors.secondary_dark,
        borderRadius: '8%',
        padding: '3%',
        marginTop: '15%'
    },

    image:{
        width: '100%',
        height: '200',
        borderRadius: 10,
        resizeMode: 'stretch',
    }

})

module.exports = style;