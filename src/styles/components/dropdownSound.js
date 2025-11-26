import styleGlobal from '../styleGlobal';

var React = require('react-native');

var style = React.StyleSheet.create({
    dropdown: {
        height: 50,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
    },

    text: {
        flex: 1, 
        fontSize: styleGlobal.fonts.sizeSmall,
    },

    icon: {
        width: 25,
        height: 25,
    },

    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.2)', 
    },

    modalBox: {
        width: '85%',
        maxHeight: '60%',
        backgroundColor: styleGlobal.colors.secondaryLight,
        padding: 10,
        borderRadius: 12,
        shadowColor: styleGlobal.colors.detailsDark,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: styleGlobal.colors.borders,
    },

    // --- NEW STYLES FOR SOUND ROW ---
    itemContainer: {
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: styleGlobal.colors.borders,
    },

    itemTextContainer: {
        flex: 1, 
        paddingTop: 4, 
    },

    playButton: {
        padding: 5, 
    },

    playIcon: {
        width: 20,
        height: 20,
    }
})

module.exports = style;