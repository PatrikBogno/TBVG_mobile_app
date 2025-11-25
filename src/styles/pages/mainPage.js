import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    containerScroll: {
        minHeight: '100%',
        backgroundColor: styleGlobal.colors.secondaryLight,
    },

    container: {
        height: '100%',
        width: React.Dimensions.get("screen").width,
        alignItems: 'center',
        paddingBottom: '4%',
    },

    containerText: {
        width: '90%',
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerTitle: {
        paddingBottom: '5%'
    },

    textTitle: {
        fontSize: styleGlobal.fonts.sizeHeaderBig,
    },

    textParagraph: {
        color: styleGlobal.colors.textLight,
        textAlign: 'justify',
        marginTop: '5%',
    },

    containerImage: {
        width: '92%',
        backgroundColor: styleGlobal.colors.secondaryDark,
        borderRadius: '8%',
        padding: '3%',
        marginTop: '15%',
        marginBottom: '5%'
    },

    image:{
        width: '100%',
        height: '200',
        borderRadius: 10,
        resizeMode: 'stretch',
    }

})

module.exports = style;