import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    container: {
        width: '100%',
        maxHeight: '100%',
        backgroundColor: styleGlobal.colors.secondaryNeutral,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: styleGlobal.colors.borders,
        borderWidth: 1,
        borderRadius: 15
    },

    containerLabel: {
        marginTop: '2%',
    }
})

module.exports = style;