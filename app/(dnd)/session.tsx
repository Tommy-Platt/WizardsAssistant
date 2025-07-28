import { View, Text, ScrollView, Image, Pressable, TextInput, ImageBackground, Modal, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import SignOutButton from '@/contexts/sign-out'
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { supabase } from '../../lib/supabase'
import { useRouter } from 'expo-router';

const Session = () => {
  const router = useRouter();

  // This reflects the structure of the session summary in the database
  interface SessionSummary {
    id: string;
    session_name: string;
    session_points: string[];
    session_description: string;
    created_at: string;
  }

  // Variables to hold session summary data
  const [notes, setNotes] = useState<SessionSummary[]>([]);
  const [sessionPointsText, setSessionPointsText] = React.useState('');
  const [sessionDescription, setSessionDescription] = React.useState('');
  const [sessionName, setSessionName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  
  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  // Function that auto formats session points into bullet points
  const createDotPoints = (text: string) => {
    const lines = text.split('\n');
    const formatted = lines.map((line, index) => {
      if (line.trim() === '') return '';
      if (index === 0 && !line.startsWith('•')) return `• ${line}`;
      if (index > 0 && !line.startsWith('•')) return `• ${line}`;
      return line;
    });
    setSessionPointsText(formatted.join('\n'));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetches session summaries from the database
  const fetchNotes = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (!user || userError) return;

    const { data, error } = await supabase
      .from('sessionsummaries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setNotes(data as SessionSummary[]);
    } else {
      console.error(error);
      }
  };

  // Adds a new session summary to the database
  const addSession = async () => {

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (!user || userError) return;

    // Splits each line into an index for the array, gets rid of the bullet points
    const sessionPoints = sessionPointsText
      .split('\n')
      .map((line) => line.replace(/^•\s*/, '').trim())
      .filter((line) => line.length > 0);

    const { data: inserted, error } = await supabase
      .from('sessionsummaries')
      .insert([
        {
          user_id: user.id,
          session_name: sessionName,
          session_description: sessionDescription,
          session_points: sessionPoints,
        },
      ])
      .select()
      .single();

    if (!error && inserted) {
      setSessionName('');
      setSessionDescription('');
      setSessionPointsText('');
      setNotes((prev) => [inserted as SessionSummary, ...prev]);
    } else {
      console.error(error);
    }
  };

  // Deletes a selected summary from the database
  const deleteSummary = async (id: string) => {
    const { error } = await supabase.from('sessionsummaries').delete().eq('id', id);
    if (error) {
      console.error(error.message);
    } else {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  };

  // Confirms the deletion of a summary with an alert
  const confirmDelete = (id: string) => {
    Alert.alert(
      'Delete Summary',
      'Are you sure you want to delete this summary?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => deleteSummary(id),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
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
        <View className="mx-auto px-4 py-3 rounded-full dark:bg-dark-200 bg-light-200">
          <View className="flex-row items-center self-stretch w-full justify-center">
            <Pressable onPress={() => router.back()}>
              <Image source={icons.back} className="size-8" />
            </Pressable>
            <Text className="text-2xl dark:text-primary text-dark-100 font-regular text-center flex-1">
              D&D Session Summaries
            </Text>
            <SignOutButton />
          </View>
        </View>

        <View className="mt-10 px-4 py-3 rounded-3xl dark:bg-dark-200 bg-light-200 mb-1">
          <Text className="text-xl dark:text-primary text-dark-100 font-bold">Your Summaries</Text>
          <View className="h-0.5 bg-dark-100 dark:bg-primary my-4"></View>

          {/* Maps over each available summary and displays it in the container */}
          {notes.map((note) => (
            <View className='dark:bg-dark-300 bg-light-300 p-4 rounded-xl mb-4 flex-row' key={note.id}>

              <View>
                <Text className='text-lg font-bold dark:text-primary text-dark-100 mb-2'>{note.session_name}</Text>
                {note.session_points.map((point, idx) => (
                  <Text className='text-base dark:text-primary text-dark-100 mb-2' key={idx}>• {point}</Text>
                ))}
                <Text className='text-base dark:text-primary text-dark-100 mb-2'>{note.session_description}</Text>
              </View>

              <View className='flex-1 justify-center items-end'>
                <Pressable onPress={() => confirmDelete(note.id)} accessibilityHint='Delete button' testID={`delete-button-${note.id}`}>
                  <ImageBackground source={images.highlight} className="px-4 py-2 bg-accent rounded-xl mx-1 overflow-hidden">
                    <Image source={icons.deleteNote} className='size-6' />
                  </ImageBackground>
                </Pressable>
              </View>

            </View>
          ))}

        </View>

        {/* A pop-up menu for adding new session summaries */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            closeModal(); // Handle back button press
          }}
        >
          <View className='flex-1 dark:bg-dark-100 bg-light-100 safe-area px-5 py-10'>
            <View className='bg-light-200 dark:bg-dark-200 rounded-3xl px-5'>
              <Text className='text-xl dark:text-primary text-dark-100 mt-6 mb-2'>Session Name</Text>
              <TextInput className='px-5 py-3 bg-light-300 dark:bg-dark-300 rounded-xl mb-6 dark:text-primary text-dark-100 font-bold text-xl'
                placeholder="Session 1 - Dragon's Lair"
                placeholderTextColor="#A0A0A0"
                maxLength={100}
                value={sessionName}
                onChangeText={(text) => setSessionName(text)}
              />

              <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Key Points</Text>
              <TextInput className='px-5 py-3 bg-light-300 dark:bg-dark-300 rounded-xl mb-6 dark:text-primary text-dark-100 text-lg'
                style={{
                  minHeight: 100,
                  textAlignVertical: 'top',
                }}
                value={sessionPointsText}
                multiline
                maxLength={200}
                placeholder="• Killed the dragon..."
                placeholderTextColor="#A0A0A0"
                onChangeText={createDotPoints}
              />

              <Text className='text-xl dark:text-primary text-dark-100 mb-2'>Description</Text>
              <TextInput className='px-5 py-3 bg-light-300 dark:bg-dark-300 rounded-xl mb-6 dark:text-primary text-dark-100 text-lg'
                value={sessionDescription}
                multiline
                editable
                scrollEnabled
                numberOfLines={5}
                maxLength={500}
                placeholder="At the beginning of the session..."
                placeholderTextColor="#A0A0A0"
                onChangeText={(text) => setSessionDescription(text)}
              />

              {/* Add button */}
              <Pressable onPress={() => {addSession()}}>
                <ImageBackground source={images.highlight} className="px-4 py-4 bg-accent rounded-xl mx-1 mb-6 items-center overflow-hidden">
                  <Text className='text-xl text-primary items'>Submit</Text>
                </ImageBackground>
              </Pressable>

            </View>

            {/* Close button to close the modal */}
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Pressable accessibilityHint='Pop up menu close button' className='justify-center items-center'>
              <ImageBackground source={images.highlight} className="px-4 py-4 bg-accent rounded-xl mx-1 overflow-hidden">
                <Text className='text-xl text-primary' onPress={closeModal}>Close</Text>
              </ImageBackground>
              </Pressable>
            </View>
            
          </View>
        </Modal>  
      </ScrollView>

      {/* Add session summaries button. It overlays the rest of the screen. */}
      <View className="flex-row items-center justify-center absolute left-0 right-0 bottom-8 z-10 shadow-lg">
        <Pressable onPress={openModal} accessibilityHint='Pop up menu open button'>
          <ImageBackground source={images.highlight} className="px-4 py-2 bg-accent rounded-xl mx-1 overflow-hidden">
            <Image source={icons.add} className='size-10' style={{ tintColor: '#fff' }} />
          </ImageBackground>
        </Pressable>
      </View>

    </View>
  )
}

export default Session