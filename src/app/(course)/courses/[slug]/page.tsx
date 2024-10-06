"use client";
import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShoppingCart,
  FaInfoCircle,
} from "react-icons/fa";

const ProductDetailsPage = ({ params }: { params: any }) => {
  console.log("slug", params?.slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  const productImages = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1526498460520-4c246339dccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];

  const productDetails = {
    name: "Digital Marketing Course",
    price: "$99.99",
    description:
      "Master the art of digital marketing with our comprehensive course. Learn SEO, social media marketing, content creation, and more!",
    features: [
      "50+ hours of video content",
      "Lifetime access",
      "Certificate upon completion",
      "Interactive quizzes and assignments",
      "Expert instructor support",
    ],
    specifications: [
      { label: "Course Duration", value: "8 weeks" },
      { label: "Difficulty Level", value: "Intermediate" },
      { label: "Language", value: "English" },
      { label: "Subtitles", value: "Multiple languages available" },
    ],
    faqs: [
      {
        question: "Is this course suitable for beginners?",
        answer:
          "Yes, this course is designed for both beginners and intermediate learners.",
      },
      {
        question: "Will I receive a certificate?",
        answer:
          "Yes, upon successful completion of the course, you will receive a digital certificate.",
      },
      {
        question: "Can I access the course on mobile devices?",
        answer:
          "Absolutely! The course is fully responsive and can be accessed on any device.",
      },
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="relative">
            <img
              src={productImages[currentImageIndex]}
              alt={`Product image ${currentImageIndex + 1}`}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
              aria-label="Next image"
            >
              <FaChevronRight className="text-gray-800" />
            </button>
          </div>
          <div className="flex justify-center mt-4">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  currentImageIndex === index ? "bg-blue-500" : "bg-gray-300"
                }`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{productDetails.name}</h1>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            {productDetails.price}
          </p>
          <p className="text-gray-600 mb-6">{productDetails.description}</p>
          <ul className="list-disc list-inside mb-6">
            {productDetails.features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex space-x-4 mb-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center">
              <FaInfoCircle className="mr-2" />
              View Details
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => toggleSection("specifications")}
            className="flex justify-between items-center w-full text-left font-semibold text-lg mb-2"
          >
            <span>Specifications</span>
            <span className="text-blue-500">
              {expandedSection === "specifications" ? "-" : "+"}
            </span>
          </button>
          {expandedSection === "specifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {productDetails.specifications.map((spec, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <span className="font-medium">{spec.label}:</span>{" "}
                  {spec.value}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <button
            onClick={() => toggleSection("faqs")}
            className="flex justify-between items-center w-full text-left font-semibold text-lg mb-2"
          >
            <span>FAQs</span>
            <span className="text-blue-500">
              {expandedSection === "faqs" ? "-" : "+"}
            </span>
          </button>
          {expandedSection === "faqs" && (
            <div className="mt-4 space-y-4">
              {productDetails.faqs.map((faq, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
