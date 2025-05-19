import { useMovieStore } from "@/hooks/stores/useMovieStores";
import { MovieCategoriesEnum, MovieData } from "@/types/types";
import { tmdbCategoryMovies } from "@/utils/utils";
import { RelativePathString, router } from "expo-router";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const HeroSection = ({ isAuthenticated }: HeroSectionProps) => {
  const { setMovie, fetchVideos } = useMovieStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popularMovies, setPopularMovies] = useState<MovieData[]>([]);
  const currentSlide = popularMovies[currentIndex];

  // Fetch popular movies from TMDB API
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await tmdbCategoryMovies(MovieCategoriesEnum.popular, 1);
        if (!isEmpty(data.results)) {
          setPopularMovies(data.results);
        }
      } catch (err: any) {
        console.error(`Error fetching authorization: ${err}`);
      }
    };

    isAuthenticated && fetchPopularMovies();
  }, [isAuthenticated]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % popularMovies.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + popularMovies.length) % popularMovies.length
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <Pressable
          onPress={() => {
            setMovie(currentSlide);
            fetchVideos(currentSlide.id);
            router.push(
              `/${MovieCategoriesEnum.popular}/${currentSlide?.id}` as RelativePathString
            );
          }}
        >
          <ImageBackground
            source={{
              uri: !isEmpty(popularMovies)
                ? process.env.EXPO_PUBLIC_TMDB_IMAGE_URL +
                  currentSlide?.poster_path
                : "",
            }}
            style={styles.background}
            resizeMode="cover"
          >
            {!isEmpty(popularMovies) ? (
              <>
                <View style={styles.overlay} />
                <View style={styles.navButtons}>
                  <TouchableOpacity
                    onPress={handlePrev}
                    style={styles.navButton}
                  >
                    <Text style={styles.navButtonText}>‹</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleNext}
                    style={styles.navButton}
                  >
                    <Text style={styles.navButtonText}>›</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.content}>
                  <Text style={styles.title} numberOfLines={1}>
                    {currentSlide?.title}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={2}>
                    {currentSlide?.overview}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={2}>
                    {currentSlide?.release_date}
                  </Text>
                </View>
              </>
            ) : undefined}
          </ImageBackground>
        </Pressable>
      ) : undefined}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 2160 / 4,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: "#00B894",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 18,
  },
  navButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 6,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
});

export default HeroSection;
