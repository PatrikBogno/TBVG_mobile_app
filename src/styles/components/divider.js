import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        height: 2,
        width: '95%',
        backgroundColor: styleGlobal.colors.borders,
        marginVertical: 2,
    },
})

module.exports = style;