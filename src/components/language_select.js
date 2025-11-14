import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Portal } from 'react-native-portalize'; // Assuming you still use this library

/**
 * Generic Custom Dropdown Component
 *
 * @param {string | number} value - The currently selected value identifier.
 * @param {Array<{ label: string, value: string | number, image?: any }>} data - Array of dropdown items.
 * @param {function} onChange - Callback function when an item is selected, receives the selected item object.
 * @param {string} placeholder - Text to display when no item is selected.
 * @param {boolean} showImage - Optional flag to control image display in the button/items.
 */
const SelectLanguage = ({
  value,
  data = [],
  onChange,
  placeholder = "Select item",
  showImage = true,
}) => {
  const [visible, setVisible] = useState(false); // Renamed 'open' to 'visible' for clarity
  const [search, setSearch] = useState("");

  // Find the selected item based on the current 'value' prop
  const selectedItem = data.find(item => item.value === value);

  // Filter data based on search input (case-insensitive label matching)
  const filteredData = data.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  // --- Render Item for FlatList ---
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onChange(item.value); // Pass only the value back to the parent component
        setVisible(false);
        setSearch(""); // Clear search when an item is selected
      }}
    >
      {showImage && item.image && (
        <Image source={item.image} style={styles.flag} />
      )}
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );

  // --- Component JSX ---
  return (
    <>
      {/* 1. MAIN DROPDOWN BUTTON */}
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        {selectedItem && showImage && selectedItem.image && (
          <Image source={selectedItem.image} style={styles.flag} />
        )}
        <Text style={[styles.text, !selectedItem && styles.placeholderText]}>
          {selectedItem?.label || placeholder}
        </Text>
      </TouchableOpacity>

      {/* 2. PORTAL MODAL / OVERLAY */}
      <Portal>
        {visible && (
          <TouchableOpacity // Use TouchableOpacity for dismissable overlay
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setVisible(false)} // Dismiss on touching outside
          >
            <View style={styles.modalBox} onStartShouldSetResponder={() => true}>
              
              {/* SEARCH INPUT */}
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search..."
                placeholderTextColor="#999"
                style={styles.search}
              />

              {/* ITEMS LIST */}
              <FlatList
                data={filteredData}
                keyExtractor={item => item.value.toString()} // Ensure key is a string
                renderItem={renderItem}
                style={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No items found</Text>}
              />
              
              {/* Optional: Close Button for better UX */}
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
        )}
      </Portal>
    </>
  );
};

// --- STYLES ---
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12, // For a rounded flag look
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1, // Allows text to take up available space
  },
  placeholderText: {
    color: '#999',
  },
  overlay: {
    position: "absolute",
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Slightly darker overlay
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%", // Slightly wider modal
    maxHeight: '60%', // Limit height for better presentation on small screens
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  search: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
    fontSize: 16,
  },
  listContainer: {
    maxHeight: 250, // Keep the list height controlled
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12, // Increased padding
    paddingHorizontal: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#777',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  closeText: {
    textAlign: "center",
    color: "dodgerblue", // Use a standard system color
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SelectLanguage;