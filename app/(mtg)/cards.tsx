import { Text, View, Image, ScrollView, Pressable, TextInput, Keyboard, ActivityIndicator, StyleSheet } from "react-native";
import { icons } from "@/constants/icons";
import SignOutButton from "@/contexts/sign-out";
import axios from 'axios';
import { useState } from "react";

const cards = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [allCards, setAllCards] = useState<any[]>([]); // All cards fetched from Scryfall
  const [displayedCards, setDisplayedCards] = useState<any[]>([]); // Cards to display on the current page
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 20; // Number of cards to display per page

  const handleSearch = async () => {
    if (!query.trim()) return;
  
    // Entering search starts loading animation and dismisses keyboard
    setLoading(true);
    setSearched(true);
    Keyboard.dismiss();
  
    try {
      // Fetching cards from Scryfall API using the search query
      const response = await axios.get(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}`
      );
  
      const cardsWithImages = response.data.data.filter((card: { image_uris?: object }) => card.image_uris); // Filter out cards without images available

      // Set all cards to be used, slice all cards into pages of 20, and set the current page to 1
      setAllCards(cardsWithImages);
      setDisplayedCards(cardsWithImages.slice(0, CARDS_PER_PAGE));
      setCurrentPage(1);

    } catch (error) {
      // Display Scryfall error and leave cards as empty arrays
      console.error('Scryfall error:', error);
      setAllCards([]);
      setDisplayedCards([]);
    } finally {
      // End loading when finished the search
      setLoading(false);
    }
  };

  const goToPage = (page: number) => {
    // Set the indexes of the cards to be displayed (from the entire list) per page
    // e.g. If page = 2, startIndex = 20, endIndex = 40, which is the next 20 cards after page 1
    const startIndex = (page - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;

    // Set the cards to be displayed on the current page based on the indexes and set the current page to the function input
    setDisplayedCards(allCards.slice(startIndex, endIndex));
    setCurrentPage(page);
  };
  
  // Check if there are more pages to display based on the current page and the total number of cards
  const hasNextPage = currentPage * CARDS_PER_PAGE < allCards.length;
  const hasPrevPage = currentPage > 1;

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
              MTG Cards
              </Text>
              <SignOutButton />
          </View>
        </View>

        <View className="mx-auto px-4 py-1 rounded-full dark:bg-dark-200 bg-light-200 mt-2">
          <View className="flex-row items-center self-stretch w-full justify-center">
              <TextInput className="text-2xl dark:text-primary text-dark-100 font-regular flex-1"
              placeholder="Enter card name"
              placeholderTextColor="#A0A0A0"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}>
              </TextInput>
              <Pressable onPress={handleSearch}>
                <Image source={icons.search}></Image>
              </Pressable>
          </View>
        </View>

        {/* Box that encapsulates tools. Tapping the names of tools redirects to their page */}
        <View className="mt-2 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200 mb-1">
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">Cards</Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>
          
          <View>
          
          {/* If loading, display animated loading symbol */}
          {loading ? (
            <ActivityIndicator size="large" style={{ marginTop: 20 }} />
          ) : (
            <ScrollView>

              {/* Display cards if any are returned, else alert user no cards found */}
              {displayedCards.length > 0 ? (
                displayedCards.map((card) => (
                  <View key={card.id} className="mb-5 items-center">
                    <Image source={{ uri: card.image_uris.normal }} className="w-[223px] h-[310px] rounded-xl" />
                    <Text className="mt-1 text-xl font-bold text-center dark:text-primary text-dark-100">{card.name}</Text>
                  </View>
                ))
              ) : (
                searched && <Text className="text-xl dark:text-primary text-dark-100">No cards found.</Text>
              )}
            </ScrollView>
          )}

            <View className="flex-row justify-center mt-5">

              {/* Previous page button loads the cards on the previous page */}
              {hasPrevPage && (
                <Pressable className="p-4 rounded-xl mx-2 bg-accent" onPress={() => goToPage(currentPage - 1)}>

                {/* Fixes left unicode arrow not displaying correctly */}
                <Text className="text-primary text-xl transform scale-x-[-1]">→</Text>
                </Pressable>
              )}

              {/* Next page button loads the cards on the next page */}
              {hasNextPage && (
                <Pressable className="p-4 rounded-xl mx-2 bg-accent" onPress={() => goToPage(currentPage + 1)}>
                <Text className="text-primary text-xl">→</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default cards