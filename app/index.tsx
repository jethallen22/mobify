import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MovieSection from "@/components/MovieSection";
import { tmdbAuthentication } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthorization = async () => {
      try {
        const data = await tmdbAuthentication();
        setIsAuthenticated(data.success);
      } catch (err: any) {
        console.error(`Error fetching authorization: ${err}`);
      }
    };

    fetchAuthorization();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <ScrollView>
          <View>
            <SafeAreaView />
            <Header />
            <HeroSection isAuthenticated={isAuthenticated} />
            <MovieSection isAuthenticated={isAuthenticated} />
          </View>
        </ScrollView>
      ) : (
        <View>
          <Text>Not Authenticated</Text>
        </View>
      )}
    </>
  );
};

export default index;
