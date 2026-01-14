import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%'
    },

    containerTitle: {
        flex: 2,
    },

    containerSwitch: {
        flex: 1,
    },

    switch: {
        trackColorFalse: styleGlobal.colors.detailsLight,
        trackColorTrue: styleGlobal.colors.detailsDark,
        thumbColorFalse: styleGlobal.colors.detailsDark,
        thumbColorTrue: styleGlobal.colors.detailsLight
    }
})

module.exports = style;