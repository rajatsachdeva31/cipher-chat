import { useContext, useEffect } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";
import { useChat } from "../Context/ChatContext";
import { socket } from "../Connection/Socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faHeart, faLock, faRocket, faShield, faUsers } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const {
    userId,
    receiver,
    isSearching,
    setReceiver,
    setIsTyping,
    setMessage,
    setIsSearching,
  } = useChat();

  useEffect(() => {
    if (userId && isSearching) {
      socket.emit("closed", userId, () => {
        setIsSearching(false);
      });
    }

    if (receiver) {
      socket.emit("unpaired", receiver, () => {
        setReceiver("");
        setMessage("");
        setIsTyping(false);
      });
    }

    return () => {};
  });

  const features = [
    {
      icon: faShield,
      title: "Anonymous & Secure",
      description:
        "Chat without revealing your identity. Your privacy is our priority.",
    },
    {
      icon: faUsers,
      title: "Random Matching",
      description:
        "Connect with strangers who share your interests from around the world.",
    },
    {
      icon: faGlobe,
      title: "Global Community",
      description:
        "Meet people from different cultures and backgrounds instantly.",
    },
  ];

  return (
    <div
      className="h-[92vh] text-center px-4 sm:px-10 lg:px-40 py-10 overflow-scroll transition duration-500"
      style={{ backgroundColor: theme.background, color: theme.color }}
    >
      {/* <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold">
        securely chat with like minded strangers
      </h1> */}
      <div className="text-center mb-16">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Connect with
            <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Strangers
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover meaningful conversations with like-minded people from
            around the world. Anonymous, secure, and instant connections await
            you.
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center items-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-sky-500">
              20K+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Online Now
            </div>
          </div>
          <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-sky-500">
              100%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Anonymous
            </div>
          </div>
          <div className="w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-sky-500">
              <FontAwesomeIcon icon={faHeart} className="text-red-500" />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Safe Space
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={
            "p-8 rounded-2xl shadow-lg mb-16 "
            // (themeName === "darkTheme" ? "bg-gray-800" : "bg-white")
          }
        >
          <h2 className="text-2xl font-semibold mb-6">Start Your Journey</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            <input
              type="text"
              name="interest"
              id="interest"
              autoFocus
              className="outline-none outline-offset-0 focus:outline-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-800 h-14 px-6 text-md md:text-lg shadow-md border rounded-xl w-full md:w-[400px] transition duration-300"
              placeholder="What are you interested in? (e.g., music, travel, tech)"
            />
            <div className="flex items-center gap-3">
              <Link to="/chat">
                <button
                  type="button"
                  className="h-14 px-8 rounded-xl text-md md:text-lg shadow-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold tracking-wide cursor-pointer hover:from-sky-600 hover:to-blue-700 transform hover:scale-105 transition duration-300 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faRocket} />
                  Start Chat
                </button>
              </Link>
              <span className="text-gray-500">or</span>
              <button
                type="button"
                className="h-14 px-8 rounded-xl text-md md:text-lg shadow-md bg-gray-300 text-gray-600 font-semibold tracking-wide cursor-not-allowed opacity-50 transition duration-300"
              >
                Video Chat
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faLock} className="mr-1" />
            Video chat coming soon • No registration required • Completely
            anonymous
          </p>
        </div>
      </div>
      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Why Choose Cipher Chat?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={
                "p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition duration-300 "
              }
            >
              <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-white text-xl"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Add Your Interests</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tell us what you're passionate about
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Get Matched</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We'll connect you with someone similar
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Start Chatting</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enjoy meaningful conversations
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center pt-8 border-t border-gray-300 dark:border-gray-600">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Made with{" "}
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> for
          meaningful connections
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Your conversations are private and not stored. Chat responsibly and be
          kind to others.
        </p>
      </footer>
      {/* <div className="py-5 md:py-10 flex flex-col md:flex-row justify-center items-center gap-4">
        <input
          type="text"
          name="interest"
          id="interrest"
          autoFocus
          className="outline-none outline-offset-0 focus:outline-sky-500 text-gray-800 h-14 px-4 text-md md:text-lg shadow-md border rounded-lg w-[350px] sm:w-[400px]"
          placeholder="add your interest(s)"
        />
        <div className="flex items-center">
          <Link to="/chat">
            <button
              type="button"
              className="h-14 rounded-lg text-md md:text-lg shadow-md bg-sky-500 text-gray-100 w-24 tracking-wide cursor-pointer hover:bg-sky-700 transition duration-500"
            >
              text
            </button>
          </Link>
          <span className="mx-2 text-md md:text-lg">or</span>
          <button
            type="button"
            className="h-14 rounded-lg text-md md:text-lg shadow-md bg-sky-500 text-gray-100 w-24 tracking-wide cursor-not-allowed opacity-50 transition duration-500"
          >
            video
          </button>
          <span className="ml-2 text-gray-500">(coming soon)</span>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
