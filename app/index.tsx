import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { tmdbAuthentication, tmdbMovies } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [movies, setMoviews] = useState([]);

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await tmdbMovies();
        // console.log(`data: ${JSON.stringify(data)}`);
        setMoviews(data.results);
      } catch (err: any) {
        console.error(`Error fetching movies: ${err}`);
      }
    };
    isAuthenticated && fetchMovies();
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <ScrollView>
          <View>
            <SafeAreaView />
            <Header />
            <HeroSection isAuthenticated={isAuthenticated} />
            {movies.map((movie: any) => (
              <View key={movie.id}>
                <Text>{movie.title}</Text>
                <Text>{movie.release_date}</Text>
              </View>
            ))}
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
