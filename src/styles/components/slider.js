import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerTitle: {
        flex: 1,
    },

    containerSlider: {
        flex: 2,
    },

    slider: {
        height: 48,
        minimumTrackTintColor: styleGlobal.colors.detailsLight,
        maximumTrackTintColor: styleGlobal.colors.detailsDark,
        thumbTintColor: styleGlobal.colors.detailsDark
    }
})

module.exports = style;