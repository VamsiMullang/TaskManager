import React, { useEffect, useState } from "react";
import axios from "axios";

const QuoteBox: React.FC = React.memo(() => {
  const [quote, setQuote] = useState<{
    content: string;
    author: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://api.quotable.io/random");
        setQuote({
          content: response.data.content,
          author: response.data.author,
        });
      } catch (err) {
        setError("Failed to fetch quote");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return <div className="text-center py-4">Loading quote...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-blue-100 rounded-lg p-4 mb-6 text-center">
      {quote && (
        <>
          <p className="text-lg italic">"{quote.content}"</p>
          <p className="mt-2 font-semibold">— {quote.author}</p>
        </>
      )}
    </div>
  );
});

export default QuoteBox;
