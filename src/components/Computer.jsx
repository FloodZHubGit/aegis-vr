import { useState, useEffect } from "react";
import { useGameEngine } from "../hooks/useGameEngine";
import { motion, AnimatePresence } from "framer-motion";

export const Computer = () => {
  const {
    players,
    isStarted,
    setSelectedRole,
    cubeColor,
    changeCubeColor,
    isPhrygeClicked,
    isDogClicked,
  } = useGameEngine();

  const [articleVerdicts, setArticleVerdicts] = useState({});
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [visibleArticles, setVisibleArticles] = useState([]);

  const articles = [
    {
      id: 1,
      title:
        "Pour faire remonter sa cote de popularité, Emmanuel Macron se déguise en phryge",
      source: "X",
      url: "https://x.com/le_gorafi/status/1846522963325075491",
      excerpt:
        "La démarche a de quoi surprendre, et pourtant : pour endiguer la dégringolade de sa cote de popularité, le président de la République a adopté le costume de la très populaire mascotte des Jeux olympiques de Paris.",
      isFake: true,
    },
    {
      id: 2,
      title: "🤖🐶 FLASH | Elon Musk, PDG de Tesla, dévoile Dogimus",
      source: "X",
      url: "https://x.com/Pediavenir/status/1845044360238297185",
      excerpt:
        'Elon Musk, PDG de Tesla, dévoile "Dogimus", un robot chien conçu pour accomplir le rôle d\'animal de compagnie. Il est capable de rapporter des objets, garder la maison et même sortir se promener. Son prix devrait se situer entre 10 000 et 20 000 dollars.',
      isFake: false,
    },
  ];

  useEffect(() => {
    const newVisibleArticles = [];
    if (isPhrygeClicked) newVisibleArticles.push(articles[0]);
    if (isDogClicked) newVisibleArticles.push(articles[1]);
    setVisibleArticles(newVisibleArticles);
  }, [isPhrygeClicked, isDogClicked]);

  const handleVerdict = (id, verdict) => {
    setArticleVerdicts((prev) => ({ ...prev, [id]: verdict }));
    // Here you would typically update the game state or send this information to the VR player
  };

  const renderArticle = (article) => (
    <motion.div
      key={article.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-gray-700"
      onMouseEnter={() => setHoveredArticle(article.id)}
      onMouseLeave={() => setHoveredArticle(null)}
    >
      <div className="relative z-10 p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-300 mb-2">
          {article.source}
        </span>
        <p className="text-sm text-gray-400 mb-4">{article.excerpt}</p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
        >
          Voir la source
        </a>
        <div className="flex justify-center space-x-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVerdict(article.id, "real")}
            className={`w-32 py-2 px-4 rounded-md ${
              articleVerdicts[article.id] === "real"
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-green-400 border border-green-500"
            }`}
          >
            Real
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleVerdict(article.id, "fake")}
            className={`w-32 py-2 px-4 rounded-md ${
              articleVerdicts[article.id] === "fake"
                ? "bg-red-500 text-white"
                : "bg-gray-700 text-red-400 border border-red-500"
            }`}
          >
            Fake
          </motion.button>
        </div>
        {articleVerdicts[article.id] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 p-4 rounded-md ${
              articleVerdicts[article.id] === "fake"
                ? "bg-green-900 bg-opacity-50"
                : "bg-red-900 bg-opacity-50"
            }`}
          >
            {articleVerdicts[article.id] === "fake" ? (
              <div className="flex items-center text-green-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Correct! Cet article est {article.isFake ? "fake" : "réel"}.
              </div>
            ) : (
              <div className="flex items-center text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Incorrect. Cet article est {article.isFake ? "fake" : "réel"}.
              </div>
            )}
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hoveredArticle === article.id ? 0.2 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 pointer-events-none z-0"
      />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Fake News Detective
        </motion.h1>
        <AnimatePresence mode="wait">
          {visibleArticles.length > 0 ? (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {visibleArticles.map(renderArticle)}
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center text-xl text-gray-300"
            >
              En attente que le joueur en VR trouve un article à analyser...
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-gray-700"
        >
          <h3 className="font-semibold mb-4 text-xl">Game Status</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">
                Cube Color:{" "}
                <span className="font-medium" style={{ color: cubeColor }}>
                  {cubeColor}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Phryge Clicked:{" "}
                <span className="font-medium text-blue-400">
                  {isPhrygeClicked ? "Yes" : "No"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                Dog Clicked:{" "}
                <span className="font-medium text-blue-400">
                  {isDogClicked ? "Yes" : "No"}
                </span>
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={changeCubeColor}
                className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Change Cube Color
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
