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

    containerTitle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: '2%'
    },

    title: {
        fontFamily: styleGlobal.fonts.familyNormal,
        fontSize: styleGlobal.fonts.sizeHeaderBig,
        textAlign: 'center',
        width: '100%'
    },

    titleEdit: {
        backgroundColor: styleGlobal.colors.secondaryLight,
        borderColor: styleGlobal.colors.borders,
        borderWidth: 1,
        borderRadius: 15
    },

    containerButtons: {
        width: '90%',
        flex: 3,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },

    containerIcon: {
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: styleGlobal.colors.borders,
        borderWidth: 2,
        borderRadius: 20,
        marginRight: '5%',
        backgroundColor: styleGlobal.colors.secondaryLight
    },

    icon: {
        width: 35,
        height: 35,
        strokeWidth: 1.8,
    },
})

module.exports = style;