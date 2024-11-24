import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useData } from "../context/DataContext";

const Help = () => {
  const { theme } = useData();
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setError("Please enter your message.");
      return;
    }

    Swal.fire({
      title: "Your message sent successfully!",
      text: "We will contact you soon. Stay close!",
      icon: "success",
      background: "#1e1e1e",
      color: "#ffffff",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const faqs = [
    { question: 'A question?', answer: 'answer here' },
    { question: 'A question?', answer: 'answer here' },
    { question: 'A question?', answer: 'answer here' },
    { question: 'A question?', answer: 'answer here' },
  ];

  return (
    <div className="px-4 py-8 w-full mx-auto space-y-6 text-default bg-primary min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Help Center</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className={`w-full flex justify-between items-center p-4 text-left font-medium ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800 text-white'}`}
              onClick={() => toggleFAQ(index)}
            >
              {`Q${index + 1} - ${faq.question}`}
              <span className="ml-4">{openIndex === index ? "-" : "+"}</span>
            </button>
            <div
              className={`transition-all duration-75 px-4 ${openIndex === index ? "max-h-screen py-4" : "max-h-0 py-0"
                } overflow-hidden bg-slate-800`}
            >
              <p className="text-white">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-center mb-4">Contact Us</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-default mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400  ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800 text-white'}`}
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400  ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800 text-white'}`}
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none  ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800 text-white'}`}
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Help;