import { useContext, useEffect } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";
import { useChat } from "../Context/ChatContext";
import { socket } from "../Connection/Socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faHeart,
  faLock,
  faRocket,
  faShield,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

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
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Connect with
            <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Strangers
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Discover meaningful conversations with like-minded people from
            around the world. Anonymous, secure, and instant connections await
            you.
          </p>
        </div>

        {/* CTA Section */}
        <div className={"p-8 rounded-2xl shadow-lg mb-16 "}>
          <h2 className="text-2xl font-semibold mb-6">Start Your Journey</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            {/* <input
              type="text"
              name="interest"
              id="interest"
              autoFocus
              className="outline-none outline-offset-0 focus:outline-sky-500 focus:ring-2 focus:ring-sky-200 text-gray-800 h-14 px-6 text-md md:text-lg shadow-md border rounded-xl w-full md:w-[400px] transition duration-300"
              placeholder="What are you interested in? (e.g., music, travel, tech)"
            /> */}
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
          <p className="text-sm">
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
              <p className="leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="text-center pt-8 border-t border-gray-300 dark:border-gray-600">
        <p className="mb-4">
          Made with{" "}
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> for
          meaningful connections
        </p>
        <p className="text-sm">
          Your conversations are private and not stored. Chat responsibly and be
          kind to others.
        </p>
      </footer>
    </div>
  );
};

export default Home;
