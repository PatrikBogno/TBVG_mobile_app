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
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, 
    },
    image: {
        width: 28,
        height: 24,
        marginRight: 5,
    },
    icon: {
        width: 25,
        height: 25,
    },
    text: {
        fontSize: 16,
    },
    placeholderText: {
        opacity: 0.5
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
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
        borderColor: styleGlobal.colors.borders
    },
    search: {
        borderWidth: 2,
        borderColor: styleGlobal.colors.borders,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 45,
        fontSize: 16,
    },
    listContainer: {
        maxHeight: 250,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderBottomWidth: 2,
        borderBottomColor: styleGlobal.colors.borders,
    },
    emptyText: {
        textAlign: 'center',
        paddingVertical: 20,
        color: '#777',
    },
    closeButton: {
        marginTop: 8,
        paddingVertical: 8,
        alignItems: 'center',
    },
    closeText: {
        fontSize: 16,
        fontWeight: '600',
    },
})

module.exports = style;