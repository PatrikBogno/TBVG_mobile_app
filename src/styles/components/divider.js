import global_style from './global_style';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        height: 2,
        width: '95%',
        backgroundColor: global_style.colors.borders,
        marginVertical: 2,
    },
})

module.exports = style;