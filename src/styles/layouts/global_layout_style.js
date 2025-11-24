import global_style from './global_style';

var React = require('react-native');

const style = React.StyleSheet.create({
    application_container: {
        flex: 1,
        height: React.Dimensions.get("screen").height,
        backgroundColor: global_style.colors.primary,
    },
    safe_view_container: {  
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: 0,
    },
    header: {
        flex: 10,
    },
    page_container: {
        flex: 80,
    },
    footer: {
        flex: 10,
    },
})

module.exports = style;