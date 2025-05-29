import React from 'react'
import { Text, View, Image, ScrollView, Pressable, TextInput, Keyboard, ActivityIndicator } from "react-native";
import { icons } from "@/constants/icons";
import SignOutButton from "@/contexts/sign-out";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from "expo-router";

const Items = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [allItems, setallItems] = useState<any[]>([]);
  const [DisplayedItems, setDisplayedItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 30;

  const handleSearch = async () => {
    if (!query.trim()) return;
  
    // Entering search starts loading animation and dismisses keyboard
    setLoading(true);
    setSearched(true);
    Keyboard.dismiss();
  
    try {
      // Fetching items from Open 5E API using the search query
      const response = await axios.get(
        `https://www.dnd5eapi.co/api/2014/equipment/?name=${encodeURIComponent(query)}`
      );
      
      const itemJson = response.data;

      // Set all items gathered, slice all items into pages of 30, and set the current page to 1
      setallItems(itemJson.results || []);
      setDisplayedItems((itemJson.results || []).slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);

    } catch (error) {
      // Display API error and leave items as empty arrays
      console.error('Open 5E API error:', error);
      setallItems([]);
      setDisplayedItems([]);
      
    } finally {
      // End loading when finished the search
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    // Set the indexes of the items to be displayed (from the entire list) per page
    // e.g. If page = 2, startIndex = 30, endIndex = 60, which is the next 30 items after page 1
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // Set the items to be displayed on the current page based on the indexes and set the current page to the function input
    setDisplayedItems(allItems.slice(startIndex, endIndex));
    setCurrentPage(page);
  };

  // Check if there are more pages to display based on the current page and the total number of items
  const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
  const hasNextPage = Array.isArray(allItems) && currentPage < totalPages;
  const hasPrevPage = Array.isArray(allItems) && currentPage > 1;

  return (
    // Main background view which can be scrolled.
    <View className="flex-1 dark:bg-dark-100 bg-primary">
      <ScrollView className="flex-1 px-5" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
        
        {/* Logo and title in a pill container w/ icon */}
        <Image 
        source={icons.logoTrans} 
        className="w-32 h-32 mt-1 mb-1 mx-auto"
        > 
        </Image>
        <View className="mx-auto px-4 py-3 rounded-full dark:bg-dark-200 bg-light-200 mb-4">
          <View className="flex-row items-center self-stretch w-full justify-center">
              <Text className="text-2xl dark:text-primary text-dark-100 font-regular text-center flex-1">
              D&D Items
              </Text>
              <SignOutButton />
          </View>
        </View>

        <View className="mx-auto px-4 py-1 rounded-full dark:bg-dark-200 bg-light-200 mt-2">
          <View className="flex-row items-center self-stretch w-full justify-center">
              <TextInput className="text-2xl dark:text-primary text-dark-100 font-regular flex-1"
              placeholder="Enter item name"
              placeholderTextColor="#A0A0A0"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}>
              </TextInput>
              <Pressable onPress={handleSearch} accessibilityHint='Searches for an item'>
                <Image source={icons.search} className='size-8'></Image>
              </Pressable>
          </View>
        </View>

        {/* Box that encapsulates displayed items */}
        <View className="mt-2 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200 mb-1">
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">Items</Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
          
          {/* If loading, display animated loading symbol */}
          {loading ? (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          ) : (
            <ScrollView>

              {/* Display items if any are returned, else alert user no items found */}
              {DisplayedItems.length > 0 ? (
                DisplayedItems.map((item, index) => (
                  <View key={item.id || item.slug || index} className="mb-5">

                    {/* Pressable item name redirects to item details page */}
                    <Pressable className='flex-row items-center' onPress={() => router.push(`./items/${item.slug}`)} accessibilityHint="item name">
                      <Image source={icons.wand} className='size-6 mr-3'></Image>
                      <Text className="text-xl font-bold text-left dark:text-primary text-dark-100">{item.name}</Text>
                    </Pressable>
                  </View>
                ))
              ) : (
                searched && <Text className="text-xl dark:text-primary text-dark-100">No items found.</Text>
              )}
            </ScrollView>
          )}

            <View className="flex-row justify-center mt-5">

              {/* Previous page button loads the items on the previous page */}
              {hasPrevPage && (
                <Pressable className="p-4 rounded-xl mx-2 bg-accent" onPress={() => goToPage(currentPage - 1)}>

                {/* Fixes left unicode arrow not displaying correctly */}
                <Text className="text-primary text-xl transform scale-x-[-1]">→</Text>
                </Pressable>
              )}

              {/* Next page button loads the items on the next page */}
              {hasNextPage && (
                <Pressable className="p-4 rounded-xl mx-2 bg-accent" onPress={() => goToPage(currentPage + 1)}>
                <Text className="text-primary text-xl">→</Text>
                </Pressable>
              )}

            </View>

            {(hasNextPage || hasPrevPage) && (
              <Text className='mt-2 text-xl dark:text-primary text-dark-100 text-center' accessibilityHint='Page numbers'>Page {currentPage} of {totalPages}</Text>
            )}

        </View>
      </ScrollView>
    </View>
  )
}

export default Items